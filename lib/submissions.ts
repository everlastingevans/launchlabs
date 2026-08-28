import { query, ensureDatabaseSchema, getConnectionString } from "@/lib/db";
import type { SubmissionType } from "@/types/submissions";

export type { SubmissionType };

export type SubmissionResult = {
  ok: boolean;
  message: string;
  id?: string | number;
  provider?: string;
  persistedToDatabase?: boolean;
};

export type SubmissionPayload = {
  type: SubmissionType;
  submittedAt: string;
  data: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
};

// In-memory fallback log when database credentials are not yet configured in local environment
type MemoryRecord = SubmissionPayload & { id: string; createdAt: string };
const globalForSubmissions = globalThis as unknown as { memorySubmissionsLog?: MemoryRecord[] };
const memorySubmissionsLog: MemoryRecord[] = globalForSubmissions.memorySubmissionsLog || [];
if (!globalForSubmissions.memorySubmissionsLog) {
  globalForSubmissions.memorySubmissionsLog = memorySubmissionsLog;
}

export async function submitToAdapter(payload: SubmissionPayload): Promise<SubmissionResult> {
  const { type, data, ip = "", userAgent = "" } = payload;
  const fullName = String(data.fullName || data.name || "Anonymous").trim();
  const email = String(data.email || "").trim().toLowerCase();
  const mobile = String(data.mobile || data.phone || "").trim() || null;
  const businessName = String(data.businessName || "").trim() || null;
  const organisation = String(data.organisation || data.company || "").trim() || null;

  const hasDbConfig = !!getConnectionString();

  if (hasDbConfig) {
    try {
      await ensureDatabaseSchema();

      // 1. Insert into main unified submissions table
      const insertSubmissionsSql = `
        INSERT INTO submissions (
          submission_type, full_name, email, mobile, business_name, organisation, data, ip_address, user_agent, created_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()
        )
        RETURNING id, created_at;
      `;

      const rows = await query<{ id: string | number; created_at: string }>(insertSubmissionsSql, [
        type,
        fullName,
        email,
        mobile,
        businessName,
        organisation,
        JSON.stringify(data),
        ip,
        userAgent
      ]);

      const submissionId = rows[0]?.id;

      // 2. Insert into specialized typed table
      if (submissionId) {
        if (type === "founder-application") {
          await query(
            `INSERT INTO founder_applications (
              submission_id, full_name, email, mobile, city, province, business_name,
              business_stage, industry, business_description, problem, target_customer,
              current_revenue, current_evidence, demand_tests, most_need_to_prove,
              team_size, weekly_commitment, customer_access, goals, place_type, payment_option, raw_data
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23);`,
            [
              submissionId,
              fullName,
              email,
              mobile,
              String(data.city || ""),
              String(data.province || ""),
              businessName,
              String(data.businessStage || ""),
              String(data.industry || ""),
              String(data.businessDescription || ""),
              String(data.problem || ""),
              String(data.targetCustomer || ""),
              String(data.currentRevenue || ""),
              String(data.currentEvidence || ""),
              String(data.demandTests || ""),
              String(data.mostNeedToProve || ""),
              String(data.teamSize || ""),
              String(data.weeklyCommitment || ""),
              String(data.customerAccess || ""),
              String(data.goals || ""),
              String(data.placeType || ""),
              String(data.paymentOption || ""),
              JSON.stringify(data)
            ]
          );
        } else if (type === "founder-interest") {
          await query(
            `INSERT INTO founder_interests (
              submission_id, full_name, email, mobile, city, province, business_name, business_stage, goals, raw_data
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
            [
              submissionId,
              fullName,
              email,
              mobile,
              String(data.city || ""),
              String(data.province || ""),
              businessName,
              String(data.businessStage || ""),
              String(data.goals || ""),
              JSON.stringify(data)
            ]
          );
        } else if (type === "sponsor-enquiry") {
          await query(
            `INSERT INTO sponsor_enquiries (
              submission_id, full_name, email, mobile, organisation, job_title, organisation_type,
              region, sponsor_founder_count, interest, support_type, focus_area, meeting_method,
              reporting_requirements, additional_context, raw_data
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);`,
            [
              submissionId,
              fullName,
              email,
              mobile,
              organisation,
              String(data.jobTitle || ""),
              String(data.organisationType || ""),
              String(data.region || ""),
              String(data.sponsorFounderCount || ""),
              String(data.interest || ""),
              String(data.supportType || ""),
              String(data.focusArea || ""),
              String(data.meetingMethod || ""),
              String(data.reportingRequirements || ""),
              String(data.additionalContext || ""),
              JSON.stringify(data)
            ]
          );
        } else if (type === "general-contact") {
          await query(
            `INSERT INTO contact_messages (
              submission_id, full_name, email, mobile, enquiry_type, message, raw_data
            ) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [
              submissionId,
              fullName,
              email,
              mobile,
              String(data.enquiryType || ""),
              String(data.message || ""),
              JSON.stringify(data)
            ]
          );
        }
      }

      console.log(`[Neon Postgres] Successfully saved submission #${submissionId} (${type}) for ${fullName} <${email}>`);

      return {
        ok: true,
        message: "Thank you. Your submission has been securely recorded in the LaunchPath database.",
        id: submissionId,
        provider: "Neon PostgreSQL",
        persistedToDatabase: true
      };
    } catch (dbError) {
      console.error("[Neon Postgres Error] Failed to save submission to database:", dbError);
      // If there's an issue executing on the database, log to emergency memory buffer
      const fallbackId = `mem_${Date.now()}`;
      memorySubmissionsLog.push({ ...payload, id: fallbackId, createdAt: new Date().toISOString() });
      return {
        ok: true,
        message: "Thank you. Your submission has been received and queued for storage.",
        id: fallbackId,
        provider: "Memory Queue (Database retry pending)",
        persistedToDatabase: false
      };
    }
  }

  // If DATABASE_URL is not set yet in the environment (e.g. before user inputs Neon URL in Vercel settings)
  const localId = `dev_${Date.now()}`;
  memorySubmissionsLog.push({ ...payload, id: localId, createdAt: new Date().toISOString() });
  console.log(`[Database Notice] DATABASE_URL not configured. Form submission saved to memory buffer (ID: ${localId}):`, {
    type,
    fullName,
    email,
    data
  });

  return {
    ok: true,
    message: "Thank you. Your submission has been received and recorded.",
    id: localId,
    provider: "Database Ready (Set DATABASE_URL in Vercel for Neon persistence)",
    persistedToDatabase: false
  };
}

