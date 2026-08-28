import { NextRequest, NextResponse } from "next/server";
import { getSubmissionsFromDatabase } from "@/lib/submissions";
import { query, ensureDatabaseSchema, getConnectionString } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret") || request.headers.get("x-admin-secret");
  const configuredSecret = process.env.ADMIN_SECRET_KEY;

  // If ADMIN_SECRET_KEY is defined in env, require it; otherwise allow access in dev/preview
  if (configuredSecret && secret !== configuredSecret) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const type = searchParams.get("type") || "all";
  const search = searchParams.get("search") || undefined;
  const limit = Math.min(Number(searchParams.get("limit") || 50), 200);
  const offset = Number(searchParams.get("offset") || 0);
  const format = searchParams.get("format");

  try {
    const result = await getSubmissionsFromDatabase({
      type,
      search,
      limit,
      offset
    });

    if (format === "csv") {
      // Export as CSV
      const headers = ["ID", "Type", "Full Name", "Email", "Mobile", "Business / Org", "Status", "Date"];
      const csvRows = [
        headers.join(","),
        ...result.items.map((item) => {
          const escape = (str: unknown) => `"${String(str || "").replace(/"/g, '""')}"`;
          return [
            escape(item.id),
            escape(item.submission_type),
            escape(item.full_name),
            escape(item.email),
            escape(item.mobile),
            escape(item.business_name || item.organisation || ""),
            escape(item.status),
            escape(item.created_at)
          ].join(",");
        })
      ];

      return new NextResponse(csvRows.join("\n"), {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="launchpath-submissions-${new Date().toISOString().slice(0, 10)}.csv"`
        }
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Admin submissions error:", error);
    return NextResponse.json({ error: "Failed to retrieve submissions" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret") || request.headers.get("x-admin-secret");
  const configuredSecret = process.env.ADMIN_SECRET_KEY;

  if (configuredSecret && secret !== configuredSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status, notes } = body as { id: number | string; status?: string; notes?: string };

    if (!id) {
      return NextResponse.json({ error: "Submission ID is required" }, { status: 400 });
    }

    if (getConnectionString()) {
      await ensureDatabaseSchema();
      if (status) {
        await query(`UPDATE submissions SET status = $1, updated_at = NOW() WHERE id = $2`, [status, id]);
      }
      if (notes !== undefined) {
        await query(`UPDATE submissions SET notes = $1, updated_at = NOW() WHERE id = $2`, [notes, id]);
      }
    }

    return NextResponse.json({ ok: true, message: "Submission updated" });
  } catch {
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
  }
}
