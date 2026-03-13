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

- **Prompt Orchestration:** Uses complex, structured prompt engineering (schema-driven outputs) to guarantee strictly typed JSON outputs from the LLM, seamlessly populating the frontend UI components without parsing errors.
- **Rapid Prototyping Engine:** Provides a real-time, interactive preview of landing page layouts based on the AI-generated content.
- **API Extensibility:** Built with a modular service layer, ensuring the application can easily integrate with external systems (e.g., CRMs, project management tools, or analytics solutions).
- **Responsive & Usable:** Focuses on a frictionless developer/marketer experience with a clean, modern interface and glassmorphic micro-interactions.

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
