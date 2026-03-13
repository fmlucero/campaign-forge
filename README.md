# GrowthOps Copilot

GrowthOps Copilot is an internal AI-powered SaaS tool designed to accelerate the ideation and deployment of digital marketing assets. By leveraging Large Language Models (LLMs) and modern web technologies, it transforms a single product brief or concept into a fully fleshed-out campaign pipeline, including landing page structures, copy variations, and email sequences.

## 🚀 Purpose and Value Proposition

In fast-paced creative and technical environments, moving from concept to launch requires rapid experimentation and iteration. This tool automates the heavy lifting of initial content generation and scaffolding, allowing cross-functional teams to focus on strategy, refinement, and A/B testing rather than starting from scratch.

## 💻 Tech Stack & Architecture

- **Frontend:** Next.js (React App Router), Tailwind CSS v4, Framer Motion (for fluid interactions)
- **Backend (API Routes):** Next.js API Routes for low-latency AI responses
- **AI Integration:** Google GenAI SDK (Gemini 2.5) with Structured Outputs for precise JSON responses
- **State Management:** Zustand
- **Tooling:** Typescript, ESLint

## ⚙️ Key Technical Features

- **Dynamic AI Theming:** The LLM acts as an Art Director, analyzing the brief to suggest a tailored color palette (Primary & Secondary HEX) and typography pairing. The UI consumes these tokens dynamically via CSS Variables and inline React styles.
- **Auto-Localization:** Prompt Engineering forces the AI to detect the input language of the brief, automatically localizing all generated copy and UI labels (e.g., "Why choose us?") to match the user's language without hardcoded dictionaries.
- **Strict Prompt Orchestration:** Uses complex, structured prompt engineering (schema-driven outputs) to guarantee strictly typed JSON outputs from Gemini 2.5 Flash, seamlessly populating the frontend UI components without parsing errors.
- **Rapid Prototyping Engine:** Provides a real-time, interactive preview of landing page layouts based on the AI-generated content.
- **Responsive & Usable:** Focuses on a frictionless developer/marketer experience with a clean, modern interface and glassmorphic micro-interactions, styled like a premium SaaS dashboard.

## 🛠️ Getting Started

Ensure you have your environment variables configured. Create a `.env.local` file at the root:

\`\`\`env
GEMINI_API_KEY=your_google_ai_studio_api_key_here
\`\`\`

Run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Navigate to [http://localhost:3000](http://localhost:3000) to view the application. Enter a brand name, product description, and goal, and click "Generate Campaign" to test the AI.

## 🔮 Roadmap & Iterations

- [ ] Implement multi-variant generation (A/B testing scaffolds) for landing page headers.
- [ ] Add integrations with third-party CMS platforms to export generated assets directly.
- [ ] Incorporate image generation APIs for structural placeholders.
