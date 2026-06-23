# Practice Notes App

A simple notes app built with Next.js + MongoDB Atlas. Used to practice deploying to Vercel.

## What it does

- Type a note and click Save
- Notes are stored in MongoDB Atlas
- Reload the page — notes survive (that proves persistence)

## Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Database:** MongoDB Atlas via Mongoose
- **Deploy:** Vercel

## How to run locally

1. Copy `.env.local.example` to `.env.local` and fill in your MongoDB URI:
   ```
   MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.XXXXX.mongodb.net/practice-app
   ```

2. Install dependencies and start:
   ```bash
   npm install
   npm run dev
   ```

3. Open http://localhost:3000

## Environment variables needed in Vercel

| Variable | Description |
|---|---|
| `MONGODB_URI` | Your MongoDB Atlas connection string |

## How to deploy

1. Push this repo to GitHub
2. Go to vercel.com and click Add New Project
3. Import this repo
4. Add `MONGODB_URI` in the Environment Variables section
5. In MongoDB Atlas, set Network Access to allow `0.0.0.0/0`
6. Click Deploy
7. Test in a fresh incognito window: add a note, reload, confirm it survived
