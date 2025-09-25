import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const getOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

// Use OpenAI's vision capabilities for OCR
async function extractTextFromImage(imageBuffer: Buffer): Promise<string> {
  try {
    // Convert buffer to base64
    const base64Image = imageBuffer.toString('base64');
    const openai = getOpenAI();
    
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all text from this image. Clean up any UI elements, timestamps, or irrelevant text. Focus on the main content, especially any customer feedback, reviews, or testimonials. Return only the cleaned text."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_completion_tokens: 1000,
    });

    return response.choices[0].message.content || "Could not extract text from image.";
  } catch (error) {
    console.error('Error in OCR extraction:', error);
    return "Error extracting text from image. Please try again.";
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Convert image to buffer
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    
    // Extract text using OCR
    const extractedText = await extractTextFromImage(imageBuffer);
    
    return NextResponse.json({ text: extractedText });
  } catch (error) {
    console.error('Error in OCR API:', error);
    return NextResponse.json(
      { error: 'Failed to extract text from image' },
      { status: 500 }
    );
  }
}
