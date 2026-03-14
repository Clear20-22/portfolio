This is a [Next.js](https://nextjs.org) portfolio project with an interactive UI, project showcase, and a contact form that forwards submissions to your inbox.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contact Form Setup

The contact section submits to `/api/contact` and forwards messages to your email using SMTP.

1. Copy `.env.example` to `.env.local`.
2. Fill in your SMTP credentials.
3. Set `CONTACT_TO_EMAIL` to the inbox where you want submissions delivered.

Example for Gmail:

```bash
cp .env.example .env.local
```

Use an app password instead of your normal Gmail password if you are using Gmail SMTP.

## Notes

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` are required.
- `CONTACT_FROM_EMAIL` should usually match the authenticated SMTP account.
- If `CONTACT_TO_EMAIL` is omitted, the app falls back to the email defined in `src/lib/constants.ts`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
