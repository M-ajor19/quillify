'use client';

import { useState } from 'react';
import { Copy, Download, Check, Twitter, Linkedin, Image, Quote } from 'lucide-react';
import { QuoteGraphic } from './QuoteGraphic';

interface GeneratedContentProps {
  content: string[];
  format: string;
}

export function GeneratedContent({ content, format }: GeneratedContentProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const downloadAsImage = async (text: string, index: number) => {
    // This would generate a quote graphic
    // For now, we'll just copy the text
    await copyToClipboard(text, index);
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'tweet':
        return <Twitter className="h-4 w-4" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'quote-graphic':
        // eslint-disable-next-line jsx-a11y/alt-text
        return <Image className="h-4 w-4" />;
      default:
        return <Quote className="h-4 w-4" />;
    }
  };

  const getFormatLabel = (format: string) => {
    switch (format) {
      case 'tweet':
        return 'Twitter Post';
      case 'linkedin':
        return 'LinkedIn Post';
      case 'quote-graphic':
        return 'Quote Graphic';
      case 'testimonial':
        return 'Testimonial';
      case 'review':
        return 'Review Snippet';
      default:
        return 'Content';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Generated Content
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>{getFormatIcon(format)}</span>
          <span>{getFormatLabel(format)}</span>
        </div>
      </div>

      <div className="space-y-4">
        {content.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                {format === 'tweet' && (
                  <span className="text-xs text-gray-400">
                    {item.length}/280 characters
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => copyToClipboard(item, index)}
                  className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                {format === 'quote-graphic' && (
                  <button
                    onClick={() => downloadAsImage(item, index)}
                    className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                )}
              </div>
            </div>
            <div className="text-gray-900 leading-relaxed">
              {item}
            </div>
            
            {format === 'quote-graphic' && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <QuoteGraphic text={item} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
