export const siteConfig = {
  name: "LaunchPath Labs",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://launchpath.co.za",
  tagline: "R50,000 FOUNDER GRANT",
  description:
    "One business that successfully completes the Founding Cohort will be selected to receive R50,000 in grant funding.",
  contact: {
    email: "hello@launchpath.co.za",
    location: "Cape Town, South Africa",
    delivery: "National online delivery",
    linkedin: ""
  },
  cohort: {
    applicationsOpen: true,
    bursariesAvailable: false,
    prizeConfirmed: false,
    sponsorEnquiriesOpen: true,
    size: "30-40 founders",
    cohortSize: "30-40 founders",
    duration: "12 weeks",
    commitment: "4-6 hours each week",
    delivery: "Online across South Africa",
    followUp: "30, 60 and 90-day follow-up",
    cohortStartDate: null,
    cohortEndDate: null
  },
  pricing: {
    foundingCohortFee: 12000,
    bursaryAdminFee: 1000,
    instalmentCount: 3,
    instalmentAmount: 4000
  },
  prize: {
    confirmedPrizeAmount: null,
    suggestedPrizePartnershipAmount: 100000
  },
  ctas: {
    founderOpen: "Apply for the Founding Cohort",
    founderClosed: "Register Your Interest",
    founderSecondary: "Apply as a Founder",
    programme: "Explore the Programme",
    founderProgramme: "See the Founder Programme",
    sponsor: "Sponsor a Cohort",
    sponsorDiscussion: "Discuss a Sponsored Cohort"
  },
  hiddenTrust: {
    testimonialsEnabled: false,
    partnerLogosEnabled: false
  }
} as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Programme", href: "/programme" },
  { label: "For Founders", href: "/founders" },
  { label: "For Sponsors", href: "/sponsors" },
  { label: "Why LaunchPath", href: "/why-launchpath" },
  { label: "Apply", href: "/apply" }
];

export const programmeStages = [
  {
    label: "Week 0",
    title: "Stage 1: Understand where you are starting",
    items: ["Review your current business or idea", "Set your baseline", "Confirm your commitment", "Identify the assumptions you need to test"]
  },
  {
    label: "Weeks 1-4",
    title: "Stage 2: Speak to the right customers",
    items: ["Define who you believe your customer is", "Conduct customer interviews", "Test whether the problem is important", "Change your assumptions where necessary"]
  },
  {
    label: "Weeks 5-8",
    title: "Stage 3: Build and test your offer",
    items: ["Clarify what you are selling", "Build a simple offer", "Test your pricing", "Understand the basic numbers behind the business", "Gather customer feedback"]
  },
  {
    label: "Weeks 9-12",
    title: "Stage 4: Take the business to market",
    items: ["Identify realistic prospects", "Conduct direct outreach", "Start sales conversations", "Build an active pipeline", "Prepare your next 90 days"]
  },
  {
    label: "30, 60 and 90-day follow-up",
    title: "Stage 5: Keep moving after the programme",
    items: ["Review progress", "Track customers, sales and pipeline", "Identify where additional support is needed", "Adjust the 90-day plan"]
  }
];

export const normalWeekItems = [
  "Attend a live working session",
  "Complete a practical task in your business",
  "Speak to customers or prospective customers",
  "Meet with your accountability group",
  "Submit evidence of what you completed",
  "Receive feedback on what to focus on next"
];

export const commercialEvidence = [
  "Customer interview findings",
  "Feedback on your offer",
  "Pricing conversations",
  "Qualified prospects",
  "Sales meetings",
  "Proposals",
  "Pilots",
  "Letters of intent",
  "Purchase orders",
  "An active sales pipeline",
  "Revenue, where achieved"
];

export const founderOutputs = [
  "A clearer target customer",
  "Evidence from real customer conversations",
  "A stronger offer",
  "Pricing you have tested",
  "A qualified prospect list",
  "A practical outreach approach",
  "An active sales pipeline",
  "A clearer view of the business numbers",
  "A 90-day execution plan"
];

export const sponsorAudience = [
  "Banks",
  "Corporate enterprise development teams",
  "Supplier development teams",
  "CSI and ESG divisions",
  "Chambers of commerce",
  "Universities",
  "Foundations",
  "Development funders",
  "Impact investors",
  "Government-supported entrepreneurship programmes",
  "Community organisations",
  "Islamic finance institutions"
];

export const sponsorInvolvement = [
  "Mentors",
  "Specialist experts",
  "Customer access",
  "Supplier development opportunities",
  "Market introductions",
  "Showcase participation",
  "Relevant capital introductions"
];

export const launchPathResponsibilities = [
  "Programme design and delivery",
  "Founder selection process",
  "Facilitator and accountability structure",
  "Quality assurance",
  "Founder feedback rhythm",
  "Sponsor-safe reporting"
];

export const programmePrinciples = [
  "Action before theory",
  "Customer feedback before assumptions",
  "Progress before polish",
  "Accountability before attendance",
  "Responsible reporting before exaggerated claims",
  "Founder ownership of business decisions",
  "National access through practical online delivery"
];

export const notPromised = ["revenue", "funding", "customers", "procurement", "investment", "job creation", "business success"];

export const formatCurrency = (amount: number) => `R${amount.toLocaleString("en-US")}`;
