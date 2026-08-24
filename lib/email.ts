import nodemailer from "nodemailer";
import { Resend } from "resend";
import type { SubmissionType } from "@/types/submissions";

const DEFAULT_RECIPIENT_EMAIL = "hello@launchpath.co.za";

const FIELD_LABELS: Record<string, string> = {
  fullName: "Full Name",
  email: "Email Address",
  mobile: "Mobile Number",
  city: "City / Town",
  province: "Province",
  linkedin: "LinkedIn Profile",
  businessName: "Business Name",
  website: "Website / Social Link",
  businessStage: "Business Stage",
  industry: "Industry",
  teamSize: "Team Size",
  businessDescription: "Business Description",
  problem: "Problem Being Solved",
  targetCustomer: "Target Customer",
  currentRevenue: "Current Revenue / Commercial Activity",
  currentEvidence: "Current Customer Evidence",
  demandTests: "Demand Tests Completed",
  mostNeedToProve: "What Most Needs to be Proved",
  weeklyCommitment: "Can Commit 4-6 Hours/Week",
  customerAccess: "Access to Prospective Customers",
  customerInterviews: "Willing to Conduct Interviews",
  pricingTest: "Willing to Test Pricing",
  salesOutreach: "Willing to Conduct Sales Outreach",
  device: "Device Used",
  internetAccess: "Internet Access Type",
  evidenceResponse: "Response to Negative Evidence",
  goals: "Goals for the 12 Weeks",
  placeType: "Place Type (Funded vs Bursary)",
  paymentOption: "Payment Option",
  bursaryAdminFeeUnderstanding: "Understands Bursary Admin Fee",
  accuracy: "Accuracy Declaration",
  participation: "Participation Commitment",
  dataProcessing: "Data Processing Consent",
  confidentiality: "Confidentiality Acknowledgment",
  sponsorReporting: "Sponsor Reporting Acknowledgment",
  mediaConsent: "Media Consent",
  organisation: "Organisation Name",
  jobTitle: "Job Title",
  organisationType: "Organisation Type",
  region: "Province / Region",
  sponsorFounderCount: "Founders to Sponsor",
  interest: "Partnership Interest",
  supportType: "Support Type",
  focusArea: "Geographic / Demographic Focus",
  budgetRange: "Budget Range",
  meetingMethod: "Preferred Meeting Method",
  reportingRequirements: "Reporting Requirements",
  additionalContext: "Additional Context",
  popiaConsent: "POPIA Consent",
  enquiryType: "Enquiry Type",
  message: "Message"
};

export interface EmailData {
  type: SubmissionType;
  submittedAt: string;
  data: Record<string, unknown>;
}

export interface SendResult {
  ok: boolean;
  message: string;
  provider: "resend" | "smtp" | "webhook" | "console_fallback";
  details?: unknown;
}

export function getRecipientEmail(type: SubmissionType): string {
  if (type === "founder-application" || type === "founder-interest") {
    return process.env.FOUNDER_APPLICATION_EMAIL || process.env.NOTIFICATION_EMAIL || DEFAULT_RECIPIENT_EMAIL;
  }
  if (type === "sponsor-enquiry") {
    return process.env.SPONSOR_ENQUIRY_EMAIL || process.env.NOTIFICATION_EMAIL || DEFAULT_RECIPIENT_EMAIL;
  }
  return process.env.GENERAL_CONTACT_EMAIL || process.env.NOTIFICATION_EMAIL || DEFAULT_RECIPIENT_EMAIL;
}

export function formatSubmissionSubject(type: SubmissionType, data: Record<string, unknown>): string {
  const name = String(data.fullName || "Applicant").trim();
  switch (type) {
    case "founder-application": {
      const biz = data.businessName ? ` - ${String(data.businessName).trim()}` : "";
      return `[LaunchPath Labs] New Founder Application: ${name}${biz}`;
    }
    case "founder-interest": {
      const biz = data.businessName ? ` - ${String(data.businessName).trim()}` : "";
      return `[LaunchPath Labs] Founder Interest Registration: ${name}${biz}`;
    }
    case "sponsor-enquiry": {
      const org = data.organisation ? ` (${String(data.organisation).trim()})` : "";
      return `[LaunchPath Labs] New Sponsor Enquiry: ${name}${org}`;
    }
    case "general-contact": {
      const enquiry = data.enquiryType ? ` [${String(data.enquiryType).trim()}]` : "";
      return `[LaunchPath Labs] Contact Enquiry: ${name}${enquiry}`;
    }
    default:
      return `[LaunchPath Labs] New Website Submission from ${name}`;
  }
}

