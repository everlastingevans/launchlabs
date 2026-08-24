"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Consent,
  Field,
  FormAlert,
  initialFormState,
  Select,
  submitForm,
  TextArea
} from "@/components/forms/form-controls";
import { organisationTypes, supportOptions } from "@/lib/forms";
import { siteConfig } from "@/lib/site-config";

export function SponsorEnquiryForm() {
  const [state, setState] = useState(initialFormState);

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
