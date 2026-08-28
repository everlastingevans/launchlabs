import { Pool } from "@neondatabase/serverless";

let pool: Pool | null = null;
let schemaInitialized = false;

export function getConnectionString(): string | null {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.NEON_DATABASE_URL ||
    null
  );
}

export function getDbPool(): Pool | null {
  const connectionString = getConnectionString();
  if (!connectionString) return null;

  if (!pool) {
    const isLocal = connectionString.includes("localhost") || connectionString.includes("127.0.0.1");
    pool = new Pool({
      connectionString,
      ssl: isLocal ? false : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });
  }
  return pool;
}

/**
 * Execute parameterized query using Neon PostgreSQL Pool
 */
export async function query<T = unknown>(text: string, params: unknown[] = []): Promise<T[]> {
  const connectionString = getConnectionString();
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL or POSTGRES_URL environment variable is missing. Please set up your Neon PostgreSQL connection string in Vercel or .env."
    );
  }

  const db = getDbPool();
  if (!db) {
    throw new Error("Could not initialize database connection pool");
  }

  const result = await db.query(text, params as unknown as (string | number | boolean | null | undefined)[]);
  return result.rows as T[];
}

/**
 * Automatically ensures all required Postgres tables and indexes exist
 */
export async function ensureDatabaseSchema(): Promise<boolean> {
  if (schemaInitialized) return true;
  const connectionString = getConnectionString();
  if (!connectionString) {
    return false;
  }

  try {
    // 1. Primary Unified Submissions Table
    await query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id BIGSERIAL PRIMARY KEY,
        submission_type VARCHAR(64) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        mobile VARCHAR(100),
        business_name VARCHAR(255),
        organisation VARCHAR(255),
        status VARCHAR(50) DEFAULT 'new',
        data JSONB NOT NULL,
        ip_address VARCHAR(100),
        user_agent TEXT,
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // 2. Indexes on Submissions Table
    await query(`
      CREATE INDEX IF NOT EXISTS idx_submissions_type_created ON submissions(submission_type, created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);
      CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
      CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
    `);

    // 3. Typed Table: Founder Applications
    await query(`
      CREATE TABLE IF NOT EXISTS founder_applications (
        id BIGSERIAL PRIMARY KEY,
        submission_id BIGINT REFERENCES submissions(id) ON DELETE CASCADE,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        mobile VARCHAR(100),
        city VARCHAR(100),
        province VARCHAR(100),
        business_name VARCHAR(255),
        business_stage VARCHAR(100),
        industry VARCHAR(100),
        business_description TEXT,
        problem TEXT,
        target_customer TEXT,
        current_revenue VARCHAR(100),
        current_evidence TEXT,
        demand_tests TEXT,
        most_need_to_prove TEXT,
        team_size VARCHAR(50),
        weekly_commitment VARCHAR(50),
        customer_access VARCHAR(50),
        goals TEXT,
        place_type VARCHAR(100),
        payment_option VARCHAR(100),
        raw_data JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_founder_apps_created ON founder_applications(created_at DESC);
    `);

    // 4. Typed Table: Founder Interests
    await query(`
      CREATE TABLE IF NOT EXISTS founder_interests (
        id BIGSERIAL PRIMARY KEY,
        submission_id BIGINT REFERENCES submissions(id) ON DELETE CASCADE,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        mobile VARCHAR(100),
        city VARCHAR(100),
        province VARCHAR(100),
        business_name VARCHAR(255),
        business_stage VARCHAR(100),
        goals TEXT,
        raw_data JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_founder_interests_created ON founder_interests(created_at DESC);
    `);

    // 5. Typed Table: Sponsor Enquiries
    await query(`
      CREATE TABLE IF NOT EXISTS sponsor_enquiries (
        id BIGSERIAL PRIMARY KEY,
        submission_id BIGINT REFERENCES submissions(id) ON DELETE CASCADE,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        mobile VARCHAR(100),
        organisation VARCHAR(255),
        job_title VARCHAR(255),
        organisation_type VARCHAR(100),
        region VARCHAR(100),
        sponsor_founder_count VARCHAR(50),
        interest VARCHAR(150),
        support_type VARCHAR(150),
        focus_area VARCHAR(150),
        meeting_method VARCHAR(100),
        reporting_requirements TEXT,
        additional_context TEXT,
        raw_data JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_sponsor_enquiries_created ON sponsor_enquiries(created_at DESC);
    `);

    // 6. Typed Table: Contact Messages
    await query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id BIGSERIAL PRIMARY KEY,
        submission_id BIGINT REFERENCES submissions(id) ON DELETE CASCADE,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        mobile VARCHAR(100),
        enquiry_type VARCHAR(100),
        message TEXT NOT NULL,
        raw_data JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);
    `);

    schemaInitialized = true;
    return true;
  } catch (err) {
    console.error("[Database] Error ensuring schema:", err);
    return false;
  }
}
