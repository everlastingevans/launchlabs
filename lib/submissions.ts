import { sendSubmissionEmail } from "@/lib/email";
import type { SubmissionType } from "@/types/submissions";

export type { SubmissionType };

export type SubmissionResult = {
  ok: boolean;
  message: string;
  provider?: string;
};

type SubmissionPayload = {
  type: SubmissionType;
  submittedAt: string;
  data: Record<string, unknown>;
};

export async function submitToAdapter(payload: SubmissionPayload): Promise<SubmissionResult> {
  const result = await sendSubmissionEmail(payload);
  return {
    ok: result.ok,
    message: result.message,
    provider: result.provider
  };
}

