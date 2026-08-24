import type { SubmissionType } from "./forms";

export type { SubmissionType };

export type SubmissionPayload = {
  type: SubmissionType;
  data: Record<string, string>;
  submittedAt?: string;
  id?: string;
};

export type SubmissionResponse = {
  ok: boolean;
  message: string;
  id?: string;
};