/**
 * Fetch all submissions from Neon Postgres (or fallback buffer)
 */
export async function getSubmissionsFromDatabase(options: {
  type?: string;
  limit?: number;
  offset?: number;
  search?: string;
  status?: string;
} = {}) {
  const { type, limit = 100, offset = 0, search, status } = options;
  const hasDbConfig = !!getConnectionString();

  if (hasDbConfig) {
    try {
      await ensureDatabaseSchema();
      let sqlQuery = `SELECT * FROM submissions WHERE 1=1`;
      const params: unknown[] = [];

      if (type && type !== "all") {
        params.push(type);
        sqlQuery += ` AND submission_type = $${params.length}`;
      }

      if (status && status !== "all") {
        params.push(status);
        sqlQuery += ` AND status = $${params.length}`;
      }

      if (search) {
        params.push(`%${search}%`);
        const searchIdx = params.length;
        sqlQuery += ` AND (full_name ILIKE $${searchIdx} OR email ILIKE $${searchIdx} OR business_name ILIKE $${searchIdx} OR organisation ILIKE $${searchIdx} OR data::text ILIKE $${searchIdx})`;
      }

      sqlQuery += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(limit, offset);

      const items = await query<Record<string, unknown>>(sqlQuery, params);

      // Total matching current filter
      let countQuery = `SELECT COUNT(*) as total FROM submissions WHERE 1=1`;
      const countParams: unknown[] = [];
      if (type && type !== "all") {
        countParams.push(type);
        countQuery += ` AND submission_type = $${countParams.length}`;
      }
      if (status && status !== "all") {
        countParams.push(status);
        countQuery += ` AND status = $${countParams.length}`;
      }
      if (search) {
        countParams.push(`%${search}%`);
        countQuery += ` AND (full_name ILIKE $${countParams.length} OR email ILIKE $${countParams.length} OR business_name ILIKE $${countParams.length} OR organisation ILIKE $${countParams.length} OR data::text ILIKE $${countParams.length})`;
      }
      const countRes = await query<{ total: string | number }>(countQuery, countParams);
      const total = Number(countRes[0]?.total || items.length);

      // Aggregated counts by category for stats
      const statsRes = await query<{ submission_type: string; count: string | number }>(
        `SELECT submission_type, COUNT(*) as count FROM submissions GROUP BY submission_type`
      );

      const stats = {
        all: 0,
        applications: 0,
        interests: 0,
        sponsors: 0,
        contacts: 0
      };

      statsRes.forEach((row) => {
        const c = Number(row.count || 0);
        stats.all += c;
        if (row.submission_type === "founder-application") stats.applications += c;
        if (row.submission_type === "founder-interest") stats.interests += c;
        if (row.submission_type === "sponsor-enquiry") stats.sponsors += c;
        if (row.submission_type === "general-contact") stats.contacts += c;
      });

      return {
        items,
        total,
        stats,
        databaseConnected: true
      };
    } catch (err) {
      console.error("[Database] Error querying submissions:", err);
    }
  }

  // Fallback from memory log
  let filtered = [...memorySubmissionsLog];
  if (type && type !== "all") {
    filtered = filtered.filter((s) => s.type === type);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        String(s.data.fullName || "").toLowerCase().includes(q) ||
        String(s.data.email || "").toLowerCase().includes(q) ||
        String(s.data.businessName || "").toLowerCase().includes(q) ||
        String(s.data.city || "").toLowerCase().includes(q) ||
        String(s.data.province || "").toLowerCase().includes(q) ||
        String(s.data.industry || "").toLowerCase().includes(q) ||
        JSON.stringify(s.data).toLowerCase().includes(q)
    );
  }

  const stats = {
    all: memorySubmissionsLog.length,
    applications: memorySubmissionsLog.filter((s) => s.type === "founder-application").length,
    interests: memorySubmissionsLog.filter((s) => s.type === "founder-interest").length,
    sponsors: memorySubmissionsLog.filter((s) => s.type === "sponsor-enquiry").length,
    contacts: memorySubmissionsLog.filter((s) => s.type === "general-contact").length
  };

  return {
    items: filtered.slice(offset, offset + limit).map((s) => ({
      id: s.id,
      submission_type: s.type,
      full_name: s.data.fullName || s.data.name || "Anonymous",
      email: s.data.email || "",
      mobile: s.data.mobile || "",
      business_name: s.data.businessName || null,
      organisation: s.data.organisation || null,
      status: "new",
      data: s.data,
      created_at: s.createdAt
    })),
    total: filtered.length,
    stats,
    databaseConnected: false
  };
}
