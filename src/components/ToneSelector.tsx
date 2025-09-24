'use client';

interface ToneSelectorProps {
  selectedTone: string;
  setSelectedTone: (tone: string) => void;
}

const tones = [
  { value: 'professional', label: 'Professional', description: 'Clean, corporate, trustworthy' },
  { value: 'enthusiastic', label: 'Enthusiastic', description: 'Energetic, excited, passionate' },
  { value: 'witty', label: 'Witty', description: 'Clever, humorous, engaging' },
  { value: 'conversational', label: 'Conversational', description: 'Friendly, approachable, natural' },
  { value: 'authoritative', label: 'Authoritative', description: 'Confident, expert, commanding' }
];

export function ToneSelector({ selectedTone, setSelectedTone }: ToneSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Tone
      </label>
      <div className="space-y-2">
        {tones.map((tone) => (
          <label
            key={tone.value}
            className={`flex items-start p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedTone === tone.value
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="tone"
              value={tone.value}
              checked={selectedTone === tone.value}
              onChange={(e) => setSelectedTone(e.target.value)}
              className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">{tone.label}</div>
              <div className="text-xs text-gray-500">{tone.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}



