# Deployment Guide

> Stack: **Railway** (Node.js + Express backend + PostgreSQL) · **Vercel** (Next.js frontend) · **Stripe** (payments)

---

## Prerequisites

- GitHub account with this repo pushed
- [Railway account](https://railway.app)
- [Vercel account](https://vercel.com)
- [Stripe account](https://dashboard.stripe.com) (live or test)

---

## STEP 1 — Deploy Backend to Railway

### 1.1 Create a new Railway project

1. Go to [railway.app](https://railway.app) → **New Project**
2. Choose **Deploy from GitHub repo** → select your repo
3. When asked which directory to deploy, set the **Root Directory** to `backend`

### 1.2 Add a PostgreSQL database

1. Inside the Railway project, click **+ New** → **Database** → **Add PostgreSQL**
2. Railway automatically injects `DATABASE_URL` into your backend service — no manual copy needed

### 1.3 Set environment variables (Railway → your backend service → Variables)

| Variable | Value |
|---|---|
| `DATABASE_URL` | *(auto-injected by Railway PostgreSQL — leave as-is)* |
| `STRIPE_SECRET_KEY` | `sk_live_...` (from Stripe Dashboard → API Keys) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (from Stripe Dashboard → Webhooks — fill in after Step 3) |
| `FRONTEND_URL` | Your Vercel URL, e.g. `https://shopline.vercel.app` |

> `PORT` is also injected automatically by Railway — do not set it manually.

### 1.4 Set the build and start commands

In Railway → your backend service → **Settings**:

| Setting | Value |
|---|---|
| Build Command | `npm install && npm run build` |
| Start Command | `npm run db:migrate:deploy && npm start` |

> `npm run db:migrate:deploy` runs `prisma migrate deploy` which applies all pending migrations to the live PostgreSQL database on every deploy.

### 1.5 Deploy

Click **Deploy**. Railway builds the TypeScript, generates the Prisma client, runs migrations, and starts the server.

Once deployed, note your backend URL: `https://your-project.up.railway.app`

### 1.6 Verify the backend is healthy

Visit `https://your-project.up.railway.app/health` — you should see `{"status":"ok"}`.

---

## STEP 2 — Deploy Frontend to Vercel

### 2.1 Import project

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Set **Root Directory** to `frontend`
4. Framework preset: **Next.js** (auto-detected)

### 2.2 Set environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | Your Railway backend URL, e.g. `https://your-project.up.railway.app` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` (from Stripe Dashboard → API Keys) |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` (optional — your GA4 Measurement ID) |

### 2.3 Deploy

Click **Deploy**. Vercel builds Next.js and serves the frontend.

Note your frontend URL: `https://shopline.vercel.app`

---

## STEP 3 — Configure Stripe Webhook

This is required for order status to update to `paid` after a successful payment.

### 3.1 Create the webhook endpoint

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Endpoint URL: `https://your-project.up.railway.app/api/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `checkout.session.expired`
5. Click **Add endpoint**

### 3.2 Copy the webhook signing secret

After creating the endpoint, click **Reveal** next to **Signing secret** — copy the `whsec_...` value.

### 3.3 Add to Railway

Go to Railway → backend service → Variables → add:

```
STRIPE_WEBHOOK_SECRET = whsec_...
```

Redeploy the backend (Railway redeploys automatically on variable changes).

### 3.4 Test the webhook

In Stripe Dashboard → Webhooks → your endpoint → **Send test webhook** → select `checkout.session.completed` → Send.
Check Railway logs to confirm `Order paid — session cs_xxx` appears.

---

## STEP 4 — Connect a Custom Domain (Optional)

### Frontend (Vercel)

1. Vercel → Project → **Domains** → **Add**
2. Enter your domain (e.g. `www.shopline.com`)
3. Follow the DNS instructions (add CNAME or A record at your registrar)

### Update FRONTEND_URL on Railway

Once your custom domain is live, update the Railway variable:

```
FRONTEND_URL = https://www.shopline.com
```

This ensures Stripe redirects (success/cancel URLs) and CORS use the correct domain.

---

## Environment Variable Reference

### Backend (Railway)

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string (auto-injected by Railway) |
| `PORT` | Auto | Injected by Railway |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key (`sk_live_...` or `sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Yes | Webhook signing secret (`whsec_...`) |
| `FRONTEND_URL` | Yes | Frontend URL for Stripe redirects and CORS |

### Frontend (Vercel)

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes | Railway backend URL (no trailing slash) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Stripe publishable key (`pk_live_...`) |
| `NEXT_PUBLIC_GA_ID` | No | GA4 Measurement ID (`G-XXXXXXXXXX`) |

---

## Post-Deployment Checklist

- [ ] `/health` on Railway returns `{"status":"ok"}`
- [ ] Homepage loads on Vercel
- [ ] Products load from the API
- [ ] Stripe Checkout initiates (use test card `4242 4242 4242 4242`)
- [ ] `/checkout/success` shows order confirmation after payment
- [ ] Stripe webhook logs show `200 OK` responses
- [ ] Order status updates to `paid` in Railway logs

---

## Local Development (unchanged)

```bash
# Backend
cd backend
cp .env.example .env   # fill in your values
npm install
npm run db:migrate     # creates local SQLite DB (for dev only)
npm run dev

# Frontend
cd frontend
cp .env.example .env.local   # fill in your values
npm install
npm run dev
```
