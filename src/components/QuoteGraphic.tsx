'use client';

import { useRef, useState } from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';

interface QuoteGraphicProps {
  text: string;
  onDownload?: (imageData: string) => void;
}

export function QuoteGraphic({ text, onDownload }: QuoteGraphicProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadImage = async () => {
    if (!canvasRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });

      const imageData = canvas.toDataURL('image/png');
      onDownload?.(imageData);

      // Create download link
      const link = document.createElement('a');
      link.download = 'quillify-quote.png';
      link.href = imageData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Quote Graphic Preview</h3>
        <button
          onClick={downloadImage}
          disabled={isGenerating}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>Download</span>
            </>
          )}
        </button>
      </div>

      <div className="flex justify-center">
        <div
          ref={canvasRef}
          className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 rounded-2xl shadow-2xl max-w-md mx-auto"
          style={{ width: '400px', height: '300px' }}
        >
          <div className="flex flex-col justify-center items-center h-full text-center">
            <div className="text-6xl font-bold mb-4 opacity-20">&ldquo;</div>
            <div className="text-lg leading-relaxed font-medium mb-4">
              {text}
            </div>
            <div className="text-sm opacity-80">
              — Customer Testimonial
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
