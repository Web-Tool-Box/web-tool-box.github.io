'use client';

import React, { useState } from 'react';
import { Copy, Check, Search, Smile } from 'lucide-react';

const EMOJIS = [
  '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '😉', '😊', '😇',
  '🥰', '😍', '🤩', '😘', '😗', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗',
  '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬',
  '🔥', '✨', '🎉', '🚀', '💯', '⭐', '❤️', '👍', '👏', '🙌', '💡', '⚡',
  '💻', '📱', '☕', '🍕', '🍔', '🎨', '🎯', '🏆', '💎', '🌈', '🌍', '📦'
];

export default function EmojiPicker() {
  const [search, setSearch] = useState('');
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);

  const handleCopy = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setCopiedEmoji(emoji);
    setTimeout(() => setCopiedEmoji(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="p-2 text-xs font-medium text-slate-500">
        Click on any emoji to copy it to your clipboard instantly!
      </div>

      {/* Emoji Grid */}
      <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        {EMOJIS.map((e, idx) => (
          <button
            key={idx}
            onClick={() => handleCopy(e)}
            className="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:scale-125 transition-transform flex items-center justify-center text-xl shadow-sm relative group"
          >
            <span>{e}</span>
            {copiedEmoji === e && (
              <span className="absolute -top-6 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow">
                Copied!
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
