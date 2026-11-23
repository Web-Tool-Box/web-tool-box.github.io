import { ToolDefinition } from '@/types/tool';

export const textTools: ToolDefinition[] = [
  {
    slug: 'word-counter',
    title: 'Word & Character Counter',
    description: 'Free online word counter, character counter, reading time estimator, and sentence analyzer. 100% private in-browser tool with zero signup.',
    category: 'text',
    primaryKeyword: 'free word counter online',
    keywords: ['word counter', 'character counter', 'word count tool', 'count words online', 'reading time calculator', 'text analyzer'],
    icon: 'FileText',
    isPopular: true,
    content: {
      whatItIs: 'The Word & Character Counter is a real-time text analysis utility designed for writers, students, SEO specialists, and social media managers. It calculates total words, characters (with and without spaces), sentences, paragraphs, reading time, and speaking time on the fly.',
      howToUse: [
        'Paste or type your text directly into the input area.',
        'View the live statistics update instantly above the editor.',
        'Toggle whitespace settings or view keyword density breakdown.',
        'Click "Copy Text" or "Download TXT" to export your processed draft.',
      ],
      useCases: [
        'Checking character limits for Twitter (280 chars), LinkedIn posts, and meta descriptions (155 chars).',
        'Ensuring academic essays, dissertations, and assignments meet minimum/maximum word quotas.',
        'Estimating reading time for blog posts and speech length for keynote presentations.',
      ],
      tips: [
        'Standard adult reading speed is approximately 200–250 words per minute (WPM).',
        'Keep SEO meta descriptions between 140 and 155 characters for optimal Google display.',
        'Use the character count without spaces when measuring SMS or tight banner copy.',
      ],
    },
    faq: [
      {
        question: 'Does this word counter store or upload my text?',
        answer: 'No. All calculations are performed entirely in your web browser using JavaScript. No text is ever uploaded to any server or saved in external logs.',
      },
      {
        question: 'How is reading time calculated?',
        answer: 'Reading time is computed using the industry benchmark of 200 words per minute for silent reading, and 130 words per minute for spoken presentations.',
      },
      {
        question: 'Can I check character counts for social media platforms?',
        answer: 'Yes! The tool displays exact character counts with and without spaces, making it perfect for X/Twitter (280 chars), Instagram captions, and Google Ads.',
      },
      {
        question: 'Does the tool count hyphenated or compound words?',
        answer: 'Yes, hyphenated words (e.g., "state-of-the-art") are accurately recognized based on standard regex boundary patterns.',
      },
      {
        question: 'Is there any limit to the text length I can paste?',
        answer: 'There is virtually no limit. Because the tool runs in your local browser memory, it can effortlessly handle manuscripts of 100,000+ words without lagging.',
      },
    ],
    relatedTools: ['case-converter', 'remove-duplicate-lines', 'markdown-previewer', 'text-diff-checker'],
  },
  {
    slug: 'case-converter',
    title: 'Text Case Converter',
    description: 'Convert text case online instantly: UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and Sentence case. Free and private.',
    category: 'text',
    primaryKeyword: 'online case converter',
    keywords: ['case converter', 'convert text to uppercase', 'title case converter', 'camelCase converter', 'snake_case converter', 'kebab case'],
    icon: 'Type',
    isPopular: true,
    content: {
      whatItIs: 'The Text Case Converter changes the capitalization of any text block with a single click. Whether you need programming variable formats like camelCase or PascalCase, or editorial formats like Title Case and Sentence case, this tool formats it immediately without altering punctuation.',
      howToUse: [
        'Paste your raw text into the input field.',
        'Click any conversion button (UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case).',
        'Copy the formatted output to your clipboard or download it as a text file.',
      ],
      useCases: [
        'Transforming headline copy to AP-style or Chicago-style Title Case.',
        'Converting database column names into camelCase or kebab-case for software development.',
        'Fixing accidentally capitalized text entered with Caps Lock enabled.',
      ],
      tips: [
        'Use Title Case for blog post titles and email subject lines to maximize click-through rates.',
        'Developers: kebab-case is ideal for URLs and CSS class names, while snake_case is standard in Python and SQL.',
        'Sentence case is recommended for UX button labels and clean documentation.',
      ],
    },
    faq: [
      {
        question: 'What is the difference between camelCase and PascalCase?',
        answer: 'In camelCase, the first letter is lowercase (e.g., "myVariableName"), while in PascalCase (UpperCamelCase), the first letter is capitalized (e.g., "MyVariableName").',
      },
      {
        question: 'Does Title Case handle minor words like "of", "and", and "the"?',
        answer: 'Yes, our Title Case algorithm adheres to editorial style rules by keeping minor conjunctions, articles, and short prepositions lowercase unless they start the sentence.',
      },
      {
        question: 'Can I convert code identifiers with this tool?',
        answer: 'Absolutely. You can convert between camelCase, snake_case, kebab-case, CONSTANT_CASE, and PascalCase seamlessly.',
      },
      {
        question: 'Is my text sent to a remote API?',
        answer: 'Never. The string conversion runs client-side in your browser, keeping your sensitive copy and code private.',
      },
      {
        question: 'Can I undo a conversion?',
        answer: 'Yes, the tool preserves your original input so you can switch between different case styles with a single click.',
      },
    ],
    relatedTools: ['slug-generator', 'word-counter', 'text-sorter', 'find-and-replace'],
  },
  {
    slug: 'text-diff-checker',
    title: 'Text Diff Checker',
    description: 'Compare two text files or snippets side-by-side. Highlight added, deleted, and modified lines in real-time. Free in-browser diff tool.',
    category: 'text',
    primaryKeyword: 'text diff checker online',
    keywords: ['diff checker', 'text compare', 'compare two texts', 'side by side diff', 'diff tool online', 'find text differences'],
    icon: 'Split',
    isPopular: true,
    content: {
      whatItIs: 'The Text Diff Checker compares two versions of text or code side-by-side. It utilizes the industry-standard Myers difference algorithm to pinpoint exact character and line discrepancies, highlighting additions in green and removals in red.',
      howToUse: [
        'Paste your original text in the left panel.',
        'Paste your modified text in the right panel.',
        'Choose between Split (side-by-side) or Unified diff view modes.',
        'Inspect the highlighted differences and copy the diff summary.',
      ],
      useCases: [
        'Reviewing legal contract revisions and identifying subtle clause modifications.',
        'Comparing code snippets and configuration files without opening a heavy IDE.',
        'Proofreading editorial drafts to inspect editor feedback and corrections.',
      ],
      tips: [
        'Toggle ignore whitespace to focus on substantive content alterations.',
        'Use Unified view for mobile screens and Side-by-Side view on desktop monitors.',
        'Check the additions and deletions counter for a quick quantitative change metric.',
      ],
    },
    faq: [
      {
        question: 'How secure is comparing sensitive contracts on this page?',
        answer: 'It is 100% secure. Both texts stay in your browser local memory; not a single byte is transmitted over the internet.',
      },
      {
        question: 'Can I compare programming source code?',
        answer: 'Yes, the diff checker supports code in any language (JavaScript, Python, HTML, JSON, etc.) and highlights line-by-line syntax variations.',
      },
      {
        question: 'What diff algorithm does this tool implement?',
        answer: 'It employs an optimized Myers diff algorithm, the same mathematical foundation used by Git and Unix diff tools.',
      },
      {
        question: 'Can I export the diff comparison?',
        answer: 'Yes, you can copy the standard unified patch format or copy the modified text directly.',
      },
      {
        question: 'Can it ignore line ending differences (CRLF vs LF)?',
        answer: 'Yes, normalize line endings is automatically enabled to prevent false positives between Windows and macOS files.',
      },
    ],
    relatedTools: ['word-counter', 'remove-duplicate-lines', 'find-and-replace', 'markdown-previewer'],
  },
  {
    slug: 'lorem-ipsum-generator',
    title: 'Lorem Ipsum Generator',
    description: 'Generate customizable Lorem Ipsum placeholder text by paragraphs, sentences, words, or lists with HTML markup tags. Free & fast.',
    category: 'text',
    primaryKeyword: 'lorem ipsum generator',
    keywords: ['lorem ipsum', 'placeholder text generator', 'dummy text', 'lorem ipsum generator paragraphs', 'sample text'],
    icon: 'AlignLeft',
    isPopular: false,
    content: {
      whatItIs: 'The Lorem Ipsum Generator produces realistic dummy text for UI mockups, graphic designs, typesetting prototypes, and website templates. You can specify exact paragraph, sentence, or word counts, and automatically wrap lines in HTML <p> tags.',
      howToUse: [
        'Select whether you want to generate by Paragraphs, Sentences, or Words.',
        'Enter the desired quantity.',
        'Optionally toggle "Start with Lorem ipsum dolor sit amet..." and "Wrap in HTML tags".',
        'Click "Generate" and copy the resulting sample text.',
      ],
      useCases: [
        'Filling wireframes and web designs before final client copy is written.',
        'Testing typography scales, font pairings, and responsive column layouts.',
        'Benchmarking database seeders and text input field validation rules.',
      ],
      tips: [
        'Wrap with HTML tags when dropping dummy content into CMS templates or rich text editors.',
        'Use sentence-based generation to populate cards, modals, and tooltips realistically.',
        'Avoid shipping Lorem Ipsum to production by auditing your website before deployment.',
      ],
    },
    faq: [
      {
        question: 'What is the origin of Lorem Ipsum?',
        answer: 'Lorem Ipsum originates from Cicero\'s 45 BC treatise "De Finibus Bonorum et Malorum" (On the Extremes of Good and Evil), adapted for typesetting in the 1500s.',
      },
      {
        question: 'Why do designers use placeholder text?',
        answer: 'It allows clients and reviewers to focus on visual hierarchy, layout balance, and typography without being distracted by readable content.',
      },
      {
        question: 'Can I generate HTML formatted tags directly?',
        answer: 'Yes, check the "Wrap with HTML tags" option to automatically wrap each paragraph in <p>...</p> tags.',
      },
      {
        question: 'Is the generated text truly random?',
        answer: 'It samples classical Latin vocabulary while maintaining realistic sentence structures and punctuation rhythm.',
      },
      {
        question: 'Can I use this text commercially?',
        answer: 'Yes, Lorem Ipsum is completely public domain and can be freely used in commercial and personal projects.',
      },
    ],
    relatedTools: ['word-counter', 'markdown-previewer', 'slug-generator', 'text-sorter'],
  },
  {
    slug: 'remove-duplicate-lines',
    title: 'Remove Duplicate Lines',
    description: 'Remove duplicate lines from text or lists instantly. Options for case sensitivity, trimming whitespace, and sorting. Free online tool.',
    category: 'text',
    primaryKeyword: 'remove duplicate lines online',
    keywords: ['remove duplicate lines', 'dedupe text', 'delete duplicate lines', 'unique lines finder', 'remove duplicates from list'],
    icon: 'ListFilter',
    isPopular: true,
    content: {
      whatItIs: 'The Remove Duplicate Lines tool de-duplicates messy text lists, email rosters, URL databases, and keyword collections. It filters out repeat occurrences while preserving or sorting your clean dataset in milliseconds.',
      howToUse: [
        'Paste your multi-line list into the input box.',
        'Configure options: Case Sensitive, Trim Whitespace, Remove Empty Lines, or Sort Alphabetically.',
        'View the deduplication count and copy the pristine unique list with one click.',
      ],
      useCases: [
        'Cleaning marketing email recipient lists to prevent duplicate mailings.',
        'Pruning massive keyword lists for Google Ads or programmatic SEO campaigns.',
        'De-duplicating server access logs, IP addresses, or database export records.',
      ],
      tips: [
        'Enable "Trim Whitespace" to ensure trailing spaces do not prevent duplicates from being caught.',
        'Use the "Sort Alphabetically" option to make your deduplicated list easily scannable.',
        'Check the reduction percentage metric to verify how much bloat was eliminated.',
      ],
    },
    faq: [
      {
        question: 'Does the tool maintain the original line order?',
        answer: 'By default, yes! It keeps the first occurrence of each unique line in its original position unless you choose to sort them.',
      },
      {
        question: 'Can I filter case-insensitively?',
        answer: 'Yes, disabling the "Case Sensitive" toggle treats "Apple" and "apple" as the same item, keeping only one.',
      },
      {
        question: 'How many lines can this deduplicator handle?',
        answer: 'Because processing is executed client-side via fast JavaScript Set data structures, it can deduplicate lists of 100,000+ lines in fractions of a second.',
      },
      {
        question: 'Will empty lines be deleted?',
        answer: 'You can toggle the "Remove Empty Lines" checkbox to strip blank lines or retain a single empty line.',
      },
      {
        question: 'Is my data safe from being scrapped?',
        answer: 'Yes, your list is never uploaded over any network. Everything is processed directly in your browser memory.',
      },
    ],
    relatedTools: ['text-sorter', 'find-and-replace', 'word-counter', 'case-converter'],
  },
  {
    slug: 'text-sorter',
    title: 'Online Text & List Sorter',
    description: 'Sort text lines alphabetically (A-Z or Z-A), by length, numerically, or naturally. Shuffle or reverse lines online with zero signup.',
    category: 'text',
    primaryKeyword: 'sort text lines online',
    keywords: ['sort text', 'alphabetize list', 'alphabetical sorter', 'sort lines numerically', 'reverse text lines', 'shuffle lines'],
    icon: 'ArrowUpDown',
    isPopular: false,
    content: {
      whatItIs: 'The Online Text & List Sorter reorganizes lines of text according to your preferred logic: alphabetical (A-Z or Z-A), natural human sorting (handling numbers like 1, 2, 10 correctly), line length, numerical value, or random shuffle.',
      howToUse: [
        'Paste your lines of text into the input field.',
        'Select your sorting method: Alphabetical, Natural, Numerical, Length, Reverse, or Shuffle.',
        'Optionally enable case-insensitivity or strip blank lines.',
        'Copy the newly organized list or download it as a text file.',
      ],
      useCases: [
        'Alphabetizing bibliographies, glossaries, and employee directories.',
        'Sorting numerical data arrays and price lists for reports.',
        'Randomizing giveaway participant names or task assignment queues.',
      ],
      tips: [
        'Use "Natural Sort" when your lines contain numbers (e.g., Chapter 1, Chapter 2, Chapter 10) so they don\'t sort lexicographically as 1, 10, 2.',
        'Combine with the Remove Duplicate Lines tool for a completely clean, ordered dataset.',
        'Use "Sort by Length" when preparing keyword lists or headline options.',
      ],
    },
    faq: [
      {
        question: 'What is natural sorting?',
        answer: 'Natural sorting orders strings containing numbers in human order (e.g. item 1, item 2, item 10) instead of ASCII order (item 1, item 10, item 2).',
      },
      {
        question: 'Can I sort numbers in reverse order?',
        answer: 'Yes, select Numerical sort and toggle the Descending option to order from highest to lowest.',
      },
      {
        question: 'Does the sorter support international character sets and accents?',
        answer: 'Yes, it leverages the JavaScript Intl.Collator API for correct locale-aware sorting of accented characters (á, ö, ç, etc.).',
      },
      {
        question: 'Can I shuffle a list randomly?',
        answer: 'Yes, clicking "Shuffle" runs the Fisher-Yates shuffle algorithm to generate an unbiased random reordering.',
      },
      {
        question: 'Is there any character limit?',
        answer: 'No arbitrary limits exist; the tool processes as many lines as your device memory can accommodate.',
      },
    ],
    relatedTools: ['remove-duplicate-lines', 'case-converter', 'word-counter', 'slug-generator'],
  },
  {
    slug: 'slug-generator',
    title: 'URL Slug Generator',
    description: 'Convert titles and phrases into clean, SEO-friendly URL slugs. Removes special characters, handles accents, and converts to lowercase.',
    category: 'text',
    primaryKeyword: 'url slug generator',
    keywords: ['slug generator', 'url slug maker', 'seo slug generator', 'string to slug', 'clean url maker', 'permalink generator'],
    icon: 'Link',
    isPopular: false,
    content: {
      whatItIs: 'The URL Slug Generator converts titles, headlines, product names, and arbitrary strings into clean, SEO-optimized URL slugs. It strips special characters, transliterates accented characters, replaces whitespace with hyphens or underscores, and converts everything to lowercase.',
      howToUse: [
        'Type or paste your article title or headline.',
        'Select your separator (hyphen "-" or underscore "_").',
        'Choose whether to remove common stop words (e.g., "the", "a", "and") for concise URLs.',
        'Click to copy the clean URL slug to your clipboard.',
      ],
      useCases: [
        'Creating clean permalinks for WordPress, Next.js, Ghost, and Shopify blogs.',
        'Generating consistent Git branch names from Jira task descriptions.',
        'Naming file assets and images with standardized web-safe characters.',
      ],
      tips: [
        'Google recommends hyphens (-) over underscores (_) as word separators in URLs.',
        'Keep URL slugs concise (3 to 5 words) focusing strictly on primary keywords.',
        'Remove stop words to create punchier, more memorable permalinks.',
      ],
    },
    faq: [
      {
        question: 'Why should I use hyphens instead of underscores in URLs?',
        answer: 'Google\'s search indexing treats hyphens as word separators, whereas underscores concatenate words together into a single term.',
      },
      {
        question: 'How does the tool handle accents like "café" or "über"?',
        answer: 'It uses Unicode NFD normalization to convert accented letters into standard Latin equivalents (e.g. "café" becomes "cafe").',
      },
      {
        question: 'What are stop words?',
        answer: 'Stop words are common words like "the", "in", "at", and "for". Removing them produces cleaner, more keyword-focused URLs.',
      },
      {
        question: 'Can I use this for Git branch naming?',
        answer: 'Yes, it works wonderfully for converting ticket titles like "Fix login button styling" into "fix-login-button-styling".',
      },
      {
        question: 'Is any data stored when generating slugs?',
        answer: 'No. The conversion is instant and operates entirely within your browser runtime.',
      },
    ],
    relatedTools: ['case-converter', 'word-counter', 'find-and-replace', 'meta-tag-generator'],
  },
  {
    slug: 'find-and-replace',
    title: 'Find and Replace Text Online',
    description: 'Find and replace text with support for regular expressions (Regex), case sensitivity, whole words, and multiline replacements. Free & private.',
    category: 'text',
    primaryKeyword: 'find and replace text online',
    keywords: ['find and replace', 'regex find and replace', 'text replacer', 'batch replace text', 'online find replace tool'],
    icon: 'Replace',
    isPopular: false,
    content: {
      whatItIs: 'The Find and Replace Text tool enables rapid text substitution across long documents and datasets. It supports standard literal search, full Regular Expression (RegEx) pattern matching, case matching, whole-word filtering, and real-time match highlighting.',
      howToUse: [
        'Paste your text in the main editor.',
        'Enter the text or pattern you want to find.',
        'Enter the replacement string (or leave blank to delete all matches).',
        'Toggle Regex, Case Sensitive, or Match Whole Word options, then click "Replace All".',
      ],
      useCases: [
        'Mass-updating URLs, company names, or dates across documentation.',
        'Sanitizing logs or datasets by finding and removing unwanted characters.',
        'Running complex regex pattern replacements on code snippets.',
      ],
      tips: [
        'Leave the "Replace With" field empty to bulk-delete targeted strings.',
        'Use capture groups ($1, $2) in regex mode for powerful text restructuring.',
        'Always preview the match count before executing a destructive replacement.',
      ],
    },
    faq: [
      {
        question: 'Can I use Regular Expressions (Regex)?',
        answer: 'Yes, simply check the "Regex" toggle to enable JavaScript regex syntax, including flags and capture groups.',
      },
      {
        question: 'Can I use regex capture groups in the replacement?',
        answer: 'Yes, you can reference captured groups with $1, $2, etc., in the replacement field.',
      },
      {
        question: 'What does "Match Whole Word" do?',
        answer: 'It ensures that finding "cat" will not match "category" or "scatter", matching only the standalone word.',
      },
      {
        question: 'How do I replace newlines or tabs?',
        answer: 'In Regex mode, you can target newlines using \\n and tab characters using \\t.',
      },
      {
        question: 'Does this tool transmit my text to any server?',
        answer: 'Never. All replacements occur locally in your browser memory for total confidentiality.',
      },
    ],
    relatedTools: ['case-converter', 'remove-duplicate-lines', 'text-diff-checker', 'word-counter'],
  },
  {
    slug: 'markdown-previewer',
    title: 'Markdown Live Editor & Previewer',
    description: 'Write Markdown with real-time HTML preview. Supports GitHub Flavored Markdown (GFM), tables, checklists, code syntax, and export to HTML.',
    category: 'text',
    primaryKeyword: 'markdown previewer online',
    keywords: ['markdown editor', 'markdown previewer', 'gfm editor', 'markdown to html', 'markdown live viewer', 'github markdown preview'],
    icon: 'FileCode',
    isPopular: true,
    content: {
      whatItIs: 'The Markdown Live Editor & Previewer provides a synchronized side-by-side editing environment for GitHub Flavored Markdown (GFM). Write headings, code blocks, tables, task lists, and blockquotes with instant rendered HTML preview and direct file export.',
      howToUse: [
        'Type or paste Markdown into the left editor panel.',
        'View the live rendered HTML output instantly in the right panel.',
        'Use the toolbar shortcuts for bold, italics, tables, and code formatting.',
        'Export your document as raw Markdown (.md), clean HTML, or copy to clipboard.',
      ],
      useCases: [
        'Drafting README.md documentation for GitHub open-source repositories.',
        'Writing blog posts and articles for static site generators like Hugo, Next.js, and Astro.',
        'Formatting structured meeting notes with checklists and tables.',
      ],
      tips: [
        'Use three backticks followed by language name (e.g. ```typescript) for syntax highlighting.',
        'Create interactive task lists with `- [ ] Pending` and `- [x] Completed`.',
        'Tables can be quickly created using pipe `|` and hyphen `-` characters.',
      ],
    },
    faq: [
      {
        question: 'Does this previewer support GitHub Flavored Markdown (GFM)?',
        answer: 'Yes, it supports tables, strikethrough, task checklists, autolinks, and fenced code blocks.',
      },
      {
        question: 'Can I export the rendered HTML?',
        answer: 'Yes, you can copy the raw HTML markup or download a ready-to-use .html file with one click.',
      },
      {
        question: 'Is my draft saved if I refresh the page?',
        answer: 'Your draft is automatically stored in your browser\'s localStorage so you never lose your edits upon accidental refresh.',
      },
      {
        question: 'Does it support inline images?',
        answer: 'Yes, standard Markdown image syntax `![alt](url)` will render live in the preview pane.',
      },
      {
        question: 'Can I paste existing Markdown files into the editor?',
        answer: 'Yes, you can paste or drag-and-drop any .md text file directly into the input area.',
      },
    ],
    relatedTools: ['word-counter', 'text-diff-checker', 'lorem-ipsum-generator', 'html-css-js-minifier'],
  },
  {
    slug: 'text-to-speech',
    title: 'Text to Speech (TTS) Synthesizer',
    description: 'Convert text to natural speech audio in your browser using the Web Speech API. Adjust voice, pitch, rate, and volume with zero server latency.',
    category: 'text',
    primaryKeyword: 'text to speech online free',
    keywords: ['text to speech', 'tts online', 'voice synthesizer', 'read text aloud', 'browser tts', 'text reader'],
    icon: 'Volume2',
    isPopular: false,
    content: {
      whatItIs: 'The Text to Speech Synthesizer reads your written text out loud with natural computer voices powered by your browser\'s native Web Speech API. You can choose from multiple system voices, languages, control narration speed, pitch, and volume.',
      howToUse: [
        'Type or paste your article, message, or notes into the text field.',
        'Select your preferred voice and accent from the dropdown menu.',
        'Adjust the Speed (Rate) and Pitch sliders to customize the tone.',
        'Click "Play" to listen to the speech synthesis in real-time.',
      ],
      useCases: [
        'Proofreading articles by listening to cadence and identifying awkward sentences.',
        'Accessibility testing and auditory content verification for educational materials.',
        'Practicing language pronunciation and listening comprehension.',
      ],
      tips: [
        'Listening to your own writing is one of the most effective ways to catch grammatical flow issues.',
        'Slightly reducing the rate to 0.9x can significantly enhance voice naturalness.',
        'Different operating systems (Windows, macOS, Android) provide different high-quality built-in voices.',
      ],
    },
    faq: [
      {
        question: 'Does this tool require an internet connection or external API key?',
        answer: 'No! It utilizes the Web Speech Synthesis API built directly into your web browser, functioning 100% offline and locally.',
      },
      {
        question: 'Can I change the language or accent?',
        answer: 'Yes, the voice selector automatically lists all voices installed on your operating system, including US, UK, Spanish, French, German, and more.',
      },
      {
        question: 'Is my audio uploaded or recorded on a server?',
        answer: 'Never. The audio synthesis is generated by your local sound card drivers; no data ever leaves your device.',
      },
      {
        question: 'Can I pause and resume playback?',
        answer: 'Yes, full playback controls (Play, Pause, Resume, and Stop) are provided.',
      },
      {
        question: 'Can I download the synthesized speech as an MP3?',
        answer: 'Browser Web Speech APIs do not directly stream raw audio bytes for security reasons, but you can capture system audio via standard recording tools.',
      },
    ],
    relatedTools: ['word-counter', 'case-converter', 'markdown-previewer', 'typing-speed-test'],
  },
];
