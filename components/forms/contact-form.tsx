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

export function ContactForm() {
  const [state, setState] = useState(initialFormState);

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
