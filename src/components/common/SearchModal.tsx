'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Star, Clock, Command, ArrowRight, Sparkles } from 'lucide-react';
import { TOOLS } from '@/config/tools.config';
import { getFavorites, getRecentTools } from '@/lib/storage';
import { ToolDefinition } from '@/types/tool';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Filter tools based on query
  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return [];
    }

    return TOOLS.filter((tool) => {
      const titleMatch = tool.title.toLowerCase().includes(q);
      const descMatch = tool.description.toLowerCase().includes(q);
      const catMatch = tool.category.toLowerCase().includes(q);
      const kwMatch = tool.keywords.some((k) => k.toLowerCase().includes(q));
      return titleMatch || descMatch || catMatch || kwMatch;
    }).slice(0, 10);
  }, [query]);

  // Quick lists when empty
  const [favorites, setFavorites] = useState<ToolDefinition[]>([]);
  const [recents, setRecents] = useState<ToolDefinition[]>([]);

  useEffect(() => {
    if (isOpen) {
      const favSlugs = getFavorites();
      const recSlugs = getRecentTools();
      setFavorites(TOOLS.filter((t) => favSlugs.includes(t.slug)));
      setRecents(TOOLS.filter((t) => recSlugs.includes(t.slug)));
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredTools.length > 0 ? (prev + 1) % filteredTools.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredTools.length > 0 ? (prev - 1 + filteredTools.length) % filteredTools.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredTools.length > 0 && filteredTools[selectedIndex]) {
        router.push(`/tools/${filteredTools[selectedIndex].slug}/`);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search tools"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search 60+ tools (e.g. json, qr, pdf, compress, uuid)..."
            className="flex-1 bg-transparent border-0 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-flex text-[11px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
          {query.trim() ? (
            filteredTools.length > 0 ? (
              filteredTools.map((tool, idx) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}/`}
                  onClick={onClose}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                    idx === selectedIndex
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold text-xs">
                      {tool.title.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm flex items-center gap-2">
                        <span>{tool.title}</span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {tool.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                </Link>
              ))
            ) : (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <p className="font-semibold text-base mb-1">No tools found</p>
                <p className="text-xs">Try searching for generic terms like &quot;text&quot;, &quot;format&quot;, &quot;convert&quot;, or &quot;calc&quot;</p>
              </div>
            )
          ) : (
            <div className="space-y-4 py-2">
              {favorites.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Favorite Tools
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {favorites.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}/`}
                        onClick={onClose}
                        className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-2.5 border border-slate-100 dark:border-slate-800/50"
                      >
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {tool.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {recents.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" /> Recently Used
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {recents.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}/`}
                        onClick={onClose}
                        className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-2.5 border border-slate-100 dark:border-slate-800/50"
                      >
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {tool.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" /> Popular Tools
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TOOLS.filter((t) => t.isPopular)
                    .slice(0, 6)
                    .map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}/`}
                        onClick={onClose}
                        className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-between border border-slate-100 dark:border-slate-800/50"
                      >
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {tool.title}
                        </span>
                        <span className="text-[10px] text-indigo-500 font-medium">Open</span>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>ESC to close</span>
          </div>
          <span className="font-semibold text-indigo-500">60+ Free Online Tools</span>
        </div>
      </div>
    </div>
  );
}
