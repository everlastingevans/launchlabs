export type SubmissionType = "founder-application" | "founder-interest" | "sponsor-enquiry" | "general-contact";

export type SubmissionResult = {
  ok: boolean;
  message: string;
};

type SubmissionPayload = {
  type: SubmissionType;
  submittedAt: string;
  data: Record<string, unknown>;
};

export async function submitToAdapter(payload: SubmissionPayload): Promise<SubmissionResult> {
  const webhookUrl = process.env.SUBMISSION_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      ok: false,
      message:
        "Submission handling is not configured yet. Please email hello@launchpath.co.za or configure SUBMISSION_WEBHOOK_URL."
    };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(process.env.SUBMISSION_WEBHOOK_SECRET ? { authorization: `Bearer ${process.env.SUBMISSION_WEBHOOK_SECRET}` } : {})
    },
    body: JSON.stringify(payload),
    cache: "no-store"
  });

  if (!response.ok) {
    return {
      ok: false,
      message: "The submission service did not accept the request. Please try again or email LaunchPath directly."
    };
  }

  return { ok: true, message: "Thank you. Your submission has been received by LaunchPath." };
}
