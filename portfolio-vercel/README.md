# Portfolio Backend — Vercel Serverless

Contact form backend using Vercel Serverless Functions + Resend.
No Express server, no sleeping, always-on, deploys in 2 minutes.

---

## How Vercel version differs from Express version

| Express (old)         | Vercel (new)                        |
|-----------------------|-------------------------------------|
| `server.js`           | `api/contact.js` + `api/health.js`  |
| Runs 24/7 as a process| Runs only when called (serverless)  |
| Needs a hosting server| Vercel handles everything           |
| `app.listen(3000)`    | Just export a `handler` function    |
| `npm start` to run    | Push to GitHub → auto deploys       |

---

## Complete File Structure

```
portfolio-vercel/           ← push this folder to GitHub
├── api/
│   ├── contact.js          ← handles POST /api/contact
│   └── health.js           ← handles GET /api/health
├── vercel.json             ← routes /api/* to the right function
├── package.json            ← only "resend" dependency
├── .env.example            ← template — safe to commit
├── .gitignore              ← ignores node_modules + .env
└── README.md               ← this file

portfolio/                  ← your GitHub Pages website
└── js/
    └── script.js           ← BACKEND_URL must point to Vercel URL
```

---

## Deploy Steps (takes ~5 minutes total)

### Step 1 — Get Resend API key (30 seconds)
1. Go to https://resend.com → Sign Up with Gmail (free, no card)
2. Dashboard → API Keys → Create API Key → name it `portfolio`
3. Copy the key — starts with `re_`

### Step 2 — Push backend to GitHub
1. Create a new GitHub repo called `portfolio-backend`
2. Upload everything inside `portfolio-vercel/` to that repo
   (the `api/` folder, `vercel.json`, `package.json`, `.gitignore`, `.env.example`)
   ⚠️  Do NOT upload `.env` — never commit your real keys

### Step 3 — Deploy on Vercel
1. Go to https://vercel.com → Sign Up with GitHub (free)
2. Click **Add New Project** → Import your `portfolio-backend` repo
3. Leave all settings as default → click **Deploy**
4. Wait ~30 seconds → you'll get a URL like:
   `https://portfolio-backend-abc123.vercel.app`

### Step 4 — Add Environment Variables in Vercel
1. In Vercel Dashboard → your project → **Settings** → **Environment Variables**
2. Add these two variables:

   | Name              | Value                            |
   |-------------------|----------------------------------|
   | RESEND_API_KEY    | re_your_actual_key_here          |
   | YOUR_EMAIL        | lawrencetony1508@gmail.com       |

3. Click **Save** → go to **Deployments** → click **Redeploy**

### Step 5 — Update your portfolio script.js
Open `portfolio/js/script.js` → find line 12 → replace the URL:

```js
// Before:
const BACKEND_URL = 'https://your-project-name.vercel.app';

// After (use YOUR actual Vercel URL):
const BACKEND_URL = 'https://portfolio-backend-abc123.vercel.app';
```

Save and push to GitHub Pages.

### Step 6 — Test it
Open your portfolio → Contact section → fill the form → Send.
Check `lawrencetony1508@gmail.com` — you'll get an email in seconds ✅

---

## Test the API directly (optional)

Health check — paste in browser:
```
https://your-project.vercel.app/api/health
```
Should return: `{ "status": "ok", "service": "Resend", "platform": "Vercel" }`

Contact endpoint test with curl:
```bash
curl -X POST https://your-project.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@gmail.com","message":"Hello!"}'
```
Should return: `{ "success": true, "message": "Message sent successfully!" }`

---

## How it works

```
Visitor submits contact form
          ↓
Browser → POST https://your-project.vercel.app/api/contact
                    { name, email, message }
          ↓
Vercel wakes api/contact.js (< 100ms)
          ↓
Validates input
          ↓
Resend sends TWO emails in parallel:
  1. TO YOU     → new message notification (reply-to = visitor's email)
  2. TO VISITOR → auto-reply confirmation
          ↓
{ success: true }
          ↓
Form shows ✓ green success, resets fields
```
