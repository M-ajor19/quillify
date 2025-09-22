'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { ContentGenerator } from '@/components/ContentGenerator';
import { GeneratedContent } from '@/components/GeneratedContent';
import { ToneSelector } from '@/components/ToneSelector';
import { FormatSelector } from '@/components/FormatSelector';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function AppPage() {
  const [inputText, setInputText] = useState('');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [selectedFormat, setSelectedFormat] = useState('tweet');
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputText,
          tone: selectedTone,
          format: selectedFormat
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }
      
      setGeneratedContent(data.content || []);
    } catch (error) {
      console.error('Error generating content:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-indigo-600 mr-2" />
              <h1 className="text-4xl font-bold text-gray-900">Quillify</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform raw customer feedback into polished social proof content in seconds
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Input Your Content
              </h2>
              
              <ContentGenerator
                inputText={inputText}
                setInputText={setInputText}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <ToneSelector
                  selectedTone={selectedTone}
                  setSelectedTone={setSelectedTone}
                />
                <FormatSelector
                  selectedFormat={selectedFormat}
                  setSelectedFormat={setSelectedFormat}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                <div className="flex items-center">
                  <div className="text-red-600 font-medium">Error:</div>
                  <div className="ml-2 text-red-700">{error}</div>
                </div>
              </div>
            )}

            {generatedContent.length > 0 && (
              <GeneratedContent
                content={generatedContent}
                format={selectedFormat}
              />
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
