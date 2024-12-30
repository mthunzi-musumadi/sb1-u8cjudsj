import React, { useState } from 'react';
import { Tag } from 'lucide-react';
import { Button } from './Button';

interface EntryFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    category: string;
    labels: string[];
  }) => void;
}

const LABEL_OPTIONS = ['Productive', 'Unproductive'];

export function EntryForm({ onSubmit }: EntryFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [labels, setLabels] = useState<string[]>([]);

  const toggleLabel = (label: string) => {
    if (labels.includes(label)) {
      setLabels(labels.filter(l => l !== label));
    } else {
      setLabels([...labels, label]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && category) {
      onSubmit({ title, description, category, labels });
      setTitle('');
      setDescription('');
      setCategory('');
      setLabels([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Tag size={20} className="text-gray-500" />
          <span className="text-gray-700">Select Labels:</span>
        </div>
        <div className="flex gap-2">
          {LABEL_OPTIONS.map((label) => (
            <Button
              key={label}
              type="button"
              variant={labels.includes(label) ? 'primary' : 'secondary'}
              onClick={() => toggleLabel(label)}
              className="px-3 py-1.5 text-sm"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      <Button
        type="submit"
        className="w-full p-2"
      >
        Start Tracking
      </Button>
    </form>
  );
}