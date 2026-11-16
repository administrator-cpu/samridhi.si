# samridhi.si (Next.js + Tailwind)

The Samridhi homepage and its registration API in one Next.js app.

- **Design:** DIV brand guide. Plum, Canvas and neutrals, with the magenta→amber gradient used as an accent only. Plus Jakarta Sans for text, Mukta for Hindi, IBM Plex Mono for labels. "Powered by <Div/>" sits in the footer.
- **API:** `POST /api/registrations` saves each registration to **MongoDB Atlas**, then emails it through **Resend**:
  - from `Samridhi <no-reply@fab5network.com>`
  - to `info@fab5network.com`
  - BCC `administrator@fab5network.com`

## Run it

```bash
cp .env.example .env.local   # fill in MONGODB_URI and RESEND_API_KEY
npm install
npm run dev                   # http://localhost:3000
npm run build && npm start    # production
```

Requires Node 20+. Fonts are self-hosted from npm (`@fontsource`), so nothing loads from Google at runtime.

## Before going live

1. **Resend:** verify the domain `fab5network.com` (Resend → Domains) and add the SPF and DKIM records to its DNS. Create an API key with sending access only.
2. **MongoDB Atlas:**
   - Create a database user with read and write access to the `samridhi` database.
   - Allow your server's IP under Network Access.
   - Indexes are created automatically on the first submission.
3. **Hosting:**
   - Run `npm start` behind Nginx with HTTPS. Use pm2 or systemd to keep it running.
   - In the Nginx `location` that proxies to Node, set `proxy_set_header X-Real-IP $remote_addr;`. The rate limiter keys on that header; without it, it falls back to the last `X-Forwarded-For` hop.
   - The rate limiter is in memory per process. If you run several instances, move it to a shared store such as Redis.

## Editing content

Everything on the page lives in **`src/content/site.ts`**.

| What | Where in `site.ts` |
| --- | --- |
| Missed-call, WhatsApp and phone numbers, CSR-1 number | `contact`. Leave a value as `''` and the blocks that use it stay hidden. |
| Impact numbers | `stats`. The section appears once a value is filled in. |
| Programmes, steps, Saathi points, FAQ | `programmes`, `steps`, `saathiPoints`, `faqs` |
| Learner stories | `stories`. The section and its menu link appear once a story has a real quote. |

If you rename a programme, the API's allowed list updates with it.

## How a submission is handled

1. **Checks:**
   - Name required.
   - 10-digit Indian mobile, starting 6–9. `+91` and a leading `0` are accepted.
   - Role and programme must come from the known lists.
2. **Protection:**
   - Only this site, or anything listed in `ALLOWED_ORIGINS`, may post.
   - At most 10 tries per IP every 15 minutes.
   - 10 KB body limit.
   - A hidden honeypot field drops bots quietly.
3. **Saved first,** with `email.status: "pending"`. If the same `Idempotency-Key` arrives twice (a double tap or a retry), the second one is ignored.
4. **Emailed,** then marked `"sent"`. If Resend fails, the record is marked `"failed"` and the learner still sees success. Find those with:
   ```js
   db.registrations.find({ "email.status": "failed" })
   ```

## Files

```
src/app/page.tsx                    the homepage
src/app/layout.tsx                  fonts, SEO metadata, DIV creator markup
src/app/globals.css                 Tailwind v4 + DIV brand tokens
src/app/api/registrations/route.ts  the API
src/components/                     Header, RegisterForm, MobileBar, RoleLink
src/lib/                            validation, email template, MongoDB client, rate limit
src/content/site.ts                 all copy and settings
```
