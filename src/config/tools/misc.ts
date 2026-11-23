import { ToolDefinition } from '@/types/tool';

export const miscTools: ToolDefinition[] = [
  {
    slug: 'roman-numeral-converter',
    title: 'Roman Numeral Converter (Both Ways)',
    description: 'Convert numbers to Roman numerals and Roman numerals to numbers (1 to 3,999,999). Explains calculation rules, subtractive notation, and history.',
    category: 'misc',
    primaryKeyword: 'roman numeral converter online',
    keywords: ['roman numeral converter', 'number to roman numerals', 'roman to integer', 'roman numerals 1 to 1000', 'convert roman numerals', 'roman numeral calculator'],
    icon: 'Binary',
    isPopular: false,
    content: {
      whatItIs: 'The Roman Numeral Converter translates standard Arabic numbers into classical Roman numerals and decodes Roman numerals back into decimal numbers. It explains subtractive notation (IV = 4, IX = 9), supports numbers from 1 to 3,999,999 with vinculum bar notation, and shows mathematical breakdowns.',
      howToUse: [
        'Type an Arabic number (e.g. 2026) or a Roman numeral (e.g. MMXXVI) in either input field.',
        'The opposite field calculates and synchronizes automatically.',
        'View the step-by-step subtractive/additive breakdown.',
        'Copy the converted numeral or value with one click.',
      ],
      useCases: [
        'Translating copyright years in film credits and TV broadcasts (e.g. MMXXIV = 2024).',
        'Reading Super Bowl championship numbers, Olympic Games, and royal regnal numbering.',
        'Solving history, classic literature, and mathematics homework problems.',
      ],
      tips: [
        'The 7 standard Roman symbols are I (1), V (5), X (10), L (50), C (100), D (500), and M (1,000).',
        'Subtractive notation: a smaller symbol before a larger one subtracts its value (IV = 5 - 1 = 4).',
        'A symbol cannot be repeated more than three consecutive times (e.g., 40 is XL, not XXXX).',
      ],
    },
    faq: [
      {
        question: 'What are the basic Roman numeral symbols and values?',
        answer: 'I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, and M = 1,000.',
      },
      {
        question: 'How do you write 2026 in Roman numerals?',
        answer: '2026 is written as MMXXVI (M = 1000 + M = 1000 + X = 10 + X = 10 + V = 5 + I = 1).',
      },
      {
        question: 'Did Romans have a symbol for zero?',
        answer: 'No, classical Roman numerals did not include a character for zero; they used the word "nulla" or omitted the value entirely.',
      },
      {
        question: 'How does subtractive notation work?',
        answer: 'When a smaller numeral appears before a larger one, it is subtracted (e.g., IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900).',
      },
      {
        question: 'Can this tool validate invalid Roman numeral syntax?',
        answer: 'Yes! It checks syntax and alerts you if invalid repetitions (like "IIII" or "VX") are detected.',
      },
    ],
    relatedTools: ['number-to-words', 'currency-formatter', 'percentage-calculator', 'timestamp-converter'],
  },
  {
    slug: 'number-to-words',
    title: 'Number to Words Converter',
    description: 'Convert numbers into spelled-out English words. Supports International currency format (cents) and Indian numbering system (Lakhs & Crores). Free tool.',
    category: 'misc',
    primaryKeyword: 'number to words converter online',
    keywords: ['number to words', 'spell out numbers', 'convert number to words', 'check writing number to words', 'number to words lakhs crores', 'currency to words'],
    icon: 'WholeWord',
    isPopular: true,
    content: {
      whatItIs: 'The Number to Words Converter translates raw numerical values into formally spelled-out English text. Perfect for writing checks, filling legal agreements, and financial reporting. Supports both the Western International system (Thousands, Millions, Billions) and the Indian system (Lakhs, Crores).',
      howToUse: [
        'Enter any number or monetary amount into the input box.',
        'Choose formatting system: International (Millions, Billions) or Indian (Lakhs, Crores).',
        'Optionally toggle Currency Mode to append "Dollars and Cents" or "Rupees and Paise".',
        'Copy the capitalized, lowercase, or Title Case spelled-out text with one click.',
      ],
      useCases: [
        'Writing checks and bank drafts with precise legal wording to prevent tampering.',
        'Spelling out purchase prices, contract amounts, and legal settlements in agreements.',
        'Teaching number pronunciation and spelling for elementary education.',
      ],
      tips: [
        'Use Title Case when writing legal checks (e.g. "One Thousand Two Hundred Fifty Dollars Only").',
        'The word "and" is strictly reserved for the decimal or cents portion in formal US English.',
        'Hyphenate compound numbers from twenty-one through ninety-nine.',
      ],
    },
    faq: [
      {
        question: 'How does it handle decimal cents in currency mode?',
        answer: 'It expresses cents as a fractional written amount (e.g. "and Fifty-Four Cents" or "and 54/100").',
      },
      {
        question: 'What is the Indian numbering convention (Lakhs & Crores)?',
        answer: '1 Lakh = 100,000; 1 Crore = 10,000,000 (100 Lakhs). The tool formats Indian numbers accordingly.',
      },
      {
        question: 'Can I format numbers in ALL CAPS for banking?',
        answer: 'Yes, buttons are provided to copy in UPPERCASE, Title Case, or lowercase.',
      },
      {
        question: 'What is the maximum number supported?',
        answer: 'It supports numbers up to trillions (10^15) with high precision.',
      },
      {
        question: 'Is my input transmitted to any server?',
        answer: 'No. All spelling logic executes in your web browser.',
      },
    ],
    relatedTools: ['currency-formatter', 'roman-numeral-converter', 'word-counter', 'percentage-calculator'],
  },
  {
    slug: 'emoji-picker',
    title: 'Emoji Keyboard & Search Picker',
    description: 'Browse, search, and copy emojis with one click. Categorized by Smileys, People, Animals, Food, Travel, Activities, Objects, and Symbols.',
    category: 'misc',
    primaryKeyword: 'emoji picker online copy paste',
    keywords: ['emoji picker', 'copy paste emojis', 'search emojis online', 'emoji keyboard', 'unicode emojis', 'emoji cheat sheet'],
    icon: 'Smile',
    isPopular: true,
    content: {
      whatItIs: 'The Emoji Keyboard & Search Picker gives you instant access to the complete Unicode emoji library. Search by emotion, object, or keyword, browse by curated categories, and copy any emoji to your clipboard with a single click.',
      howToUse: [
        'Type keywords in the search bar (e.g., "fire", "heart", "smile", "rocket").',
        'Or click a category tab (Smileys, Animals, Food, Travel, Activities, Objects, Symbols).',
        'Click on any emoji to copy it immediately to your clipboard.',
        'View your recently copied emojis for quick repeat access.',
      ],
      useCases: [
        'Adding personality and engagement to tweets, LinkedIn posts, and email subject lines.',
        'Finding the exact emoji on desktop computers without remembering operating system shortcuts.',
        'Decorating Slack channels, Discord servers, and Notion workspace pages.',
      ],
      tips: [
        'Email subject lines with relevant emojis can increase open rates by up to 25%.',
        'Use the copy history bar to paste multiple emojis in sequence.',
        'Emojis are standardized Unicode characters and display natively on all modern phones and PCs.',
      ],
    },
    faq: [
      {
        question: 'How do I copy an emoji?',
        answer: 'Simply click on any emoji card and it will be copied to your clipboard instantly, accompanied by a confirmation toast.',
      },
      {
        question: 'Will these emojis look the same on all devices?',
        answer: 'The core emoji glyph is identical Unicode, though visual rendering reflects each operating system\'s native artwork (Apple, Google, Microsoft).',
      },
      {
        question: 'Can I search by keywords?',
        answer: 'Yes! You can search by feelings, objects, colors, or slang (e.g. "laugh", "party", "coffee").',
      },
      {
        question: 'Does this tool work offline?',
        answer: 'Yes, the emoji database is embedded locally in client code and works with zero internet connection.',
      },
      {
        question: 'Are my recent picks saved?',
        answer: 'Yes, your recently copied emojis are remembered in your browser\'s local storage.',
      },
    ],
    relatedTools: ['word-counter', 'case-converter', 'meta-tag-generator', 'open-graph-preview'],
  },
  {
    slug: 'typing-speed-test',
    title: 'Typing Speed Test (WPM & Accuracy)',
    description: 'Test your typing speed (Words Per Minute) and accuracy with 1-minute, 3-minute, and custom typing tests. Live keystroke stats and error analysis.',
    category: 'misc',
    primaryKeyword: 'typing speed test online wpm',
    keywords: ['typing speed test', 'wpm test online', 'words per minute test', 'typing test 1 minute', 'typing accuracy test', 'keyboard speed test'],
    icon: 'Keyboard',
    isPopular: true,
    content: {
      whatItIs: 'The Typing Speed Test measures your keystroke velocity (Words Per Minute - WPM), raw WPM, typing accuracy percentage, and error frequency in real-time. Choose between 1-minute, 2-minute, or 3-minute tests with diverse text prompts and celebratory completion stats.',
      howToUse: [
        'Select your test duration (60 seconds, 120 seconds, or 180 seconds).',
        'Click into the typing box and begin typing the prompt text.',
        'Watch your live WPM, accuracy %, and time countdown update in real time.',
        'Review your comprehensive performance report and try again to beat your high score.',
      ],
      useCases: [
        'Preparing for remote job typing assessments and data entry certifications.',
        'Improving software engineering and coding velocity.',
        'Tracking keyboard typing ergonomics and muscle memory progression.',
      ],
      tips: [
        'Focus on 98%+ accuracy first; speed naturally increases as muscle memory stabilizes.',
        'The average human typing speed is approximately 40 WPM; competitive typists exceed 80–100 WPM.',
        'Maintain proper home row finger positioning (ASDF - JKL;) for effortless touch typing.',
      ],
    },
    faq: [
      {
        question: 'How is Words Per Minute (WPM) calculated?',
        answer: 'Standard typing measurement defines one "word" as 5 characters (including spaces). Net WPM = (Total characters typed / 5 - Uncorrected Errors) / Time in Minutes.',
      },
      {
        question: 'What is considered a good typing speed?',
        answer: 'Average: 40 WPM; Good: 60 WPM; Advanced: 80+ WPM; Professional/Competitive: 100+ WPM.',
      },
      {
        question: 'Does backspace affect my score?',
        answer: 'Correcting mistakes with backspace improves your accuracy percentage, which directly boosts your final Net WPM score.',
      },
      {
        question: 'Can I choose different text prompts?',
        answer: 'Yes! You can reload random quotes, literature passages, and coding-style text prompts.',
      },
      {
        question: 'Are high scores saved?',
        answer: 'Yes, your personal best WPM and accuracy records are saved in your local browser storage.',
      },
    ],
    relatedTools: ['stopwatch-timer', 'word-counter', 'case-converter', 'text-to-speech'],
  },
];
