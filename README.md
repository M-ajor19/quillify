# Quillify - AI-Powered Social Proof Content Generator

Transform raw customer feedback into polished social proof content in seconds. Quillify is a specialist AI tool that automates the entire workflow from raw input to ready-to-use marketing content.

## Features

- **Multi-Format Support**: Generate Twitter posts, LinkedIn content, quote graphics, testimonials, and review snippets
- **Smart OCR**: Extract text from images using AI vision capabilities
- **Dynamic Tone Control**: Professional, enthusiastic, witty, conversational, or authoritative
- **Multi-Stage AI Pipeline**: Sophisticated prompt engineering for consistent, high-quality results
- **Quote Graphics**: Generate beautiful, shareable quote graphics automatically
- **One-Click Generation**: Transform raw feedback into 3 variations of polished content

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   GOOGLE_CLOUD_VISION_API_KEY=your_google_cloud_vision_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Open Your Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How It Works

### The Multi-Stage AI Pipeline

1. **Input Analysis**: Raw text is cleaned and analyzed to extract key information
2. **Dynamic Prompt Assembly**: Context-aware prompts are built based on tone and format
3. **AI Generation**: GPT-4 creates multiple variations of polished content
4. **Output Validation**: Content is validated and formatted for the target platform

### Supported Input Types

- **Text**: Paste any customer feedback, review, or testimonial
- **Images**: Upload screenshots of social media posts, reviews, or feedback
- **Files**: Upload text files containing customer feedback

### Output Formats

- **Twitter Post**: 280-character optimized posts
- **LinkedIn Post**: Professional, detailed content with hashtags
- **Quote Graphic**: Visual, shareable quote images
- **Testimonial**: Full testimonial format
- **Review Snippet**: Short, impactful review highlights

## API Endpoints

### `/api/generate`
Generates content based on input text, tone, and format.

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
  "content": ["Generated content variation 1", "Generated content variation 2", "Generated content variation 3"]
}
```

### `/api/ocr`
Extracts text from uploaded images.

**Request:** FormData with image file

**Response:**
```json
{
  "text": "Extracted text from image"
}
```

## Architecture

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Next.js API routes
- **AI**: OpenAI GPT-4 and GPT-4 Vision
- **OCR**: OpenAI Vision API for image text extraction
- **Graphics**: HTML2Canvas for quote graphic generation

## Development

### Project Structure
```
src/
├── app/
│   ├── api/
│   │   ├── generate/route.ts    # Main content generation API
│   │   └── ocr/route.ts         # OCR API for image processing
│   └── page.tsx                 # Main application page
├── components/
│   ├── ContentGenerator.tsx     # Input handling component
│   ├── GeneratedContent.tsx     # Output display component
│   ├── QuoteGraphic.tsx         # Quote graphic generator
│   ├── ToneSelector.tsx         # Tone selection component
│   └── FormatSelector.tsx       # Format selection component
```

### Key Components

- **ContentGenerator**: Handles text input, file uploads, and drag-and-drop
- **ToneSelector**: Provides tone options with descriptions
- **FormatSelector**: Offers format options with character limits
- **GeneratedContent**: Displays results with copy/download functionality
- **QuoteGraphic**: Generates visual quote graphics

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for content generation | Yes |
| `GOOGLE_CLOUD_VISION_API_KEY` | Google Cloud Vision API key (optional) | No |
| `NEXT_PUBLIC_APP_URL` | Application URL for CORS | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@quillify.ai or create an issue in the GitHub repository.