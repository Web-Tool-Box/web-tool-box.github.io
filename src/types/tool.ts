export type ToolCategory =
  | 'text'
  | 'developer'
  | 'image'
  | 'pdf'
  | 'calculators'
  | 'generators'
  | 'misc';

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolContent {
  whatItIs: string;
  howToUse: string[];
  useCases: string[];
  tips: string[];
}

export interface ToolDefinition {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  category: ToolCategory;
  primaryKeyword: string;
  keywords: string[];
  icon: string; // Lucide icon identifier
  isPopular?: boolean;
  isNew?: boolean;
  content: ToolContent;
  faq: ToolFAQ[];
  relatedTools: string[];
}

export interface CategoryInfo {
  slug: ToolCategory;
  name: string;
  description: string;
  icon: string;
  gradient: string;
}
