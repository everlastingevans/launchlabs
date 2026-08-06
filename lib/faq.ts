import { formatCurrency, siteConfig } from "@/lib/site-config";

export const homeFaqs = [
  {
    question: "How much does LaunchPath Labs cost?",
    answer: `The Founding Cohort Fee is ${formatCurrency(siteConfig.pricing.foundingCohortFee)}. This is the launch price for the first LaunchPath Labs founder cohort.`
  },
  {
    question: "Can I pay in instalments?",
    answer: `Yes. Founder-funded participants can pay once off or in ${siteConfig.pricing.instalmentCount} monthly payments of ${formatCurrency(siteConfig.pricing.instalmentAmount)}.`
  },
  {
    question: "Are bursaries available?",
    answer: siteConfig.cohort.bursariesAvailable
      ? "Sponsored bursary applications are available for the next cohort. Bursaries are subject to selection and available sponsor funding."
      : "Sponsored bursary places are subject to confirmation by programme partners. You can still apply and indicate your interest."
  },
  {
    question: "Is there a fee to apply?",
    answer: "No. There is no fee to submit an application."
  },
  {
    question: "What is the R1,000 bursary administration fee?",
    answer: `A successful fully sponsored bursary recipient pays a once-off ${formatCurrency(siteConfig.pricing.bursaryAdminFee)} administration and commitment fee only after being selected and accepting their place. It is not an application fee.`
  },
  {
    question: "Is the founder prize guaranteed?",
    answer:
      "No. The founder prize opportunity is subject to sponsor confirmation. Final prize amounts, rules and eligibility requirements will be published before the programme begins."
  },
  {
    question: "Do I need an existing registered business?",
    answer:
      "No. You may have an idea, informal business, early customers or a registered business. What matters is that you can test the business with real prospective customers."
  },
  {
    question: "Do I need to have revenue?",
    answer:
      "No. Revenue helps, but it is not required. The programme is designed to help you test demand, pricing, sales activity and the path towards revenue."
  },
  {
    question: "How much time must I commit?",
    answer:
      "Expect to spend about four to six hours each week. Most of that time is spent working on your business, not sitting in training sessions."
  },
  {
    question: "What happens if my idea changes during the programme?",
    answer:
      "That can be a good sign. If customer feedback shows your original assumption is weak, you will be expected to adjust your customer, offer, pricing or sales approach."
  },
  {
    question: "Does LaunchPath guarantee funding or customers?",
    answer:
      "No. LaunchPath Labs provides founder education, structured execution support and general business tools. Participation does not guarantee revenue, funding, customers, procurement, investment, job creation or business success."
  },
  {
    question: "Can a sponsor nominate founders?",
    answer:
      "Yes. Sponsors can support recruitment or nominate founders, but founders still need to meet the programme readiness and participation requirements."
  },
  {
    question: "What reporting will sponsors receive?",
    answer:
      "Sponsors can receive reporting on participation, founder activity, progress themes, completion and follow-up outcomes. Founder information is aggregated or anonymised unless explicit consent has been obtained."
  }
];

export const founderFaqs = homeFaqs.slice(0, 11);
