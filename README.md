# Quillify - AI-Powered Social Proof Content Generator 🚀

Transform raw customer feedback into polished social proof content in seconds. Quillify leverages the latest **GPT-5** AI technology to automate the entire workflow from raw input to ready-to-use marketing content.

![Quillify Banner](https://img.shields.io/badge/Powered%20by-GPT--5-blue?style=for-the-badge&logo=openai)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## ✨ Features

- **🤖 GPT-5 Powered**: Latest OpenAI technology for superior content generation
- **📱 Multi-Format Support**: Twitter posts, LinkedIn content, quote graphics, testimonials, and review snippets
- **👁️ Smart OCR**: Extract text from images using GPT-5 Vision capabilities
- **🎭 Dynamic Tone Control**: Professional, enthusiastic, witty, conversational, or authoritative
- **⚡ Multi-Stage AI Pipeline**: Sophisticated prompt engineering for consistent, high-quality results
- **🎨 Quote Graphics**: Generate beautiful, shareable quote graphics automatically
- **🔄 One-Click Generation**: Transform raw feedback into 3 variations of polished content
- **📊 Real-time Processing**: Fast, responsive AI-powered content transformation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- OpenAI API key with GPT-5 access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/M-ajor19/quillify-app.git
   cd quillify-app
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

## 🧠 How It Works

### The GPT-5 Multi-Stage Pipeline

1. **📝 Input Analysis**: Raw text is cleaned and analyzed using GPT-5 to extract key information
2. **🎯 Dynamic Prompt Assembly**: Context-aware prompts are built based on tone and format preferences
3. **🤖 AI Generation**: GPT-5 creates multiple variations of polished, engaging content
4. **✅ Output Validation**: Content is validated and formatted for the target platform

### Supported Input Types

- **📄 Text**: Paste any customer feedback, review, or testimonial
- **🖼️ Images**: Upload screenshots of social media posts, reviews, or feedback (OCR powered by GPT-5 Vision)
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
- **Issues**: [GitHub Issues](https://github.com/M-ajor19/quillify-app/issues)
- **Email**: support@quillify.tech

## 🙏 Acknowledgments

- **OpenAI** for GPT-5 API
- **Vercel** for hosting and deployment
- **Next.js** team for the amazing framework
- **Tailwind CSS** for the design system

---

**Built with ❤️ using GPT-5 and Next.js**

*Last updated: September 2025*