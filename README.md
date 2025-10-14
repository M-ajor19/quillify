# Continuum - Adaptive Brand Voice Infrastructure 🚀

Continuum is an intelligent infrastructure for your brand's voice. It's an adaptive written-content engine designed to remember, learn, and build with you—solving the biggest problem in the AI content era: inconsistency and lack of personal identity.

![Continuum Banner](https://img.shields.io/badge/Powered%20by-GPT--5-blue?style=for-the-badge&logo=openai)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## ✨ Why Continuum

- **Adaptive Memory**: Learns your brand voice, style, products, and audience over time
- **Continuity by Design**: Remembers recent context for session-aware generations
- **Studio Workflows**: Opinionated “recipes” for high-quality outputs from messy inputs
- **Omnichannel Ready**: Creates platform-specific variations with consistent voice

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- OpenAI API key with GPT-5 access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/continuum.git
   cd continuum
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   ```env
   OPENAI_API_KEY=your_gpt5_openai_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧠 Continuum: Functional & Feature Summary

### 1) High-Level Philosophy
Continuum is an intelligent infrastructure for your brand's voice. While other tools generate isolated words, Continuum builds living systems of knowledge and communication for your brand.

### 2) Core Differentiator: Adaptive Memory
Continuum learns your brand voice, writing style, key products, and audience context over time, so outputs get progressively more aligned.

### 3) The Five Architectural Layers
- **Continuum Core (The Memory Brain)**: Secure database and logic for brand voice, stylistic patterns, past content, and performance signals.
- **Continuum Studio (The Creative Workbench)**: The user-facing application (`app.continuum.app`) where teams create, edit, and manage content.
- **Continuum Atlas (The Knowledge Weave)**: Integrations that pull learning signals from X, LinkedIn, and blogs.
- **Continuum Pulse (The Perception Engine)**: Analytics on audience reactions feeding improvements back to Core.
- **Continuum Sync (The Omnichannel Bridge)**: One-click publishing with channel-appropriate adaptation.

### 4) Key User-Facing Features (Roadmap)
- **Phase 1 (MVP)**:
  - Brand Kit (Core v1): tone, products, audience
  - Contextual Memory: remembers last 5–10 generations per session
  - Specialized Recipes: transform messy inputs into polished outputs
- **Phase 2 (Multiplier)**:
  - Browser Extension (Studio Everywhere)
  - Platform Integration (Atlas v1): connect X to learn brand voice
- **Phase 3 & 4 (Ecosystem)**:
  - Team Collaboration: shared Brand Kits and workflows
  - Performance Insights (Pulse v1)
  - Direct Publishing (Sync v1)

### Supported Input Types

- **📄 Text**: Paste any customer feedback, review, or testimonial
- **🖼️ Images**: Upload screenshots of social media posts, reviews, or feedback (OCR powered by GPT-5 Vision)
- **📁 Files**: Upload text files containing customer feedback

### Output Formats

| Format | Description | Character Limit |
|--------|-------------|-----------------|
| **🐦 X Post** | 280-character optimized posts | 280 chars |
| **💼 LinkedIn Post** | Professional, detailed content with hashtags | 700 chars |
| **🎨 Quote Graphic** | Visual, shareable quote images | Flexible |
| **⭐ Testimonial** | Full testimonial format | Flexible |
| **📊 Review Snippet** | Short, impactful review highlights | 150 chars |

## 🔧 API Endpoints

### `/api/generate`
Generates content using GPT-5 based on input text, tone, and format.

**Request:**
```json
{
  "inputText": "Customer feedback text",
  "tone": "professional",
  "format": "tweet"
}
```

**Response:**
```json
{
  "content": [
    "Generated content variation 1",
    "Generated content variation 2", 
    "Generated content variation 3"
  ]
}
```

### `/api/ocr`
Extracts text from uploaded images using GPT-5 Vision.

**Request:** FormData with image file

**Response:**
```json
{
  "text": "Extracted text from image"
}
```

## 🏗️ Architecture

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Next.js API routes with serverless functions
- **AI Engine**: OpenAI GPT-5 for content generation
- **Vision AI**: GPT-5 Vision for OCR and image processing
- **Styling**: Tailwind CSS with custom design system
- **Deployment**: Vercel-optimized configuration

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate/route.ts    # GPT-5 content generation API
│   │   └── ocr/route.ts         # GPT-5 Vision OCR API
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main application page
├── components/
│   ├── ContentGenerator.tsx     # Input handling component
│   ├── GeneratedContent.tsx     # Output display component
│   ├── ToneSelector.tsx         # Tone selection component
│   ├── FormatSelector.tsx       # Format selection component
│   ├── QuoteGraphic.tsx         # Quote graphic generator
│   └── ErrorBoundary.tsx        # Error handling component
└── lib/
    └── utils.ts                 # Utility functions
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Configure environment variables

3. **Add Environment Variables**
   ```
   OPENAI_API_KEY=your_gpt5_api_key
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

4. **Deploy**
   - Vercel will automatically deploy on every push to main

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- **Netlify**: Zero-config deployment
- **AWS Amplify**: Full-stack deployment
- **Railway**: Simple container deployment
- **Render**: Static site deployment

## 🔐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | OpenAI API key with GPT-5 access | ✅ Yes | - |
| `NEXT_PUBLIC_APP_URL` | Application URL for CORS | ✅ Yes | `http://localhost:3000` |
| `GOOGLE_CLOUD_VISION_API_KEY` | Google Cloud Vision API (optional) | ❌ No | - |

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Key Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **OpenAI GPT-5**: Latest AI model for content generation
- **Vercel**: Optimized deployment platform

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests if applicable**
5. **Submit a pull request**

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: [GitHub Issues](https://github.com/your-org/continuum/issues)
- **Email**: support@continuum.app

## 🙏 Acknowledgments

- **OpenAI** for GPT-5 API
- **Vercel** for hosting and deployment
- **Next.js** team for the amazing framework
- **Tailwind CSS** for the design system

---

**Built with ❤️ using GPT-5 and Next.js**

*Last updated: September 2025*# Trigger Vercel deployment - Fri Sep 26 13:10:44 CDT 2025
