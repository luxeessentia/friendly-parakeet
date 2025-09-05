Luxe Essentials - Next.js + Firebase + Stripe scaffold
----------------------------------------------------

1) cd to the project:
   cd C:\Users\agbon\luxe-next-full

2) Install dependencies:
   npm install

3) Copy environment file:
   copy .env.local.example .env.local
   Edit .env.local and paste your NEXT_PUBLIC_FIREBASE_* and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY values.
   (For local server API testing you may add STRIPE_SECRET_KEY and FIREBASE_ADMIN_KEY to .env.local, but DO NOT commit it.)

4) Run locally:
   npm run dev
   Open http://localhost:3000

5) Deploy:
   Push to GitHub, connect to Vercel.
   In Vercel Project Settings add these environment variables (server secrets should be set as Protected/Secret):
     - NEXT_PUBLIC_FIREBASE_API_KEY (public)
     - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN (public)
     - NEXT_PUBLIC_FIREBASE_PROJECT_ID (public)
     - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET (public)
     - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID (public)
     - NEXT_PUBLIC_FIREBASE_APP_ID (public)
     - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (public)
     - STRIPE_SECRET_KEY (server-only)
     - FIREBASE_ADMIN_KEY (server-only: paste service account JSON as single line)
     - SUCCESS_URL (server-only)
     - CANCEL_URL (server-only)

Security: Never commit server secrets to GitHub. Use Vercel env variables.
