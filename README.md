# Campaign Forge

Campaign Forge is an internal AI-powered SaaS tool designed to accelerate the ideation and deployment of digital marketing assets. By leveraging Large Language Models (LLMs) and modern web technologies, it transforms a single product brief or concept into a fully fleshed-out campaign pipeline, including landing page structures, copy variations, and email sequences.

## 🚀 Purpose and Value Proposition

In fast-paced creative and technical environments, moving from concept to launch requires rapid experimentation and iteration. This tool automates the heavy lifting of initial content generation and scaffolding, allowing cross-functional teams to focus on strategy, refinement, and A/B testing rather than starting from scratch.

## 💻 Tech Stack & Architecture

- **Frontend:** Next.js (React App Router), Tailwind CSS v4, Framer Motion (for fluid interactions)
- **Backend (API Routes):** Next.js API Routes for low-latency AI responses
- **AI Integration:** Google GenAI SDK (Gemini 2.5) with Structured Outputs for precise JSON responses
- **State Management:** Zustand
- **Tooling:** Typescript, ESLint

## ⚙️ Key Technical Features

- **Extreme AI Theming (V3):** The model acts as an Art Director, analyzing the input text to forge a complete aesthetic profile. It dynamically returns a full HEX color palette (adjusting for Dark/Light mode), dynamic `borderRadius` modifiers, and selects the ideal Google Font pairing for the specific industry. 
- **Auto-Localization:** Utilizing advanced Prompt Engineering, the AI detects the language of the provided brief and flawlessly localizes all generated landing page copy and UI elements specifically for that region, eliminating the need for hardcoded dictionaries.
- **Strict Schema Orchestration:** Employs the `@google/genai` SDK with strict `responseSchema` structures to guarantee strictly typed JSON outputs from the blistering fast **Gemini 3.1 Flash-Lite** model.
- **Dynamic JIT Tailwind Compilation:** UI consumes AI-generated tokens via standard React inline styles and a strict font mapping dictionary to safely inject `next/font` variables (`Inter`, `Outfit`, `Playfair`, `Space Grotesk`, `Jakarta`) directly into the Tailwind V4 compilation layer.
- **Glassmorphic Editor:** The main control panel features a modern, premium "Dark SaaS" aesthetic with subtle borders and shadows to reduce cognitive load while managing complex prompts.

## 🆕 Recent Updates & Improvements

In this latest iteration, we've focused on UI/UX excellence and model reliability:

- **💎 Professional Welcome Page:** A high-impact landing page designed to "wow" recruiters, featuring Framer Motion animations, glassmorphism, and a clear visualization of the technical architecture.
- **🖥️ Full-Screen Preview Mode:** The preview area now automatically expands to full-screen upon generation, hiding the sidebar and top navigation for a more immersive and professional "live" result.
- **✨ Animated Loading Transitions:** Implementation of a dynamic "scale-up" effect during the "Crafting" state, making the transition from brief to page feel fluid and intentional.
- **🌍 Enhanced Language Detection:** Refined the AI orchestration layer with a strict Language Protocol and dedicated schema-based validation. This guarantees that generated content matches the input language (English/Spanish) with 100% consistency.
- **🧼 UI Polishing:** Deactivated development indicators and refined typography scales across the application to maintain a premium, production-ready feel.

## 🛠️ Getting Started

Ensure you have your environment variables configured. Create a `.env.local` file at the root:

\`\`\`env
GEMINI_API_KEY=your_google_ai_studio_api_key_here
\`\`\`

Run the development server:

\`\`\`bash
npm run dev
\`\`\`

Navigate to [http://localhost:3000](http://localhost:3000) to experience the professional welcome page. From there, click **"Launch The Forge"** to enter the campaign generation tool (located at `/forge`).

## 🔮 Roadmap & Iterations

- [ ] Implement multi-variant generation (A/B testing scaffolds) for landing page headers.
- [ ] Add integrations with third-party CMS platforms to export generated assets directly.
- [ ] Incorporate image generation APIs for structural placeholders.
