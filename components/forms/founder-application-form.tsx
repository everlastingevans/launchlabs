"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Consent,
  Field,
  FormAlert,
  initialFormState,
  mergeErrors,
  Select,
  StepPanel,
  StepProgress,
  submitForm,
  TextArea,
  validateFields
} from "@/components/forms/form-controls";
import { businessStages, internetTypes, provinces } from "@/lib/forms";
import { formatCurrency, siteConfig } from "@/lib/site-config";
import type { FieldErrorMap, FormStep } from "@/types/forms";

const founderSteps: FormStep[] = [
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

export function FounderApplicationForm() {
  const [state, setState] = useState(initialFormState);
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
      <StepProgress step={step} steps={founderSteps} />

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
