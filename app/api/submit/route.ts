import { NextRequest, NextResponse } from "next/server";
import { submitToAdapter, type SubmissionType } from "@/lib/submissions";

export const runtime = "nodejs";

const submissions = new Map<string, { count: number; resetAt: number }>();
const allowedTypes: SubmissionType[] = ["founder-application", "founder-interest", "sponsor-enquiry", "general-contact"];

function rateLimit(ip: string) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const limit = 20;
  const current = submissions.get(ip);

  if (!current || current.resetAt < now) {
    submissions.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}

function isString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function emailLooksValid(value: unknown) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function missing(data: Record<string, unknown>, fields: string[]) {
  return fields.filter((field) => !isString(data[field]));
}

function validate(type: SubmissionType, data: Record<string, unknown>) {
  if (isString(data.company)) return ["Spam protection rejected this submission."];

  const shared = ["fullName", "email"];
  const requiredByType: Record<SubmissionType, string[]> = {
    "founder-application": [
      ...shared,
      "mobile",
      "city",
      "province",
      "businessName",
      "businessStage",
      "industry",
      "businessDescription",
      "problem",
      "targetCustomer",
      "currentRevenue",
      "currentEvidence",
      "demandTests",
      "mostNeedToProve",
      "teamSize",
      "weeklyCommitment",
      "customerAccess",
      "customerInterviews",
      "pricingTest",
      "salesOutreach",
      "evidenceResponse",
      "goals",
      "device",
      "internetAccess",
      "placeType",
      "paymentOption",
      "bursaryAdminFeeUnderstanding",
      "accuracy",
      "participation",
      "dataProcessing",
      "confidentiality",
      "sponsorReporting"
    ],
    "founder-interest": [...shared, "mobile", "city", "province", "businessName", "businessStage", "goals", "dataProcessing"],
    "sponsor-enquiry": [
      ...shared,
      "mobile",
      "organisation",
      "jobTitle",
      "organisationType",
      "region",
      "sponsorFounderCount",
      "interest",
      "supportType",
      "focusArea",
      "meetingMethod",
      "reportingRequirements",
      "additionalContext",
      "popiaConsent"
    ],
    "general-contact": [...shared, "enquiryType", "message", "popiaConsent"]
  };

  const errors = missing(data, requiredByType[type]);
  if (!emailLooksValid(data.email)) errors.push("valid email");
  return errors;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(ip)) {
    return NextResponse.json({ message: "Too many submissions. Please wait a few minutes and try again." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Invalid submission." }, { status: 400 });
  }

  const { type, data } = body as { type?: unknown; data?: unknown };
  if (typeof type !== "string" || !allowedTypes.includes(type as SubmissionType)) {
    return NextResponse.json({ message: "Unknown submission type." }, { status: 400 });
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return NextResponse.json({ message: "Invalid form data." }, { status: 400 });
  }

  const formData = data as Record<string, unknown>;
  const errors = validate(type as SubmissionType, formData);
  if (errors.length > 0) {
    return NextResponse.json({ message: `Please complete the required fields: ${errors.join(", ")}.` }, { status: 400 });
  }

  const result = await submitToAdapter({
    type: type as SubmissionType,
    submittedAt: new Date().toISOString(),
    data: formData
  });

  return NextResponse.json({ message: result.message }, { status: result.ok ? 200 : 503 });
}
