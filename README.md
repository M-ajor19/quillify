# Continuum - Intelligent Infrastructure for Your Brand Voice 🚀

An adaptive content engine that learns your brand voice, writing style, and audience context over time. Unlike generic AI writers, Continuum builds living systems of knowledge and communication for your brand.

![Continuum Banner](https://img.shields.io/badge/Powered%20by-AI-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## ✨ The Philosophy

**Continuum** is more than a content tool—it's an intelligent infrastructure for your brand's voice. While other tools generate isolated words, Continuum builds with you, creating progressively better, faster, and more aligned content with every generation.

### Core Differentiator: Adaptive Memory

The central feature that separates Continuum from every generic AI wrapper. It learns your unique brand voice, writing style, key products, and audience context over time, ensuring consistency and personal identity in every piece of content.

## 🏗️ The Five Architectural Layers

1. **Continuum Core (The Memory Brain)**: Secure database and logic that learns your brand voice, stylistic patterns, past content, and performance metrics
2. **Continuum Studio (The Creative Workbench)**: User-facing application where you create, edit, and manage all your content
3. **Continuum Atlas (The Knowledge Weave)**: Integration layer connecting to your existing content platforms to learn your history
4. **Continuum Pulse (The Perception Engine)**: Analytics layer analyzing audience reactions to optimize future generations
5. **Continuum Sync (The Omnichannel Bridge)**: Distribution layer for publishing directly to all connected platforms

## 🚀 Features

- **🤖 AI-Powered Content Generation**: Latest OpenAI technology for superior content creation
- **📱 Multi-Format Support**: Twitter posts, LinkedIn content, quote graphics, testimonials, and review snippets
- **👁️ Smart OCR**: Extract text from images using advanced Vision capabilities
- **🎭 Dynamic Tone Control**: Professional, enthusiastic, witty, conversational, or authoritative
- **⚡ Multi-Stage AI Pipeline**: Sophisticated prompt engineering for consistent, high-quality results
- **🎨 Quote Graphics**: Generate beautiful, shareable quote graphics automatically
- **🔄 One-Click Generation**: Transform raw feedback into 3 variations of polished content
- **📊 Real-time Processing**: Fast, responsive AI-powered content transformation
- **🧠 Adaptive Memory**: Content engine that learns and evolves with your brand (Roadmap)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/M-ajor19/continuum-app.git
   cd continuum-app
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
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧠 How It Works

### The AI Multi-Stage Pipeline

1. **📝 Input Analysis**: Raw text is cleaned and analyzed using AI to extract key information
2. **🎯 Dynamic Prompt Assembly**: Context-aware prompts are built based on tone and format preferences
3. **🤖 AI Generation**: Creates multiple variations of polished, engaging content
4. **✅ Output Validation**: Content is validated and formatted for the target platform

### Supported Input Types

- **📄 Text**: Paste any customer feedback, review, or testimonial
- **🖼️ Images**: Upload screenshots of social media posts, reviews, or feedback (OCR powered by AI Vision)
- **📁 Files**: Upload text files containing customer feedback

### Output Formats

| Format | Description | Character Limit |
|--------|-------------|-----------------|
| **🐦 Twitter Post** | 280-character optimized posts | 280 chars |
| **💼 LinkedIn Post** | Professional, detailed content with hashtags | 700 chars |
| **🎨 Quote Graphic** | Visual, shareable quote images | Flexible |
| **⭐ Testimonial** | Full testimonial format | Flexible |
| **📊 Review Snippet** | Short, impactful review highlights | 150 chars |

## 🔧 API Endpoints

### `/api/generate`
Generates content using AI based on input text, tone, and format.

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
Extracts text from uploaded images using AI Vision.

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
- **AI Engine**: OpenAI for content generation
- **Vision AI**: AI Vision for OCR and image processing
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js with multiple providers
- **Payments**: Stripe integration
- **Styling**: Tailwind CSS with custom design system
- **Deployment**: Vercel-optimized configuration

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate/route.ts    # AI content generation API
│   │   ├── ocr/route.ts         # AI Vision OCR API
│   │   └── auth/                # Authentication endpoints
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main application page
├── components/
│   ├── AlchemyStation.tsx       # Main content generator
│   ├── Dashboard.tsx            # User dashboard
│   ├── Navbar.tsx               # Navigation bar
│   ├── OnboardingScreen.tsx     # User onboarding
│   └── SignInScreen.tsx         # Authentication screen
└── lib/
    ├── auth.ts                  # Authentication config
    ├── stripe.ts                # Payment processing
    └── supabase.ts              # Database client
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
   OPENAI_API_KEY=your_api_key
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   STRIPE_SECRET_KEY=your_stripe_key
   ```

4. **Deploy**
   - Vercel will automatically deploy on every push to main

## 🔐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | OpenAI API key | ✅ Yes | - |
| `NEXT_PUBLIC_APP_URL` | Application URL for CORS | ✅ Yes | `http://localhost:3000` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ Yes | - |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ Yes | - |
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ Yes | - |
| `NEXTAUTH_SECRET` | NextAuth secret | ✅ Yes | - |

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
- **OpenAI**: AI model for content generation
- **Supabase**: Backend as a Service
- **NextAuth.js**: Authentication solution
- **Stripe**: Payment processing
- **Vercel**: Optimized deployment platform

## 🗺️ Roadmap

### Phase 1 (MVP) - ✅ Complete
- Basic content transformation
- Multi-format support
- Tone selection
- Credit system

### Phase 2 (The Multiplier) - 🚧 In Progress
- Browser Extension
- Platform Integration (Twitter/X learning)
- Enhanced Brand Kit

### Phase 3 (The Ecosystem) - 📋 Planned
- Team Collaboration
- Performance Insights Dashboard
- Direct Publishing to social platforms
- Advanced Analytics

### Phase 4 (Intelligence) - 🔮 Future
- Full Adaptive Memory system
- Multi-platform content optimization
- Automated A/B testing
- Predictive content suggestions

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
- **Issues**: [GitHub Issues](https://github.com/M-ajor19/continuum-app/issues)
- **Email**: support@continuum.app

## 🙏 Acknowledgments

- **OpenAI** for AI API
- **Vercel** for hosting and deployment
- **Next.js** team for the amazing framework
- **Tailwind CSS** for the design system
- **Supabase** for the backend infrastructure

---

**Built with ❤️ using AI and Next.js**

*Last updated: October 2025*