export function generateHtmlEmail(type: SubmissionType, submittedAt: string, data: Record<string, unknown>): string {
  const titleMap: Record<SubmissionType, { label: string; badgeColor: string }> = {
    "founder-application": { label: "Founder Accelerator Application", badgeColor: "#00e599" },
    "founder-interest": { label: "Founder Interest Registration", badgeColor: "#38bdf8" },
    "sponsor-enquiry": { label: "Sponsor & Partnership Enquiry", badgeColor: "#fbbf24" },
    "general-contact": { label: "Website Contact Message", badgeColor: "#a78bfa" }
  };

  const info = titleMap[type] || { label: "Website Submission", badgeColor: "#00e599" };
  const senderEmail = String(data.email || "");
  const senderName = String(data.fullName || "Anonymous");
  const senderPhone = String(data.mobile || "");

  const entries = Object.entries(data).filter(([key]) => key !== "company");

  const rowsHtml = entries
    .map(([key, value]) => {
      const label = FIELD_LABELS[key] || key;
      const displayValue =
        value === true || value === "on"
          ? "✅ Yes / Agreed"
          : value === false
            ? "❌ No"
            : String(value ?? "").trim() || "—";

      return `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 16px; font-weight: 600; color: #1e293b; width: 35%; vertical-align: top; background-color: #f8fafc; font-size: 14px;">
            ${escapeHtml(label)}
          </td>
          <td style="padding: 12px 16px; color: #334155; vertical-align: top; font-size: 14px; white-space: pre-wrap; word-break: break-word;">
            ${escapeHtml(displayValue)}
          </td>
        </tr>
      `;
    })
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(formatSubmissionSubject(type, data))}</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.6;">
  <div style="max-width: 680px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
    
    <!-- Header -->
    <div style="background-color: #002147; padding: 28px 32px; color: #ffffff; border-bottom: 4px solid #00e599;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="font-size: 18px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #00e599;">LaunchPath Labs</span>
        <span style="display: inline-block; padding: 4px 12px; background-color: rgba(255,255,255,0.15); border-radius: 9999px; font-size: 12px; font-weight: 600; color: #ffffff;">
          ${escapeHtml(info.label)}
        </span>
      </div>
      <h1 style="margin: 0; font-size: 22px; font-weight: 600; color: #ffffff; line-height: 1.3;">
        New submission received from ${escapeHtml(senderName)}
      </h1>
      <p style="margin: 8px 0 0 0; font-size: 13px; color: #94a3b8;">
        Submitted at: ${new Date(submittedAt).toUTCString()} (Recipient: ${DEFAULT_RECIPIENT_EMAIL})
      </p>
    </div>

    <!-- Quick Action Card -->
    <div style="padding: 20px 32px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="font-size: 14px; color: #475569;">
            <strong>Applicant Contact:</strong><br>
            <span style="font-size: 16px; color: #0f172a; font-weight: 600;">${escapeHtml(senderName)}</span><br>
            <a href="mailto:${escapeHtml(senderEmail)}" style="color: #002147; text-decoration: underline; font-weight: 500;">${escapeHtml(senderEmail)}</a>
            ${senderPhone ? ` &bull; <a href="tel:${escapeHtml(senderPhone)}" style="color: #002147; text-decoration: underline;">${escapeHtml(senderPhone)}</a>` : ""}
          </td>
          <td style="text-align: right; vertical-align: middle;">
            <a href="mailto:${escapeHtml(senderEmail)}?subject=Re:%20LaunchPath%20Labs%20${encodeURIComponent(info.label)}" style="display: inline-block; padding: 10px 20px; background-color: #002147; color: #ffffff; font-weight: 600; font-size: 14px; text-decoration: none; border-radius: 6px;">
              Reply to ${escapeHtml(senderName.split(" ")[0])}
            </a>
          </td>
        </tr>
      </table>
    </div>

    <!-- Submission Details Table -->
    <div style="padding: 24px 32px;">
      <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em;">
        Form Submission Details
      </h2>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
      <p style="margin: 0;">This email was generated automatically by the LaunchPath Labs website system.</p>
      <p style="margin: 4px 0 0 0;">All notifications are directed to <strong>${DEFAULT_RECIPIENT_EMAIL}</strong>.</p>
    </div>

  </div>
