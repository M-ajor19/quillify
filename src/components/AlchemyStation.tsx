import React, { useState } from 'react';
import { Upload, Sparkles, Copy, Download, FileText } from 'lucide-react';

interface AlchemyStationProps {
  credits?: number;
  onGenerate?: () => void;
  onCreditsUsed?: () => void;
  onCreditsUpdate?: (newCredits: number) => void;
  isOnboarding?: boolean;
}

export function AlchemyStation({ credits = 3, onGenerate, onCreditsUsed, onCreditsUpdate, isOnboarding = false }: AlchemyStationProps) {
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

  const handleQuillify = async () => {
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
        
        // FIXED: Sync credits from server response
        if (data.creditsRemaining !== undefined && onCreditsUpdate) {
          onCreditsUpdate(data.creditsRemaining);
        } else if (onCreditsUsed) {
          // Fallback to local deduction if server doesn't return credits
          onCreditsUsed();
        }
        
        if (onGenerate && isOnboarding) onGenerate();
      } else {
        throw new Error('No content generated');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      setGeneratedContent('Sorry, there was an error generating content. Please try again.');
      setShowResult(true);
      // FIXED: Don't deduct credits on error
    } finally {
      setIsGenerating(false);
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
        
        {/* Left Panel - The Architectural Core */}
        <div className="bg-white/5 border border-white/20 rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">Architectural Core</h2>
            <p className="text-sm text-white/70">Input your raw content for intelligent analysis</p>
          </div>

          {/* Input Area */}
          <div className="mb-6">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your content here for architectural processing..."
              className="w-full h-48 bg-black border-2 border-white/20 focus:border-white/50 rounded-lg p-4 text-white placeholder-white/40 resize-none transition-all duration-300"
              disabled={isGenerating}
            />
          </div>

          {/* Upload Button */}
          <div className="mb-6">
            <button className="w-full border-2 border-dashed border-white/20 hover:border-white/40 rounded-lg p-4 text-white/70 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload Image</span>
            </button>
          </div>

          {/* Coherence Controls */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Desired Output
              </label>
              <select
                value={outputType}
                onChange={(e) => setOutputType(e.target.value)}
                className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-white/50 focus:outline-none transition-all duration-300"
                disabled={isGenerating}
              >
                {outputTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-white/50 focus:outline-none transition-all duration-300"
                disabled={isGenerating}
              >
                {tones.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Engineer Button */}
          <button
            onClick={handleQuillify}
            disabled={!inputText.trim() || credits <= 0 || isGenerating}
            className="w-full bg-white hover:bg-white/90 disabled:bg-white/5 disabled:text-white/30 text-black py-4 rounded-lg font-semibold text-lg transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"></div>
                <span>Engineering...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Engineer</span>
              </>
            )}
          </button>

          {credits <= 0 && (
            <p className="text-white/70 text-sm text-center mt-2">
              No credits remaining. Buy more to continue.
            </p>
          )}
        </div>

        {/* Right Panel - Coherence Engine */}
        <div className="bg-white/5 border border-white/20 rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">Coherence Engine</h2>
            <p className="text-sm text-white/70">Your engineered content appears here</p>
          </div>

          {!showResult && !isGenerating && (
            <div className="flex items-center justify-center h-96 text-center">
              <div className="opacity-30">
                <FileText className="w-16 h-16 text-white/70 mx-auto mb-4" />
                <p className="text-white/70">Your coherent content will appear here</p>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-pulse-subtle mb-4">
                  <Sparkles className="w-12 h-12 text-white/90 mx-auto" />
                </div>
                <p className="text-white/70">Engineering coherent content...</p>
              </div>
            </div>
          )}

          {showResult && (
            <div className="space-y-4">
              {/* Result Card */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-lg p-6 animate-fade-in">
                <div className="mb-4">
                  <span className="inline-block bg-white/10 text-white/90 px-3 py-1 rounded-full text-sm font-medium">
                    {outputTypes.find(t => t.value === outputType)?.label}
                  </span>
                </div>
                
                <div className="text-white whitespace-pre-wrap leading-relaxed">
                  {generatedContent}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleCopy}
                  className="flex-1 bg-black border border-white/20 hover:border-white/40 text-white py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Text</span>
                </button>
                
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-white hover:bg-white/90 text-black py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
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