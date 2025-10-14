# Continuum - Adaptive Written-Content Engine 🚀

An intelligent infrastructure for your brand's voice. Continuum is an adaptive content engine designed to remember, learn, and build with you. It solves the biggest problem in the AI content era: inconsistency and lack of personal identity.

![Continuum Banner](https://img.shields.io/badge/Powered%20by-GPT--5-blue?style=for-the-badge&logo=openai)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## ✨ Core Differentiator: Adaptive Memory

Unlike standard AI writers that are "stateless" (forgetting you after each request), Continuum is built on a foundation of **Adaptive Memory**. It learns your unique brand voice, writing style, key products, and audience context over time. This ensures every piece of content it generates is progressively better, faster, and more aligned with your specific identity.

## 🏗️ The Five Architectural Layers

### 1. **Continuum Core** (The Memory Brain)
The nucleus of the operation. It's the secure database and logic that learns and stores your brand voice, stylistic patterns, past content, and performance metrics.

### 2. **Continuum Studio** (The Creative Workbench)
The user-facing application (app.continuum.app). This is the "Alchemy Station" UI where you and your team create, edit, and manage all your content.

### 3. **Continuum Atlas** (The Knowledge Weave)
The integration layer. It connects to your existing content on platforms like X, LinkedIn, and your blog to learn your history and understand what topics and styles have performed well in the past.

### 4. **Continuum Pulse** (The Perception Engine)
The analytics layer. It analyzes audience reactions to your published content (sentiment, engagement) and feeds those insights back into the Core to optimize future generations.

### 5. **Continuum Sync** (The Omnichannel Bridge)
The distribution layer. It allows you to publish content directly from the Studio to all your connected platforms, intelligently adapting the tone and format for each one.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- OpenAI API key with GPT-5 access
- Supabase account for authentication and data storage

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
   OPENAI_API_KEY=your_gpt5_openai_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧠 How It Works

### The Adaptive Content Pipeline

1. **📝 Brand Kit Setup**: Define your basic tone, products, and audience
2. **🧬 Contextual Memory**: The AI remembers your last 5-10 generations to ensure continuity
3. **🎯 Specialized Recipes**: Transform messy input (text, screenshots) into polished outputs
4. **📊 Performance Learning**: Analyze what works and continuously improve

### Supported Input Types

- **📄 Text**: Paste any customer feedback, review, or testimonial
- **🖼️ Images**: Upload screenshots of social media posts, reviews, or feedback
- **📁 Files**: Upload text files containing customer feedback

### Output Formats

| Format | Description | Adaptive Features |
|--------|-------------|-------------------|
| **🐦 X (Twitter) Post** | Concise, engaging posts | Learns your tweet style |
| **💼 LinkedIn Post** | Professional, detailed content | Adapts to your industry voice |
| **🎨 Quote Graphic** | Visual, shareable quote images | Matches your brand aesthetics |
| **⭐ Testimonial** | Full testimonial format | Maintains consistent tone |
| **📊 Review Snippet** | Short, impactful review highlights | Optimizes for conversion |

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate/route.ts    # Content generation with memory
│   │   ├── ocr/route.ts         # Vision-based text extraction
│   │   └── analytics/          # Performance tracking
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main application page
├── components/
│   ├── AlchemyStation.tsx       # Main content generation UI
│   ├── Dashboard.tsx            # User dashboard
│   ├── Navbar.tsx               # Navigation component
│   ├── OnboardingScreen.tsx     # Brand kit setup
│   └── ContinuumLogo.tsx        # Brand identity
└── lib/
    ├── auth.ts                  # Authentication logic
    ├── supabase.ts              # Database connections
    └── utils.ts                 # Utility functions
```

## 🚗 Roadmap

### Phase 1 (MVP) ✅
- [x] Brand Kit setup page
- [x] Contextual Memory (last 5-10 generations)
- [x] Specialized content transformation recipes
- [x] Core authentication and user management

### Phase 2 (The Multiplier) 🚧
- [ ] Browser Extension for quick access
- [ ] Platform Integration (X account connection)
- [ ] Advanced voice learning from historical content

### Phase 3 & 4 (The Ecosystem) 📅
- [ ] Team Collaboration features
- [ ] Performance Insights dashboard
- [ ] Direct Publishing to social platforms
- [ ] Multi-brand management

## 🔐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | OpenAI API key with GPT-5 access | ✅ Yes | - |
| `NEXT_PUBLIC_APP_URL` | Application URL | ✅ Yes | `http://localhost:3000` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ Yes | - |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ Yes | - |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | ✅ Yes | - |
| `STRIPE_SECRET_KEY` | Stripe API key for payments | ✅ Yes | - |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | ✅ Yes | - |

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
- **Supabase**: Authentication and database
- **OpenAI GPT-5**: Adaptive AI content generation
- **Stripe**: Payment processing
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
- Maintain the adaptive memory architecture

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: [GitHub Issues](https://github.com/M-ajor19/continuum-app/issues)
- **Email**: support@continuum.app

## 🙏 Acknowledgments

- **OpenAI** for GPT-5 API
- **Vercel** for hosting and deployment
- **Next.js** team for the amazing framework
- **Supabase** for authentication and database
- **Stripe** for payment infrastructure

---

**Built with ❤️ as an intelligent infrastructure for your brand's voice**

*Last updated: October 2025*