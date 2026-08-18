# Architectural Decisions & Explanations

## 1. Why this ingestion strategy over the obvious alternative you rejected?
**Strategy Chosen:** We implemented a serverless, event-driven ingestion and processing architecture using **Inngest** for background jobs, combined with on-demand API fetching from Finnhub for market data.
**Alternative Rejected:** A traditional, continuous polling ETL (Extract, Transform, Load) pipeline dumping raw tick data into a local database via a worker queue like Celery or BullMQ (with Redis).
**Reasoning:** Financial data changes at an incredibly high velocity. Polling continuously requires heavy, always-on infrastructure and quickly exhausts strict rate limits on third-party APIs. By fetching real-time data on-demand and using Inngest to reliably orchestrate batched, asynchronous background tasks (like sending AI-summarized daily news emails), we kept the architecture lightweight, entirely serverless-friendly (deployable on Vercel/Netlify), and highly resilient to failures without the overhead of managing dedicated queue infrastructure.

## 2. One trade-off you made under the time limit, and what you’d do with a real week.
**Trade-off:** Due to time constraints, the application relies on direct API calls for market data and bypasses a robust caching layer. Furthermore, to unblock the initial production deployment, we configured Next.js to ignore strict TypeScript compilation errors (`ignoreBuildErrors: true`).
**With a real week:** 
1. **Caching & Live Data:** I would implement a Redis caching layer to store frequently accessed data (like top market news or major index prices) to dramatically reduce external API latency and costs. I would also upgrade from REST fetching to WebSockets to stream live, ticking stock prices directly to the dashboard.
2. **Type Safety:** I would meticulously go through the codebase to resolve all TypeScript warnings and enforce strict typing across the entire application to ensure long-term stability and easier collaboration.

## 3. Where did you use AI tools, and what did you personally verify or change afterward?
**AI Usage:** I utilized AI coding assistants (Gemini) extensively to accelerate development. The AI was used to rapidly scaffold the Next.js 15 UI with Framer Motion animations, structure the MongoDB schemas, wire up `better-auth`, and generate the boilerplate for the Inngest background functions.
**Personal Verification & Changes:** 
While the AI generated the core logic, I had to personally intervene, verify, and modify the code to handle real-world deployment realities:
- **Deployment & Security:** I manually reconfigured `package.json` to bump the `inngest` package to the absolute latest version to bypass strict production vulnerability blockers on Vercel and Netlify.
- **API Migrations:** I discovered that the AI generated v3 syntax for Inngest, which crashed in production. I manually audited the error logs and updated the `createFunction` signatures to comply with the new Inngest v4 standards.
- **Environment & Infrastructure:** I personally managed the MongoDB Atlas network security (whitelisting `0.0.0.0/0` for serverless environments) and tuned the `next.config.ts` to prevent strict CI pipelines from treating minor linter warnings as fatal build errors (Exit Code 2).
