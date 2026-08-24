export type FormState = {
  loading: boolean;
  ok: boolean | null;
  message: string;
};

export type FieldErrorMap = Record<string, string>;

export type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
};

export type SelectProps = {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  error?: string;
};

export type FormStep = {
  title: string;
  fields: string[];
};

export type SubmissionType =
  | "founder-application"
  | "founder-interest"
  | "sponsor-enquiry"
  | "general-contact";
