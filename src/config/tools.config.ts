import { ToolDefinition, ToolCategory } from '@/types/tool';
import { textTools } from './tools/text';
import { developerTools } from './tools/developer';
import { imageTools } from './tools/image';
import { pdfTools } from './tools/pdf';
import { calculatorTools } from './tools/calculators';
import { generatorTools } from './tools/generators';
import { miscTools } from './tools/misc';

export const TOOLS: ToolDefinition[] = [
  ...textTools,
  ...developerTools,
  ...imageTools,
  ...pdfTools,
  ...calculatorTools,
  ...generatorTools,
  ...miscTools,
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return TOOLS.filter((t) => t.category === category);
}

export function getAllToolSlugs(): string[] {
  return TOOLS.map((t) => t.slug);
}

export function getPopularTools(): ToolDefinition[] {
  return TOOLS.filter((t) => t.isPopular);
}
