"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/button";
import { businessStages, internetTypes, organisationTypes, provinces, supportOptions } from "@/lib/forms";
import { formatCurrency, siteConfig } from "@/lib/site-config";

type FormState = {
  loading: boolean;
  ok: boolean | null;
  message: string;
};

type FieldErrorMap = Record<string, string>;

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
};

type SelectProps = {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  error?: string;
};

const initialState: FormState = { loading: false, ok: null, message: "" };

const founderSteps = [
  {
    title: "About you",
    fields: ["fullName", "email", "mobile", "city", "province"]
  },
  {
    title: "About your business",
    fields: ["businessName", "businessStage", "industry", "teamSize", "businessDescription", "problem", "targetCustomer"]
  },
  {
    title: "What you have tested",
    fields: ["currentRevenue", "currentEvidence", "demandTests", "mostNeedToProve"]
  },
  {
    title: "Programme readiness",
    fields: ["weeklyCommitment", "customerAccess", "customerInterviews", "pricingTest", "salesOutreach", "device", "internetAccess", "evidenceResponse", "goals"]
  },
  {
    title: "Payment and bursary interest",
    fields: ["placeType", "paymentOption", "bursaryAdminFeeUnderstanding"]
  },
  {
    title: "Declarations",
    fields: ["accuracy", "participation", "dataProcessing", "confidentiality", "sponsorReporting"]
  }
];

