'use client';

interface FormatSelectorProps {
  selectedFormat: string;
  setSelectedFormat: (format: string) => void;
}

const formats = [
  { value: 'tweet', label: 'Twitter Post', description: '280 characters, engaging' },
  { value: 'linkedin', label: 'LinkedIn Post', description: 'Professional, detailed' },
  { value: 'quote-graphic', label: 'Quote Graphic', description: 'Visual, shareable' },
  { value: 'testimonial', label: 'Testimonial', description: 'Full testimonial format' },
  { value: 'review', label: 'Review Snippet', description: 'Short, impactful' }
];

export function FormatSelector({ selectedFormat, setSelectedFormat }: FormatSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Format
      </label>
      <div className="space-y-2">
        {formats.map((format) => (
          <label
            key={format.value}
            className={`flex items-start p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedFormat === format.value
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="format"
              value={format.value}
              checked={selectedFormat === format.value}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">{format.label}</div>
              <div className="text-xs text-gray-500">{format.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
