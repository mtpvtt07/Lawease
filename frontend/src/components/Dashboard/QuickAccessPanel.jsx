import React from 'react';
import { FileText, Bookmark, MessageSquare } from 'lucide-react';

const actions = [
  { icon: <FileText className="w-7 h-7" />, label: 'My Cases' },
  { icon: <Bookmark className="w-7 h-7" />, label: 'Saved Articles' },
  { icon: <MessageSquare className="w-7 h-7" />, label: 'Ask a Question' },
];

export default function QuickAccessPanel() {
  return (
    <section className="mb-8">
      <div className="flex gap-6 justify-center">
        {actions.map((action, i) => (
          <div key={i} className="flex flex-col items-center bg-white/5 rounded-xl p-6 shadow hover:bg-white/10 transition cursor-pointer w-40">
            <div className="mb-2 text-white">{action.icon}</div>
            <div className="font-semibold text-lg text-white text-center">{action.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 