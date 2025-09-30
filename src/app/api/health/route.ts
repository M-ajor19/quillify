import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'Quillify API is healthy',
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  });
}
