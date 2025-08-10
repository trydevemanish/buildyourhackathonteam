## Buildyourhackathonteam
A small place where developers can create, join, and manage hackathon teams with ease.

## Tech Stack
- **Frontend:** Next.js, Tailwind CSS  
- **Backend:** Next.js API Routes, Prisma , Firebase 
- **Auth:** Clerk  
- **Database:** PostgreSQL  
---

<p align="center">
  <img src="https://raw.githubusercontent.com/trydevemanish/buildyourhackathonteam/main/public/header.png" alt="simple tool to find peers" width="400" height="400">
</p>

## Getting Started

First, run the development server:

```bash

1. git clone https://github.com/trydevemanish/buildyourhackathonteam.git

```

Create a .env.local file in the root dir and add these keys value
```bash

2.  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    
    # for production 
    NODE_ENV=production
    NEXT_PUBLIC_CLERK_FRONTEND_API=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL_PRODUCTION=
    
    # for development 
    NEXT_PUBLIC_CLERK_FRONTEND_API=https://sharp-viper-46.accounts.dev/sign-in
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=http://localhost:3000/sign-in
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL_DEVELOPMENT=http://localhost:3000/dashboard
    
    # Firebase env variables 
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
    NEXT_PUBLIC_FIREBASE_API_KEY=
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=
    NEXT_PUBLIC_FIREBASE_STORAGEBUCKET=
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
    NEXT_PUBLIC_FIREBASE_APP_ID=
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
    NEXT_PUBLIC_FIREBASE_COLLECTION_ID=

```

```bash

3. npm install

```
```bash

4. npm run dev
```


---

#### Features added or to come..
- ✅ Create team and join others
- ✅ Team requests & invites
- ✅ find other developers
- ✅ Chat feature
- ⏳ Hackathon listings

---
