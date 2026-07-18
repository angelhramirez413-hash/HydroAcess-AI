# HydroAccess AI

HydroAccess AI is a bilingual clean-water advisory application built with Next.js, React, TypeScript, Tailwind CSS, Firebase-ready configuration, and a replaceable recommendation engine.

## Architecture

- `src/components` contains reusable UI and the Water Advisor experience.
- `src/data/knowledge-base.ts` stores the initial structured engineering knowledge base.
- `src/lib/recommendation` defines the recommendation interfaces, rule-based engine, and optional Gemini explanation adapter.
- `src/lib/i18n` and `src/messages` keep UI text out of components.
- `src/lib/firebase` prepares Firebase client initialization.
- `firestore` contains Firestore rules and indexes for knowledge-base, assessment, and contact collections.

The language model is not trusted to invent engineering advice. The rule engine selects records from the knowledge base. Gemini can later explain the selected record in natural language, but the prompt explicitly constrains it to the supplied JSON.

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000/en` or `http://localhost:3000/es`.

## Typecheck And Build

```bash
npm run typecheck
npm run build
```

## Firebase Setup

1. Create a Firebase project.
2. Copy `.env.example` to `.env.local`.
3. Fill the `NEXT_PUBLIC_FIREBASE_*` values from your Firebase web app.
4. Enable Firestore. Authentication is prepared in `src/lib/firebase/client.ts` and can be turned on when user accounts are needed.

## Deploy To Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting firestore
npm run build
firebase deploy
```

The included `firebase.json` is configured for Firebase Hosting with framework support.

## Connecting The AI Chatbot

Set `OPENAI_API_KEY` in `.env.local` or your deployment environment to enable the Water Advisor chatbot. You can optionally set `OPENAI_MODEL`; the default is `gpt-4.1-mini`. The API key is only used from the server route and is never exposed to the browser.

`GEMINI_API_KEY` is still supported as a backup provider. If no AI key is configured, the app falls back to the local water-safety response system.

## Adding Engineering Solutions

Add a new `EngineeringSolution` object to `src/data/knowledge-base.ts`. Include source compatibility, climate compatibility, contamination types, cost, materials, instructions, maintenance, limitations, warnings, and references. The rule engine will automatically rank the new record.

For production, move these records into Firestore collections such as:

- `knowledgeBase/waterCollectionMethods`
- `knowledgeBase/waterFiltrationMethods`
- `knowledgeBase/waterStorageMethods`
- `knowledgeBase/sanitationSolutions`
- `knowledgeBase/materialLists`

## Adding Languages

1. Add a locale code to `src/lib/i18n/config.ts`.
2. Add a translation file in `src/messages`.
3. Register the dictionary loader in `src/lib/i18n/dictionaries.ts`.
4. Add localized names, summaries, materials, instructions, maintenance, advantages, limitations, and warnings for each solution.

The architecture is ready for Portuguese, French, Arabic, Hindi, and Swahili.

## Replacing The Recommendation Engine

Implement the `RecommendationEngine` interface in `src/lib/recommendation/types.ts`:

```ts
export interface RecommendationEngine {
  recommend(input: AssessmentInput, locale: Locale): Promise<Recommendation>;
}
```

Then replace the exported `recommendationEngine` in `src/lib/recommendation/rule-engine.ts` or create a provider module that selects between the rule engine and a future ML model by environment variable.

## Security Notes

- Do not expose `GEMINI_API_KEY` to the browser.
- Keep Firebase public config in `NEXT_PUBLIC_FIREBASE_*`; it is not a secret, but Firestore rules must protect data.
- Validate assessment input before persisting it.
- Restrict write access to the knowledge base to trusted admin tooling.
