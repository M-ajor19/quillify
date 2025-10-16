import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { rateLimit } from '@/lib/rate-limit';
import OpenAI from 'openai';

const getOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

// Stage 1: Input Analysis & Pre-processing
async function analyzeInput(inputText: string) {
  const analysisPrompt = `
Analyze the following customer feedback and extract key information:

Input: "${inputText}"

Please provide a JSON response with:
{
  "sentiment": "positive" | "negative" | "neutral",
  "coreMessage": "The main compliment or feedback",
  "quantifiableResults": ["Any specific metrics or numbers mentioned"],
  "emotionalBenefits": ["Key emotional benefits mentioned"],
  "cleanedText": "Text with timestamps, usernames, and UI elements removed"
}

Focus on identifying the most valuable and shareable aspects of the feedback.
`;

  try {
    const openai = getOpenAI();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: analysisPrompt }],
      temperature: 0.1,
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error in input analysis:', error);
    return {
      sentiment: "positive",
      coreMessage: inputText,
      quantifiableResults: [],
      emotionalBenefits: [],
      cleanedText: inputText
    };
  }
}

// Stage 2: Dynamic Prompt Assembly
function buildMasterPrompt(analysis: {
  sentiment: string;
  coreMessage: string;
  quantifiableResults: string[];
  emotionalBenefits: string[];
  cleanedText: string;
}, tone: string, format: string) {
  const toneInstructions = {
    professional: "Use a professional, corporate tone. Be trustworthy and authoritative.",
    enthusiastic: "Use an energetic, excited tone. Show passion and excitement.",
    witty: "Use a clever, humorous tone. Be engaging and memorable.",
    conversational: "Use a friendly, conversational tone. Be approachable and natural.",
    authoritative: "Use a confident, expert tone. Be commanding and decisive."
  };

  const formatInstructions = {
    tweet: "Create a Twitter post under 280 characters. Make it engaging and shareable.",
    linkedin: "Create a LinkedIn post that's professional and detailed. Include relevant hashtags.",
    "quote-graphic": "Create text suitable for a quote graphic. Make it visually impactful and quotable.",
    testimonial: "Create a full testimonial format. Include the customer's voice and specific benefits.",
    review: "Create a review snippet that highlights the most important points."
  };

  return `
You are an expert B2B marketing copywriter specializing in social proof and customer testimonials.

CONTEXT:
- Original feedback: "${analysis.cleanedText}"
- Sentiment: ${analysis.sentiment}
- Core message: "${analysis.coreMessage}"
- Quantifiable results: ${JSON.stringify(analysis.quantifiableResults)}
- Emotional benefits: ${JSON.stringify(analysis.emotionalBenefits)}

REQUIREMENTS:
- Tone: ${toneInstructions[tone as keyof typeof toneInstructions]}
- Format: ${formatInstructions[format as keyof typeof formatInstructions]}

RULES:
1. Do not invent any details not present in the original feedback
2. If quantifiable results are present, highlight them prominently
3. Focus on emotional benefits and specific outcomes
4. Make the content authentic and believable
5. Ensure it sounds like genuine customer feedback
6. For social media formats, make it highly shareable

Generate 3 variations of the content. Each should be different in approach but equally compelling.
Return only the content variations, one per line, without any additional formatting or numbering.
`;
}

// Stage 3: Primary AI Generation
async function generateContent(masterPrompt: string) {
  try {
    const openai = getOpenAI();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: masterPrompt }],
      temperature: 0.7,
      max_completion_tokens: 1000,
    });

    const content = response.choices[0].message.content || '';
    return content.split('\n').filter(line => line.trim().length > 0);
  } catch (error) {
    console.error('Error in content generation:', error);
    return ['Error generating content. Please try again.'];
  }
}

// Stage 4: Output Validation & Post-processing
function validateAndFormatContent(content: string[], format: string) {
  return content.map(item => {
    // Basic validation
    if (format === 'tweet' && item.length > 280) {
      return item.substring(0, 277) + '...';
    }
    return item.trim();
  }).filter(item => item.length > 0);
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // SECURITY: Rate limiting - 10 requests per minute per user
    const rateLimitResult = rateLimit(`generate:${session.user.id}`, {
      interval: 60000, // 1 minute
      maxRequests: 10
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
          }
        }
      );
    }

    const { inputText, tone, format } = await request.json();

    // Validation
    if (!inputText?.trim()) {
      return NextResponse.json({ error: 'Input text is required' }, { status: 400 });
    }

    // SECURITY: Input length validation (prevent abuse)
    if (inputText.length > 10000) {
      return NextResponse.json({ error: 'Input text too long. Maximum 10,000 characters.' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    const validTones = ['professional', 'enthusiastic', 'witty', 'conversational', 'authoritative'];
    const validFormats = ['tweet', 'linkedin', 'quote-graphic', 'testimonial', 'review'];

    if (!validTones.includes(tone)) {
      return NextResponse.json({ error: 'Invalid tone selected' }, { status: 400 });
    }

    if (!validFormats.includes(format)) {
      return NextResponse.json({ error: 'Invalid format selected' }, { status: 400 });
    }

    // SECURITY: Atomically deduct credit with row-level locking
    const { data: creditResult, error: creditError } = await supabaseAdmin
      .rpc('deduct_credit_if_available', {
        p_user_id: session.user.id,
        p_credits_needed: 1
      })
      .single();

    if (creditError || !creditResult?.success) {
      return NextResponse.json({ 
        error: creditResult?.message || 'Insufficient credits' 
      }, { status: 402 });
    }

    // Stage 1: Analyze input
    const analysis = await analyzeInput(inputText);

    // Stage 2: Build master prompt
    const masterPrompt = buildMasterPrompt(analysis, tone, format);

    // Stage 3: Generate content
    const rawContent = await generateContent(masterPrompt);

    // Stage 4: Validate and format
    const finalContent = validateAndFormatContent(rawContent, format);

    if (finalContent.length === 0) {
      // Refund credit if generation failed
      await supabaseAdmin
        .from('users')
        .update({ credits: creditResult.remaining_credits + 1 })
        .eq('id', session.user.id);
      
      return NextResponse.json({ error: 'No content generated' }, { status: 500 });
    }

    // Record credit transaction
    await supabaseAdmin
      .from('credit_transactions')
      .insert({
        user_id: session.user.id,
        amount: -1,
        type: 'usage',
      });

    // Record content generation
    await supabaseAdmin
      .from('content_generations')
      .insert({
        user_id: session.user.id,
        input_text: inputText,
        output_text: finalContent[0],
        format: format,
        tone: tone,
        credits_used: 1,
      });

    return NextResponse.json({ 
      content: finalContent,
      creditsRemaining: creditResult.remaining_credits 
    });
  } catch (error) {
    console.error('Error in generate API:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
      }
      if (error.message.includes('quota')) {
        return NextResponse.json({ error: 'API quota exceeded' }, { status: 429 });
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    );
  }
}
