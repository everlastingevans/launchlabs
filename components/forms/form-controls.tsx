"use client";

import type { FieldErrorMap, FieldProps, FormState, FormStep, SelectProps } from "@/types/forms";

export const initialFormState: FormState = { loading: false, ok: null, message: "" };

export async function submitForm(form: HTMLFormElement, type: string, setState: (state: FormState) => void) {
  setState({ loading: true, ok: null, message: "Submitting..." });

  try {
    const data = Object.fromEntries(new FormData(form).entries());
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type, data })
    });
    const result = (await response.json()) as { message?: string };
    setState({ loading: false, ok: response.ok, message: result.message || "Submission complete." });
    if (response.ok) form.reset();
  } catch {
    setState({ loading: false, ok: false, message: "The form could not connect. Please email hello@launchpath.co.za." });
  }
}

export function validateFields(form: HTMLFormElement, fields: string[]): FieldErrorMap {
  const data = new FormData(form);
  const errors: FieldErrorMap = {};

  fields.forEach((field) => {
    const value = data.get(field);
    if (typeof value !== "string" || value.trim().length === 0) {
      errors[field] = "Please complete this field.";
    }
  });

  const email = data.get("email");
  if (fields.includes("email") && (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}

export function mergeErrors(...maps: FieldErrorMap[]): FieldErrorMap {
  return Object.assign({}, ...maps);
}

export function FormAlert({ state }: { state: FormState }) {
  if (!state.message) return null;
  return (
    <div
      role="status"
      className={`rounded-md border p-4 text-sm leading-6 ${
        state.ok === true
          ? "border-lime bg-lime/15 text-navy"
          : state.ok === false
            ? "border-red-200 bg-red-50 text-red-900"
            : "border-line bg-offwhite text-navy"
      }`}
    >
      {state.message}
    </div>
  );
}

export function RequiredText({ required = true }: { required?: boolean }) {
  return <span className="ml-1 text-xs font-medium text-slate">{required ? "(required)" : "(optional)"}</span>;
}

export function ErrorText({ error }: { error?: string }) {
  return error ? <span className="mt-2 block text-sm font-medium text-red-700">{error}</span> : null;
}

export function Field({ label, name, type = "text", required = true, placeholder, error }: FieldProps) {
  return (
    <label className="label">
      {label}
      <RequiredText required={required} />
      <input className="input" name={name} type={type} placeholder={placeholder} aria-required={required} aria-invalid={Boolean(error)} />
      <ErrorText error={error} />
    </label>
  );
}

export function TextArea({ label, name, required = true, rows = 4, error }: FieldProps & { rows?: number }) {
  return (
    <label className="label">
      {label}
      <RequiredText required={required} />
      <textarea className="input min-h-28" name={name} rows={rows} aria-required={required} aria-invalid={Boolean(error)} />
      <ErrorText error={error} />
    </label>
  );
}

export function Select({ label, name, options, required = true, error }: SelectProps) {
  return (
    <label className="label">
      {label}
      <RequiredText required={required} />
      <select className="input" name={name} defaultValue="" aria-required={required} aria-invalid={Boolean(error)}>
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ErrorText error={error} />
    </label>
  );
}

export function Consent({ name, children, required = true, error }: { name: string; children: React.ReactNode; required?: boolean; error?: string }) {
  return (
    <label className="flex gap-3 rounded-md border border-line bg-white p-4 text-sm leading-6 text-slate">
      <input type="checkbox" name={name} className="mt-1 rounded border-line text-navy focus:ring-lime" aria-required={required} aria-invalid={Boolean(error)} />
      <span>
        {children}
        <RequiredText required={required} />
        <ErrorText error={error} />
      </span>
    </label>
  );
}

export function StepProgress({ step, steps }: { step: number; steps: FormStep[] }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm font-semibold text-navy">
        <span>
          Step {step + 1} of {steps.length}
        </span>
        <span>{steps[step].title}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-lime transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>
    </div>
  );
}

export function StepPanel({ active, children }: { active: boolean; children: React.ReactNode }) {
  return <div className={active ? "grid gap-5" : "hidden"}>{children}</div>;
}
