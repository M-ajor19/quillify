import React, { useState } from 'react';
import { Upload, Sparkles, Copy, Download, FileText } from 'lucide-react';

interface AlchemyStationProps {
  credits?: number;
  onGenerate?: () => void;
  onCreditsUsed?: () => void;
  isOnboarding?: boolean;
}

export function AlchemyStation({ credits = 3, onGenerate, onCreditsUsed, isOnboarding = false }: AlchemyStationProps) {
  const [inputText, setInputText] = useState('');
  const [outputType, setOutputType] = useState('social-post');
  const [tone, setTone] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [showResult, setShowResult] = useState(false);

  const outputTypes = [
    { value: 'social-post', label: 'Social Post' },
    { value: 'testimonial', label: 'Testimonial' },
    { value: 'blog-outline', label: 'Blog Outline' },
    { value: 'email-copy', label: 'Email Copy' },
    { value: 'product-description', label: 'Product Description' },
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'witty', label: 'Witty' },
    { value: 'enthusiastic', label: 'Enthusiastic' },
    { value: 'casual', label: 'Casual' },
    { value: 'authoritative', label: 'Authoritative' },
  ];

  const handleContinuum = async () => {
    if (!inputText.trim() || credits <= 0) return;

    setIsGenerating(true);
    
    try {
      // Map output types to API format
      const formatMap: { [key: string]: string } = {
        'social-post': 'tweet',
        'testimonial': 'testimonial',
        'blog-outline': 'quote-graphic',
        'email-copy': 'linkedin',
        'product-description': 'review'
      };

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputText,
          tone,
          format: formatMap[outputType] || 'tweet'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      
      if (data.content && data.content.length > 0) {
        setGeneratedContent(data.content[0]); // Use first generated content
        setShowResult(true);
      } else {
        throw new Error('No content generated');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      setGeneratedContent('Sorry, there was an error generating content. Please try again.');
      setShowResult(true);
    } finally {
      setIsGenerating(false);
      
      if (onCreditsUsed) onCreditsUsed();
      if (onGenerate && isOnboarding) onGenerate();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `continuum-${outputType}-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]">
        
        {/* Left Panel - The Cauldron */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#F5F5F7] mb-2">The Cauldron</h2>
            <p className="text-sm text-[#A1A1AA]">Add your raw ingredients</p>
          </div>

          {/* Input Area */}
          <div className="mb-6">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your messy text, drop a screenshot, or enter a URL..."
              className="w-full h-48 bg-[#101014] border-2 border-[#27272A] focus:border-[#A855F7] rounded-lg p-4 text-[#F5F5F7] placeholder-[#A1A1AA] resize-none transition-colors"
              disabled={isGenerating}
            />
          </div>

          {/* Upload Button */}
          <div className="mb-6">
            <button className="w-full border-2 border-dashed border-[#27272A] hover:border-[#A855F7]/50 rounded-lg p-4 text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors flex items-center justify-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload Image</span>
            </button>
          </div>

          {/* Recipe Controls */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#F5F5F7] mb-2">
                Desired Output
              </label>
              <select
                value={outputType}
                onChange={(e) => setOutputType(e.target.value)}
                className="w-full bg-[#101014] border border-[#27272A] rounded-lg p-3 text-[#F5F5F7] focus:border-[#A855F7] focus:outline-none"
                disabled={isGenerating}
              >
                {outputTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F5F5F7] mb-2">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-[#101014] border border-[#27272A] rounded-lg p-3 text-[#F5F5F7] focus:border-[#A855F7] focus:outline-none"
                disabled={isGenerating}
              >
                {tones.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Continuum Button */}
          <button
            onClick={handleContinuum}
            disabled={!inputText.trim() || credits <= 0 || isGenerating}
            className="w-full bg-[#A855F7] hover:bg-[#9333EA] disabled:bg-[#27272A] disabled:text-[#A1A1AA] text-white py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate</span>
              </>
            )}
          </button>

          {credits <= 0 && (
            <p className="text-red-400 text-sm text-center mt-2">
              No credits remaining. Buy more to continue.
            </p>
          )}
        </div>

        {/* Right Panel - The Elixir */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#F5F5F7] mb-2">The Elixir</h2>
            <p className="text-sm text-[#A1A1AA]">Your polished content appears here</p>
          </div>

          {!showResult && !isGenerating && (
            <div className="flex items-center justify-center h-96 text-center">
              <div className="opacity-30">
                <FileText className="w-16 h-16 text-[#A1A1AA] mx-auto mb-4" />
                <p className="text-[#A1A1AA]">Your polished content will appear here</p>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-pulse mb-4">
                  <Sparkles className="w-12 h-12 text-[#A855F7] mx-auto" />
                </div>
                <p className="text-[#A1A1AA]">Transforming your content...</p>
              </div>
            </div>
          )}

          {showResult && (
            <div className="space-y-4">
              {/* Result Card */}
              <div className="bg-gradient-to-br from-[#A855F7]/10 to-[#9333EA]/10 border border-[#A855F7]/20 rounded-lg p-6 animate-fade-in">
                <div className="mb-4">
                  <span className="inline-block bg-[#A855F7]/20 text-[#A855F7] px-3 py-1 rounded-full text-sm font-medium">
                    {outputTypes.find(t => t.value === outputType)?.label}
                  </span>
                </div>
                
                <div className="text-[#F5F5F7] whitespace-pre-wrap leading-relaxed">
                  {generatedContent}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleCopy}
                  className="flex-1 bg-[#101014] border border-[#27272A] hover:border-[#A855F7] text-[#F5F5F7] py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Text</span>
                </button>
                
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-[#A855F7] hover:bg-[#9333EA] text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}