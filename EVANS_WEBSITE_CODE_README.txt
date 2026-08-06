LaunchPath Labs website code handover for Evans

Current preview URL:
https://files-mentioned-by-the-user-linkedin-k1im8kx1m.vercel.app/

Project type:
Next.js App Router website using TypeScript and Tailwind CSS.

Install:
npm install

Run locally:
npm run dev

Build:
npm run build

Useful scripts:
npm run typecheck
npm run lint
npm run build

Deploy:
This handover includes .vercel/project.json so the existing Vercel project context is visible. If Evans has access to the LaunchPath Vercel team, he can run:
npm install
npm run build
npx vercel deploy

To deploy production after verifying the preview:
npx vercel deploy --prod

Important folders:
app/ - Next.js routes and pages
components/ - reusable UI sections and forms
lib/ - site configuration, FAQ content, form constants and submission adapter
public/ - logo, brand assets, stock photography and social images

Form submissions:
The forms post to app/api/submit/route.ts. Production submission delivery depends on SUBMISSION_WEBHOOK_URL and optional SUBMISSION_WEBHOOK_SECRET environment variables.

Environment variables:
Use .env.example as the reference. The website will build without the webhook variables, but live form delivery requires SUBMISSION_WEBHOOK_URL to be configured in Vercel.

Notes:
Generated folders such as node_modules and .next are intentionally excluded from this handover zip.
No secret values are included in this handover.