async function submitForm(form: HTMLFormElement, type: string, setState: (state: FormState) => void) {
  const data = Object.fromEntries(new FormData(form).entries());
  setState({ loading: true, ok: null, message: "Submitting..." });

  try {
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

function validateFields(form: HTMLFormElement, fields: string[]) {
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

function mergeErrors(...maps: FieldErrorMap[]) {
  return Object.assign({}, ...maps);
}

function FormAlert({ state }: { state: FormState }) {
  if (!state.message) return null;
  return (
    <div
      role="status"
      className={`rounded-md border p-4 text-sm leading-6 ${
        state.ok === true ? "border-lime bg-lime/15 text-navy" : state.ok === false ? "border-red-200 bg-red-50 text-red-900" : "border-line bg-offwhite text-navy"
      }`}
    >
      {state.message}
    </div>
  );
}

function RequiredText({ required = true }: { required?: boolean }) {
  return <span className="ml-1 text-xs font-medium text-slate">{required ? "(required)" : "(optional)"}</span>;
}

function ErrorText({ error }: { error?: string }) {
  return error ? <span className="mt-2 block text-sm font-medium text-red-700">{error}</span> : null;
}

function Field({ label, name, type = "text", required = true, placeholder, error }: FieldProps) {
  return (
    <label className="label">
      {label}
      <RequiredText required={required} />
      <input className="input" name={name} type={type} placeholder={placeholder} aria-required={required} aria-invalid={Boolean(error)} />
      <ErrorText error={error} />
    </label>
  );
}

function TextArea({ label, name, required = true, rows = 4, error }: FieldProps & { rows?: number }) {
  return (
    <label className="label">
      {label}
      <RequiredText required={required} />
      <textarea className="input min-h-28" name={name} rows={rows} aria-required={required} aria-invalid={Boolean(error)} />
      <ErrorText error={error} />
    </label>
  );
}

function Select({ label, name, options, required = true, error }: SelectProps) {
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

function Consent({ name, children, required = true, error }: { name: string; children: React.ReactNode; required?: boolean; error?: string }) {
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

function StepProgress({ step }: { step: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm font-semibold text-navy">
        <span>
          Step {step + 1} of {founderSteps.length}
        </span>
        <span>{founderSteps[step].title}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-lime transition-all" style={{ width: `${((step + 1) / founderSteps.length) * 100}%` }} />
      </div>
    </div>
  );
}

function StepPanel({ active, children }: { active: boolean; children: React.ReactNode }) {
  return <div className={active ? "grid gap-5" : "hidden"}>{children}</div>;
}

export function FounderApplicationForm() {
  const [state, setState] = useState(initialState);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrorMap>({});
  const formRef = useRef<HTMLFormElement>(null);
  const type = siteConfig.cohort.applicationsOpen ? "founder-application" : "founder-interest";

  const validateStep = (nextStep?: number) => {
    if (!formRef.current) return false;
    const fields = typeof nextStep === "number" ? founderSteps[nextStep].fields : founderSteps.flatMap((item) => item.fields);
    const newErrors = validateFields(formRef.current, fields);
    setErrors((current) => mergeErrors(current, newErrors));
    return Object.keys(newErrors).length === 0;
  };

  const clearStepErrors = (currentStep: number) => {
    setErrors((current) => {
      const next = { ...current };
      founderSteps[currentStep].fields.forEach((field) => delete next[field]);
      return next;
    });
  };

  return (
    <form
      ref={formRef}
      className="grid gap-8"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const allErrors = validateFields(event.currentTarget, founderSteps.flatMap((item) => item.fields));
        setErrors(allErrors);
        if (Object.keys(allErrors).length > 0) {
          const firstInvalidStep = founderSteps.findIndex((item) => item.fields.some((field) => allErrors[field]));
          setStep(Math.max(firstInvalidStep, 0));
          setState({ loading: false, ok: false, message: "Please complete the highlighted fields before submitting." });
          return;
        }
        void submitForm(event.currentTarget, type, (nextState) => {
          setState(nextState);
          if (nextState.ok) {
            setStep(0);
            setErrors({});
          }
        });
      }}
    >
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <FormAlert state={state} />
      <StepProgress step={step} />

      <StepPanel active={step === 0}>
        <legend className="text-xl font-semibold text-navy">About you</legend>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Full name" name="fullName" error={errors.fullName} />
          <Field label="Email" name="email" type="email" error={errors.email} />
          <Field label="Mobile number" name="mobile" type="tel" error={errors.mobile} />
          <Field label="City or town" name="city" error={errors.city} />
          <Select label="Province" name="province" options={provinces} error={errors.province} />
          <Field label="LinkedIn profile" name="linkedin" required={false} />
        </div>
      </StepPanel>

      <StepPanel active={step === 1}>
        <legend className="text-xl font-semibold text-navy">About your business</legend>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Business name" name="businessName" error={errors.businessName} />
          <Field label="Website or social media link" name="website" required={false} />
          <Select label="Business stage" name="businessStage" options={businessStages} error={errors.businessStage} />
          <Field label="Industry" name="industry" error={errors.industry} />
          <Field label="Number of people currently working in the business" name="teamSize" type="number" error={errors.teamSize} />
        </div>
        <TextArea label="Business description" name="businessDescription" error={errors.businessDescription} />
        <TextArea label="Problem being solved" name="problem" error={errors.problem} />
        <TextArea label="Target customer" name="targetCustomer" error={errors.targetCustomer} />
      </StepPanel>

      <StepPanel active={step === 2}>
        <legend className="text-xl font-semibold text-navy">What you have tested</legend>
        <TextArea label="Current revenue or commercial activity" name="currentRevenue" error={errors.currentRevenue} />
        <TextArea label="Current customer evidence" name="currentEvidence" error={errors.currentEvidence} />
        <TextArea label="What have you already done to test demand?" name="demandTests" error={errors.demandTests} />
        <TextArea label="What do you most need to prove during the programme?" name="mostNeedToProve" error={errors.mostNeedToProve} />
      </StepPanel>

      <StepPanel active={step === 3}>
        <legend className="text-xl font-semibold text-navy">Programme readiness</legend>
        <div className="grid gap-5 md:grid-cols-2">
          <Select label="Can you commit 4-6 hours each week?" name="weeklyCommitment" options={["Yes", "No", "Not sure"]} error={errors.weeklyCommitment} />
          <Select label="Can you access prospective customers during the programme?" name="customerAccess" options={["Yes", "No", "Not sure"]} error={errors.customerAccess} />
          <Select label="Are you willing to conduct customer interviews?" name="customerInterviews" options={["Yes", "No"]} error={errors.customerInterviews} />
          <Select label="Are you willing to test your pricing and offer?" name="pricingTest" options={["Yes", "No"]} error={errors.pricingTest} />
          <Select label="Are you willing to conduct direct sales outreach?" name="salesOutreach" options={["Yes", "No"]} error={errors.salesOutreach} />
          <Select label="What device will you use?" name="device" options={["Smartphone", "Computer", "Both", "Other"]} error={errors.device} />
          <Select label="What type of internet access do you have?" name="internetAccess" options={internetTypes} error={errors.internetAccess} />
        </div>
        <TextArea label="What would you do if the evidence showed that your current idea or approach was wrong?" name="evidenceResponse" error={errors.evidenceResponse} />
        <TextArea label="What do you want to prove or achieve during the 12 weeks?" name="goals" error={errors.goals} />
      </StepPanel>

      <StepPanel active={step === 4}>
        <legend className="text-xl font-semibold text-navy">Payment and bursary interest</legend>
        <Select
          label="Are you applying for a founder-funded or sponsored bursary place?"
          name="placeType"
          options={["Founder-funded place", "Sponsored bursary place", "Either option"]}
          error={errors.placeType}
        />
        <Select
          label="Preferred payment option if selected for a founder-funded place"
          name="paymentOption"
          options={[`Once-off payment of ${formatCurrency(siteConfig.pricing.foundingCohortFee)}`, `${siteConfig.pricing.instalmentCount} monthly payments of ${formatCurrency(siteConfig.pricing.instalmentAmount)}`, "Not applicable because I am applying for a bursary"]}
          error={errors.paymentOption}
        />
        <Select
          label={`If selected for a bursary, do you understand that the ${formatCurrency(siteConfig.pricing.bursaryAdminFee)} admin commitment fee is only payable after selection and acceptance?`}
          name="bursaryAdminFeeUnderstanding"
          options={["Yes", "No", "Not applicable"]}
          error={errors.bursaryAdminFeeUnderstanding}
        />
      </StepPanel>

      <StepPanel active={step === 5}>
        <legend className="text-xl font-semibold text-navy">Declarations and consent</legend>
        <Consent name="accuracy" error={errors.accuracy}>I confirm that the information provided is accurate to the best of my knowledge.</Consent>
        <Consent name="participation" error={errors.participation}>I understand that participation requires weekly execution, customer engagement and evidence submission.</Consent>
        <Consent name="dataProcessing" error={errors.dataProcessing}>I consent to LaunchPath processing my application data for selection, onboarding and programme administration.</Consent>
        <Consent name="confidentiality" error={errors.confidentiality}>I acknowledge that participant confidentiality and respectful handling of shared business information are expected.</Consent>
        <Consent name="sponsorReporting" error={errors.sponsorReporting}>I understand sponsor reporting is aggregated or anonymised unless I provide explicit consent for identifiable information to be shared.</Consent>
        <Consent name="mediaConsent" required={false}>Optional: I consent to being contacted about possible media or story-sharing opportunities.</Consent>
      </StepPanel>

      <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:justify-between">
        <Button type="button" variant="secondary" disabled={step === 0 || state.loading} onClick={() => setStep((value) => Math.max(value - 1, 0))}>
          Back
        </Button>
        {step < founderSteps.length - 1 ? (
          <Button
            type="button"
            disabled={state.loading}
            onClick={() => {
              clearStepErrors(step);
              if (validateStep(step)) setStep((value) => Math.min(value + 1, founderSteps.length - 1));
            }}
          >
            Continue
          </Button>
        ) : (
          <Button type="submit" disabled={state.loading}>
            {siteConfig.cohort.applicationsOpen ? siteConfig.ctas.founderOpen : siteConfig.ctas.founderClosed}
          </Button>
        )}
      </div>
    </form>
  );
}

export function SponsorEnquiryForm() {
  const [state, setState] = useState(initialState);

  return (
    <form
      className="grid gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        void submitForm(event.currentTarget, "sponsor-enquiry", setState);
      }}
    >
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <FormAlert state={state} />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" name="fullName" />
        <Field label="Work email" name="email" type="email" />
        <Field label="Mobile number" name="mobile" type="tel" />
        <Field label="Organisation" name="organisation" />
        <Field label="Job title" name="jobTitle" />
        <Select label="Organisation type" name="organisationType" options={organisationTypes} />
        <Field label="Province or region" name="region" />
        <Field label="Number of founders you may wish to sponsor" name="sponsorFounderCount" />
        <Select
          label="Primary partnership interest"
          name="interest"
          options={["Founder bursaries", "Founder prize", "Mentors", "Customer or supplier access", "Full cohort sponsorship", "Other"]}
        />
        <Select label="Type of support being considered" name="supportType" options={supportOptions} />
        <Field label="Preferred geographic or demographic focus" name="focusArea" />
        <Field label="Budget range" name="budgetRange" required={false} />
        <Select label="Preferred meeting method" name="meetingMethod" options={["Online meeting", "Phone call", "In-person if practical"]} />
      </div>
      <TextArea label="Reporting requirements" name="reportingRequirements" />
      <TextArea label="Additional context" name="additionalContext" />
      <Consent name="popiaConsent">I consent to LaunchPath processing this enquiry and contacting me about a potential sponsored cohort or partnership discussion.</Consent>
      <Button type="submit" disabled={state.loading}>{siteConfig.ctas.sponsor}</Button>
    </form>
  );
}

export function ContactForm() {
  const [state, setState] = useState(initialState);

  return (
    <form
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        void submitForm(event.currentTarget, "general-contact", setState);
      }}
    >
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <FormAlert state={state} />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" name="fullName" />
        <Field label="Email" name="email" type="email" />
        <Field label="Mobile number" name="mobile" type="tel" required={false} />
        <Select label="Enquiry type" name="enquiryType" options={["General enquiry", "Sponsor and partnership enquiry", "Founder application enquiry"]} />
      </div>
      <TextArea label="Message" name="message" />
      <Consent name="popiaConsent">I consent to LaunchPath processing this enquiry and contacting me in response.</Consent>
      <Button type="submit" disabled={state.loading}>Send enquiry</Button>
    </form>
  );
}
