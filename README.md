# LaunchPath Labs Website

Execution-first LaunchPath Labs website built with Next.js App Router, TypeScript and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Form submissions

Forms post to `/api/submit`. In production, configure `SUBMISSION_WEBHOOK_URL` to send validated submissions to an external email, CRM or automation endpoint. If no backend is configured, the API returns a clear configuration error and does not pretend to save the submission.

## Config

Programme status, cohort values, contact details, CTA labels and social links are kept in `lib/site-config.ts`.
