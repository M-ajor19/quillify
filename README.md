# Continuum - Intelligent Brand Voice Infrastructure 🚀

Continuum is an adaptive written-content engine designed to remember, learn, and build with you. It solves the biggest problem in the AI content era: inconsistency and lack of personal identity. While other tools generate isolated words, Continuum builds living systems of knowledge and communication for your brand.

![Continuum](https://img.shields.io/badge/Continuum-Adaptive%20Memory-blueviolet?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## The High-Level Philosophy

Quillify was a brilliant tool for transforming content. Continuum is an intelligent infrastructure for your brand's voice.

## Core Differentiator: Adaptive Memory

Continuum learns your unique brand voice, writing style, key products, and audience context over time. This ensures every piece of content it generates is progressively better, faster, and more aligned with your identity.

## The Five Architectural Layers

- **Continuum Core (The Memory Brain)**: Secure database and logic that learns and stores brand voice, stylistic patterns, past content, and performance metrics.
- **Continuum Studio (The Creative Workbench)**: The user-facing app (`app.continuum.app`) — the "Alchemy Station" UI where teams create, edit, and manage content.
- **Continuum Atlas (The Knowledge Weave)**: Integrations to connect past content on X, LinkedIn, blogs to learn history and performance.
- **Continuum Pulse (The Perception Engine)**: Analytics that analyze audience reactions (sentiment, engagement) and feed back into the Core.
- **Continuum Sync (The Omnichannel Bridge)**: Distribution to publish directly to connected platforms, adapting tone and format per channel.

## Roadmap: Key User-Facing Features

### Phase 1 (MVP)
- **Brand Kit (Core v1)**: Define tone, products, audience.
- **Contextual Memory**: Remembers last 5–10 generations within a session.
- **Specialized Recipes**: Transform messy input (text, screenshots) into polished outputs like testimonials and social posts.

### Phase 2 (The Multiplier)
- **Browser Extension**: Access Studio from any webpage.
- **Platform Integration (Atlas v1)**: Connect X to learn voice from past tweets.

### Phase 3 & 4 (The Ecosystem)
- **Team Collaboration**: Shared Brand Kits and workflows.
- **Performance Insights (Pulse v1)**: Dashboard showing which content performs best.
- **Direct Publishing (Sync v1)**: Publish to connected social accounts.

## Quick Start

### Prerequisites
- Node.js 18+
- OpenAI API key

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/M-ajor19/continuum-app.git
   cd continuum-app
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Set up environment variables
   ```bash
   cp env.example .env.local
   ```
4. Run the development server
   ```bash
   npm run dev
   ```
5. Open your browser at [http://localhost:3000](http://localhost:3000)

## Architecture

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **AI Engine**: OpenAI
- **Deployment**: Vercel-ready

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate/route.ts
│   │   └── ocr/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
└── lib/
```

## Environment Variables

See `env.example`.

## Contributing

PRs welcome. Please open an issue first to discuss changes.

---

Built with ❤️ using Next.js and TypeScript.