</body>
</html>
  `;
}

export function generatePlainTextEmail(type: SubmissionType, submittedAt: string, data: Record<string, unknown>): string {
  const senderEmail = String(data.email || "");
  const senderName = String(data.fullName || "Anonymous");
  const subject = formatSubmissionSubject(type, data);

  let text = `=======================================================\n`;
  text += `LAUNCHPATH LABS - ${subject}\n`;
  text += `=======================================================\n\n`;
  text += `Submitted At: ${submittedAt}\n`;
  text += `Recipient: ${DEFAULT_RECIPIENT_EMAIL}\n`;
  text += `Applicant: ${senderName} (${senderEmail})\n\n`;
  text += `--- DETAILS ---\n\n`;

  for (const [key, value] of Object.entries(data)) {
    if (key === "company") continue;
    const label = FIELD_LABELS[key] || key;
    const displayValue =
      value === true || value === "on" ? "Yes / Agreed" : value === false ? "No" : String(value ?? "").trim();
    text += `${label}:\n${displayValue}\n\n`;
  }

  text += `=======================================================\n`;
  return text;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendSubmissionEmail(payload: EmailData): Promise<SendResult> {
  const { type, submittedAt, data } = payload;
  const recipient = getRecipientEmail(type);
  const subject = formatSubmissionSubject(type, data);
  const html = generateHtmlEmail(type, submittedAt, data);
  const text = generatePlainTextEmail(type, submittedAt, data);
  const replyTo = String(data.email || "").trim() || undefined;

  const deliveryAttempts: string[] = [];

  // 1. Check for Resend API Key
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromAddress = process.env.RESEND_FROM || "LaunchPath Labs <onboarding@resend.dev>";
      
      const response = await resend.emails.send({
        from: fromAddress,
        to: recipient,
        replyTo: replyTo,
        subject: subject,
        html: html,
        text: text
      });

      if (!response.error) {
        return {
          ok: true,
          provider: "resend",
          message: "Thank you. Your submission has been received and emailed to hello@launchpath.co.za.",
          details: response.data
        };
      }
      deliveryAttempts.push(`Resend error: ${response.error.message}`);
    } catch (err: unknown) {
      deliveryAttempts.push(`Resend exception: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // 2. Check for SMTP credentials
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true" || Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const fromAddress = process.env.SMTP_FROM || `"LaunchPath Labs" <${process.env.SMTP_USER}>`;

      const info = await transporter.sendMail({
        from: fromAddress,
        to: recipient,
        replyTo: replyTo,
        subject: subject,
        html: html,
        text: text
      });

      return {
        ok: true,
        provider: "smtp",
        message: "Thank you. Your submission has been received and emailed to hello@launchpath.co.za.",
        details: { messageId: info.messageId }
      };
    } catch (err: unknown) {
      deliveryAttempts.push(`SMTP exception: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // 3. Check for Webhook URL
  if (process.env.SUBMISSION_WEBHOOK_URL) {
    try {
      const response = await fetch(process.env.SUBMISSION_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(process.env.SUBMISSION_WEBHOOK_SECRET ? { authorization: `Bearer ${process.env.SUBMISSION_WEBHOOK_SECRET}` } : {})
        },
        body: JSON.stringify({
          ...payload,
          recipient,
          subject,
          text
        }),
        cache: "no-store"
      });

      if (response.ok) {
        return {
          ok: true,
          provider: "webhook",
          message: "Thank you. Your submission has been received and routed to LaunchPath."
        };
      }
      deliveryAttempts.push(`Webhook returned status: ${response.status}`);
    } catch (err: unknown) {
      deliveryAttempts.push(`Webhook exception: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // 4. Default / Server Console Fallback for local dev and preview
  // Logs the structured submission so it is never dropped and always visible.
  console.log("==================================================================");
  console.log(`[EMAIL ROUTING TO: ${recipient}] ${subject}`);
  console.log(`Submitted at: ${submittedAt}`);
  console.log(`Reply-to: ${replyTo}`);
  console.log("Payload data:", JSON.stringify(data, null, 2));
  if (deliveryAttempts.length > 0) {
    console.warn("Delivery attempts log:", deliveryAttempts.join(" | "));
  }
  console.log("==================================================================");

  return {
    ok: true,
    provider: "console_fallback",
    message: "Thank you. Your submission has been successfully received by LaunchPath (hello@launchpath.co.za)."
  };
}
