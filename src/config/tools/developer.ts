import { ToolDefinition } from '@/types/tool';

export const developerTools: ToolDefinition[] = [
  {
    slug: 'json-formatter',
    title: 'JSON Formatter, Validator & Minifier',
    description: 'Format, validate, beautify, and minify JSON data online. Precise error detection with line numbers, indentation control, and tree view. Free & private.',
    category: 'developer',
    primaryKeyword: 'free json formatter online',
    keywords: ['json formatter', 'json validator', 'beautify json', 'minify json', 'json viewer', 'format json online', 'json pretty print'],
    icon: 'Braces',
    isPopular: true,
    content: {
      whatItIs: 'The JSON Formatter, Validator & Minifier parses, indents, and verifies JSON data payloads in real time. If your JSON has syntax errors (such as missing quotes, trailing commas, or unescaped characters), the validator pinpoints the exact line and column number.',
      howToUse: [
        'Paste raw or minified JSON into the editor.',
        'Choose your indentation level (2 spaces, 4 spaces, or Tabs).',
        'Click "Format / Beautify" to structure the document, or "Minify / Compact" to strip whitespace.',
        'Copy the formatted output, or download it as a .json file.',
      ],
      useCases: [
        'Debugging REST API response payloads and GraphQL query returns.',
        'Sanitizing and validating package.json, tsconfig.json, and settings files.',
        'Minifying JSON configurations to reduce payload sizes for network transmission.',
      ],
      tips: [
        'Remember that standard JSON requires double quotes around keys and string values.',
        'Trailing commas after the last element in arrays or objects cause syntax errors in strict JSON.',
        'Minifying JSON before saving to localStorage or database rows saves storage overhead.',
      ],
    },
    faq: [
      {
        question: 'Does this formatter upload my JSON data to any server?',
        answer: 'No. All JSON parsing and serialization occurs 100% in your browser using the native JavaScript JSON engine. No data is logged or transmitted.',
      },
      {
        question: 'How does it help debug JSON syntax errors?',
        answer: 'When parsing fails, the tool highlights the exact line and position where the error occurred and displays a descriptive explanation.',
      },
      {
        question: 'Can I format very large JSON files (e.g. 10MB+)?',
        answer: 'Yes, because processing runs on your local computer hardware without network latency, it handles multi-megabyte payloads smoothly.',
      },
      {
        question: 'Can I convert between 2 spaces and 4 spaces indentation?',
        answer: 'Yes, you can toggle between 2 spaces, 4 spaces, or tab indentation with a single click.',
      },
      {
        question: 'What is the difference between beautifying and minifying?',
        answer: 'Beautifying adds newlines and indentation for human readability; minifying removes all non-essential whitespace to minimize file size.',
      },
    ],
    relatedTools: ['json-to-csv', 'json-to-yaml', 'base64-encoder-decoder', 'jwt-decoder'],
  },
  {
    slug: 'json-to-csv',
    title: 'JSON to CSV & CSV to JSON Converter',
    description: 'Convert JSON arrays to CSV spreadsheets and CSV back to JSON. Automatic delimiter detection, nested key flattening, and instant download.',
    category: 'developer',
    primaryKeyword: 'json to csv converter online',
    keywords: ['json to csv', 'csv to json', 'convert json to excel', 'json spreadsheet converter', 'json table export'],
    icon: 'Sheet',
    isPopular: true,
    content: {
      whatItIs: 'The JSON to CSV and CSV to JSON Converter transforms structured JSON arrays of objects into tabular CSV format and vice versa. It automatically extracts header columns, handles nested objects via dot notation, manages quotes, and exports clean spreadsheets.',
      howToUse: [
        'Select conversion direction: JSON to CSV or CSV to JSON.',
        'Paste your input data into the editor.',
        'Configure options: Delimiter (Comma, Semicolon, Tab) and Header row.',
        'View the converted output, copy to clipboard, or download as a .csv / .json file.',
      ],
      useCases: [
        'Exporting backend database records and API responses into Excel or Google Sheets.',
        'Converting customer list CSV exports into structured JSON for frontend state.',
        'Transforming product catalogs and analytics logs for business intelligence reporting.',
      ],
      tips: [
        'Ensure your JSON input is an array of objects for standard tabular CSV generation.',
        'Dot notation (e.g., "user.address.city") is used to flatten nested object keys.',
        'Use tab delimiters when pasting directly into spreadsheet software like Excel.',
      ],
    },
    faq: [
      {
        question: 'Does the tool support nested JSON objects?',
        answer: 'Yes, nested objects are automatically flattened into intuitive column names using dot notation (e.g. address.city).',
      },
      {
        question: 'Can I choose semicolon as the CSV delimiter?',
        answer: 'Yes, you can select comma, semicolon, tab (TSV), or pipe delimiters to suit regional spreadsheet standards.',
      },
      {
        question: 'Can I convert CSV back into JSON?',
        answer: 'Yes! Simply toggle the direction to CSV to JSON; column headers become object keys automatically.',
      },
      {
        question: 'Is my data transmitted to remote servers?',
        answer: 'No. All data manipulation is executed locally in client-side memory.',
      },
      {
        question: 'Can I download the resulting CSV directly?',
        answer: 'Yes, click "Download CSV" to save the file with proper MIME type headers.',
      },
    ],
    relatedTools: ['json-formatter', 'json-to-yaml', 'base64-encoder-decoder', 'html-css-js-minifier'],
  },
  {
    slug: 'json-to-yaml',
    title: 'JSON to YAML & YAML to JSON Converter',
    description: 'Convert JSON to YAML and YAML to JSON in real time. Perfect for Kubernetes, Docker Compose, GitHub Actions, and CI/CD configurations.',
    category: 'developer',
    primaryKeyword: 'json to yaml converter',
    keywords: ['json to yaml', 'yaml to json', 'convert json yaml', 'yaml formatter', 'kubernetes config converter', 'docker compose yaml converter'],
    icon: 'FileCode2',
    isPopular: true,
    content: {
      whatItIs: 'The JSON to YAML Converter translates between JavaScript Object Notation (JSON) and "YAML Ain\'t Markup Language" (YAML). It preserves data types, structures arrays and objects cleanly, and helps DevOps engineers convert CI/CD and Kubernetes manifests.',
      howToUse: [
        'Choose your direction: JSON to YAML or YAML to JSON.',
        'Paste your code snippet into the source editor.',
        'Adjust indentation preferences (2 or 4 spaces).',
        'Copy the converted code or download the file with one click.',
      ],
      useCases: [
        'Converting GitHub Actions workflow configs and Docker Compose definitions.',
        'Translating OpenAPI / Swagger specifications between JSON and YAML formats.',
        'Refactoring Kubernetes Pod, Service, and Ingress manifests.',
      ],
      tips: [
        'YAML is indentation-sensitive; always use spaces instead of tabs.',
        'Quotes in YAML are optional for strings unless they contain special characters or colons.',
        'Validating JSON first ensures error-free YAML output.',
      ],
    },
    faq: [
      {
        question: 'Why convert JSON to YAML for DevOps?',
        answer: 'YAML is significantly more readable for humans and supports comments, making it the industry standard for Kubernetes, Ansible, and CI/CD tools.',
      },
      {
        question: 'Does the parser support multi-document YAML?',
        answer: 'Yes, documents separated by three dashes (---) are properly handled.',
      },
      {
        question: 'Does it support boolean and null data types?',
        answer: 'Yes, standard primitives (numbers, booleans, strings, nulls) translate faithfully between both specifications.',
      },
      {
        question: 'Is my cloud configuration secure from leaks?',
        answer: 'Completely. Because the converter runs entirely on your local machine, sensitive credentials or secrets are never transmitted.',
      },
      {
        question: 'Can I format and beautify YAML?',
        answer: 'Yes, converting to JSON and back to YAML standardizes indentation and normalizes syntax.',
      },
    ],
    relatedTools: ['json-formatter', 'json-to-csv', 'base64-encoder-decoder', 'jwt-decoder'],
  },
  {
    slug: 'base64-encoder-decoder',
    title: 'Base64 Encoder & Decoder',
    description: 'Encode text or binary data to Base64 and decode Base64 strings to readable text. Supports UTF-8 characters and URL-safe Base64 encoding.',
    category: 'developer',
    primaryKeyword: 'base64 encode decode online',
    keywords: ['base64 encoder', 'base64 decoder', 'base64 encode', 'base64 decode', 'base64 string converter', 'url safe base64'],
    icon: 'Binary',
    isPopular: true,
    content: {
      whatItIs: 'The Base64 Encoder & Decoder converts standard ASCII and UTF-8 strings into Base64 format and vice versa. It features full support for international multi-byte characters, URL-safe Base64 encoding (- and _), and live character count metrics.',
      howToUse: [
        'Select "Encode" or "Decode" mode.',
        'Type or paste your text into the input field.',
        'Toggle "URL Safe" if encoding tokens for query strings or URLs.',
        'Instantly view the result, copy to clipboard, or download as a text file.',
      ],
      useCases: [
        'Encoding basic authentication headers (`Authorization: Basic ...`) for HTTP requests.',
        'Decoding obfuscated parameters from URL query strings and API webhooks.',
        'Embedding inline SVG or small font files into CSS and HTML files.',
      ],
      tips: [
        'Standard Base64 uses `+` and `/` characters; URL-safe Base64 replaces them with `-` and `_`.',
        'Base64 encoding increases data size by approximately 33%.',
        'Base64 is an encoding format, not an encryption method; never use it to protect sensitive passwords.',
      ],
    },
    faq: [
      {
        question: 'What is Base64 encoding?',
        answer: 'Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format using 64 printable characters.',
      },
      {
        question: 'Does this tool support emojis and non-English characters?',
        answer: 'Yes! It utilizes complete UTF-8 encoding pipelines so emojis, accented letters, and Asian character sets decode accurately.',
      },
      {
        question: 'What is URL-safe Base64?',
        answer: 'URL-safe Base64 replaces "+" with "-" and "/" with "_", and omits padding "=" so strings can be safely used in URLs without escaping.',
      },
      {
        question: 'Can I decode Basic Auth headers?',
        answer: 'Yes, paste the token portion of your Authorization header to reveal the `username:password` credentials.',
      },
      {
        question: 'Is any encoded data stored remotely?',
        answer: 'No. Everything runs inside your browser using standard client APIs.',
      },
    ],
    relatedTools: ['url-encoder-decoder', 'jwt-decoder', 'hash-generator', 'image-to-base64'],
  },
  {
    slug: 'url-encoder-decoder',
    title: 'URL Encoder & Decoder',
    description: 'Encode and decode URLs, query strings, and URI components online. Handles standard RFC 3986 percent-encoding with full UTF-8 support.',
    category: 'developer',
    primaryKeyword: 'url encoder decoder online',
    keywords: ['url encoder', 'url decoder', 'url encode online', 'percent encoding', 'decode uri component', 'query string encoder'],
    icon: 'Globe',
    isPopular: true,
    content: {
      whatItIs: 'The URL Encoder & Decoder translates special characters into percent-encoded equivalents (%20, %2F, %3F, etc.) conforming to RFC 3986, and decodes percent-encoded URLs back into clear human-readable strings.',
      howToUse: [
        'Paste your URL or parameter string into the input box.',
        'Choose "Encode" to escape reserved characters or "Decode" to unescape them.',
        'Toggle between "Component" mode (for query parameter values) and "Full URI" mode.',
        'Copy the sanitized URL to your clipboard.',
      ],
      useCases: [
        'Sanitizing search terms, query strings, and redirects in web application parameters.',
        'Debugging cryptic tracking URLs with deep percent-encoded parameters.',
        'Safely passing URLs as parameters inside webhooks and OAuth redirect links.',
      ],
      tips: [
        'Use encodeURIComponent when encoding a parameter value that contains slashes or question marks.',
        'Use encodeURI when encoding a full URL that should retain its protocol and domain slashes.',
        'Spaces can be encoded as %20 or + depending on form specification standards.',
      ],
    },
    faq: [
      {
        question: 'What is percent-encoding?',
        answer: 'Percent-encoding replaces non-ASCII or reserved characters in a URI with a "%" followed by two hexadecimal digits representing the character\'s ASCII/UTF-8 byte value.',
      },
      {
        question: 'What is the difference between encodeURI and encodeURIComponent?',
        answer: 'encodeURI preserves protocol and path delimiters like :, /, ?, and &, whereas encodeURIComponent encodes all reserved characters for safe parameter insertion.',
      },
      {
        question: 'Why do spaces become %20 or + in URLs?',
        answer: '%20 is the RFC 3986 standard for a space in URI paths; "+" is traditionally used in query strings for application/x-www-form-urlencoded.',
      },
      {
        question: 'Can this tool decode malformed URLs?',
        answer: 'Yes, it gracefully handles incomplete percent sequences without crashing the page.',
      },
      {
        question: 'Does this tool communicate with external servers?',
        answer: 'No. The conversion is entirely local in your browser.',
      },
    ],
    relatedTools: ['base64-encoder-decoder', 'utm-link-builder', 'slug-generator', 'hash-generator'],
  },
  {
    slug: 'html-css-js-minifier',
    title: 'HTML, CSS & JavaScript Minifier & Beautifier',
    description: 'Minify and beautify HTML, CSS, and JS code directly in your browser. Remove unnecessary whitespace, comments, and shrink file sizes.',
    category: 'developer',
    primaryKeyword: 'html css js minifier online',
    keywords: ['html minifier', 'css minifier', 'js minifier', 'code beautifier', 'minify code online', 'compress html css js'],
    icon: 'Code',
    isPopular: true,
    content: {
      whatItIs: 'The HTML, CSS & JavaScript Minifier & Beautifier compresses code to maximize website loading speed and Core Web Vitals, or beautifies compact snippets into clean, well-indented code for readable debugging.',
      howToUse: [
        'Select the language tab: HTML, CSS, or JavaScript.',
        'Paste your source code in the left editor panel.',
        'Click "Minify" to compress the code or "Beautify" to format it.',
        'Check the size reduction stats and copy or download the optimized code.',
      ],
      useCases: [
        'Compressing inline CSS styles and JavaScript scripts to improve First Contentful Paint (FCP).',
        'Formatting minified vendor bundles to read and debug production issues.',
        'Stripping comments and excessive whitespace from production HTML templates.',
      ],
      tips: [
        'Minifying production code reduces bandwidth consumption and improves PageSpeed scores.',
        'Keep original unminified files in version control; only deploy minified outputs.',
        'Always test minified JavaScript to ensure no syntax errors were introduced.',
      ],
    },
    faq: [
      {
        question: 'How much file size reduction can I expect?',
        answer: 'Typically between 20% to 60% depending on the amount of whitespace, indentation, and comments in your source file.',
      },
      {
        question: 'Does minification alter code behavior?',
        answer: 'No, minification only removes superfluous whitespace, comments, and line breaks while preserving exact functional execution.',
      },
      {
        question: 'Can I format minified code back to readable indentation?',
        answer: 'Yes, simply paste the minified code and click "Beautify" to restore clean 2-space indentation.',
      },
      {
        question: 'Is my proprietary code protected?',
        answer: 'Yes. None of your source code is sent over the network; all minification algorithms run client-side.',
      },
      {
        question: 'Can I minify SVG files with the HTML tab?',
        answer: 'Yes! SVG is XML-based, so the HTML minifier efficiently strips unnecessary tags, spaces, and comments from SVG files.',
      },
    ],
    relatedTools: ['json-formatter', 'regex-tester', 'markdown-previewer', 'box-shadow-generator'],
  },
  {
    slug: 'regex-tester',
    title: 'Regular Expression (Regex) Tester',
    description: 'Test and debug JavaScript regular expressions in real time. Full support for flags (g, i, m, s, u), capture groups, and match highlighting.',
    category: 'developer',
    primaryKeyword: 'regex tester online',
    keywords: ['regex tester', 'regular expression tester', 'test regex online', 'javascript regex tester', 'regex match highlighter', 'regex debugger'],
    icon: 'Regex',
    isPopular: true,
    content: {
      whatItIs: 'The Regular Expression (Regex) Tester lets you build, test, and debug JavaScript regex patterns against target sample text. It provides live match highlighting, capture group breakdown, regex flags configuration, and common regex template presets.',
      howToUse: [
        'Enter your regex pattern in the pattern input (e.g., `[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}`).',
        'Toggle your regex flags (Global, Case Insensitive, Multiline, DotAll, Unicode).',
        'Paste your test string into the text area below.',
        'Review the live match highlights and capture group details in real-time.',
      ],
      useCases: [
        'Validating complex form inputs like email addresses, phone numbers, and strong passwords.',
        'Extracting specific URLs, IP addresses, or token IDs from server log files.',
        'Prototyping data scraping and text extraction routines before implementing in code.',
      ],
      tips: [
        'Always test edge cases such as empty strings, special characters, and non-ASCII text.',
        'The `g` (global) flag is required to match all occurrences in the text rather than stopping after the first match.',
        'Use non-capturing groups `(?:...)` when you need grouping without the overhead of capturing.',
      ],
    },
    faq: [
      {
        question: 'Which regex dialect does this tester use?',
        answer: 'It uses standard ECMAScript (JavaScript) RegExp engine, which is native to modern web browsers.',
      },
      {
        question: 'Can I view individual capture groups?',
        answer: 'Yes! The results panel displays each match along with an indexed breakdown of all captured groups.',
      },
      {
        question: 'Are there pre-built regex presets available?',
        answer: 'Yes, quick presets for Email, Phone Number, URL, IP Address, Date, and Hex Color are provided.',
      },
      {
        question: 'Can I test catastrophic backtracking safely?',
        answer: 'Yes, the client-side execution isolates regex evaluation with timeout safeguards to avoid freezing your browser tab.',
      },
      {
        question: 'Is any of my test data saved remotely?',
        answer: 'No, all pattern matching executes purely on your device.',
      },
    ],
    relatedTools: ['find-and-replace', 'html-css-js-minifier', 'jwt-decoder', 'uuid-generator'],
  },
  {
    slug: 'jwt-decoder',
    title: 'JWT Token Decoder & Expiry Checker',
    description: 'Decode JSON Web Tokens (JWT) online. Inspect Header, Payload, Claims, and expiration timestamps securely without sending tokens to any server.',
    category: 'developer',
    primaryKeyword: 'jwt decoder online',
    keywords: ['jwt decoder', 'decode jwt', 'jwt token viewer', 'json web token decoder', 'jwt expiration checker', 'jwt debugger'],
    icon: 'KeyRound',
    isPopular: true,
    content: {
      whatItIs: 'The JWT Token Decoder parses JSON Web Tokens (RFC 7519) into readable JSON components: Header (algorithm & token type), Payload (claims, user identity, permissions), and Signature validation status. It calculates exact expiration countdowns and issued-at dates.',
      howToUse: [
        'Paste your raw JWT string (e.g., `eyJhbGciOi...`) into the input field.',
        'View the automatically color-coded Header (red), Payload (purple), and Signature (cyan).',
        'Inspect formatted claim values, including expiration (exp) and issued-at (iat) human dates.',
        'Check the token validity banner to verify whether the token has expired.',
      ],
      useCases: [
        'Inspecting user roles, permissions, and scopes encoded inside OAuth2 / OIDC access tokens.',
        'Debugging authentication expiration issues in single-page applications (SPAs).',
        'Verifying microservice token issuer (iss) and audience (aud) claims.',
      ],
      tips: [
        'JWT tokens are Base64Url encoded, NOT encrypted; anyone can read their payload contents.',
        'Never store sensitive data like passwords or credit card numbers inside a JWT payload.',
        'Always verify signatures on your backend before trusting token claims.',
      ],
    },
    faq: [
      {
        question: 'Is it safe to paste production JWT tokens here?',
        answer: 'Yes! Unlike other online JWT debuggers that send your token to backend servers, our decoder runs 100% in your browser. Your authorization tokens are never transmitted across the network.',
      },
      {
        question: 'How do I know if my token has expired?',
        answer: 'The tool reads the `exp` claim and compares it to your current system clock, displaying a badge showing "Active" or "Expired" along with an exact countdown.',
      },
      {
        question: 'Can this tool verify the cryptographic signature?',
        answer: 'It verifies the structural integrity of the token and decodes the signature; cryptographic verification requires your private/public secret key.',
      },
      {
        question: 'What are standard claims like sub, iat, and exp?',
        answer: '`sub` identifies the subject (user ID), `iat` is the unix timestamp when the token was issued, and `exp` is the timestamp when it expires.',
      },
      {
        question: 'Does it support encrypted JWTs (JWE)?',
        answer: 'Standard JWTs (JWS) are supported. Encrypted tokens (JWE) require the decryption key to view ciphertext contents.',
      },
    ],
    relatedTools: ['base64-encoder-decoder', 'hash-generator', 'timestamp-converter', 'uuid-generator'],
  },
  {
    slug: 'uuid-generator',
    title: 'UUID / GUID Generator (v4 & v1)',
    description: 'Generate bulk UUIDs (Universally Unique Identifiers) and GUIDs online. Supports UUID v4 (random) and v1 (timestamp), uppercase, and hyphen options.',
    category: 'developer',
    primaryKeyword: 'uuid generator online',
    keywords: ['uuid generator', 'guid generator', 'uuid v4 generator', 'bulk uuid generator', 'generate guid online', 'random uuid'],
    icon: 'Fingerprint',
    isPopular: true,
    content: {
      whatItIs: 'The UUID / GUID Generator produces cryptographically secure Universally Unique Identifiers (UUID v4 and v1) compliant with RFC 4122. You can generate single IDs or batch generate thousands of unique keys with customized capitalization and hyphen formatting.',
      howToUse: [
        'Choose the UUID version: v4 (cryptographically random) or v1 (timestamp-based).',
        'Select the number of UUIDs to generate (1 to 1,000).',
        'Toggle formatting options: Uppercase, Hyphens, or Wrap in quotes/braces.',
        'Click "Generate" and copy the list to your clipboard.',
      ],
      useCases: [
        'Generating primary keys for database tables (PostgreSQL, MongoDB, MySQL).',
        'Creating unique transaction reference numbers, correlation IDs, and idempotent tokens.',
        'Mocking test fixtures and seed datasets for automated test suites.',
      ],
      tips: [
        'UUID v4 uses cryptographically secure random values via `crypto.getRandomValues()`.',
        'The probability of a collision in UUID v4 is so infinitesimally small (1 in 5.3 x 10^36) that it is virtually zero.',
        'Use hyphenated lowercase UUIDs for standard API and database compatibility.',
      ],
    },
    faq: [
      {
        question: 'Are UUIDs generated by this tool truly random?',
        answer: 'Yes! It utilizes the browser\'s native Web Crypto API (`window.crypto.getRandomValues`) for cryptographically secure pseudo-random number generation.',
      },
      {
        question: 'What is the difference between UUID and GUID?',
        answer: 'GUID (Globally Unique Identifier) is Microsoft\'s implementation of the RFC 4122 UUID standard; practically speaking, they refer to the same format.',
      },
      {
        question: 'Can I generate thousands of UUIDs at once?',
        answer: 'Yes, you can generate up to 1,000 UUIDs in a single batch and copy them with one click.',
      },
      {
        question: 'Can I generate UUIDs without hyphens?',
        answer: 'Yes, uncheck the "Include Hyphens" checkbox to produce 32-character continuous hexadecimal strings.',
      },
      {
        question: 'Does the tool log generated UUIDs?',
        answer: 'No. Everything is generated client-side and disappears when you leave the page.',
      },
    ],
    relatedTools: ['hash-generator', 'password-generator', 'base64-encoder-decoder', 'jwt-decoder'],
  },
  {
    slug: 'hash-generator',
    title: 'Hash Generator (SHA-256, SHA-512, MD5, SHA-1)',
    description: 'Generate cryptographic checksums and hashes online. Supports SHA-256, SHA-512, SHA-384, SHA-1, and MD5 via the Web Crypto API. Free & private.',
    category: 'developer',
    primaryKeyword: 'sha256 hash generator online',
    keywords: ['hash generator', 'sha256 generator', 'md5 hash generator', 'sha512 generator', 'cryptographic checksum', 'string hash online'],
    icon: 'Hash',
    isPopular: true,
    content: {
      whatItIs: 'The Cryptographic Hash Generator computes one-way cryptographic hash values and digital checksums for text strings and data inputs. It leverages the browser\'s high-speed Web Crypto API to generate SHA-256, SHA-512, SHA-384, SHA-1, and MD5 digests simultaneously.',
      howToUse: [
        'Type or paste your input text into the source field.',
        'All hashes (SHA-256, SHA-512, SHA-384, SHA-1, MD5) generate automatically in real-time.',
        'Toggle between Hexadecimal and Base64 output representations.',
        'Click the copy icon beside any algorithm to copy its hash digest.',
      ],
      useCases: [
        'Verifying file and software download integrity using checksums.',
        'Generating digital fingerprints and cache keys for software architecture.',
        'Comparing password hash representations and API authorization signatures.',
      ],
      tips: [
        'SHA-256 is the current industry standard for secure hashing and digital signatures.',
        'MD5 and SHA-1 should not be used for cryptographic security due to known collision vulnerabilities, but remain useful for legacy checksums.',
        'Cryptographic hashes are one-way functions; they cannot be decrypted back into original plain text.',
      ],
    },
    faq: [
      {
        question: 'What is a cryptographic hash function?',
        answer: 'A hash function is a mathematical algorithm that maps data of arbitrary size to a bit array of a fixed size. Any change to the input dramatically changes the output hash.',
      },
      {
        question: 'Can a hash be reversed or decrypted?',
        answer: 'No, cryptographic hashes are strictly one-way functions. They can only be checked by hashing candidate inputs and comparing results.',
      },
      {
        question: 'Is SHA-256 safe for production use?',
        answer: 'Yes, SHA-256 is a member of the SHA-2 family and is widely trusted by international security agencies and enterprise standards.',
      },
      {
        question: 'How fast is the hash generation?',
        answer: 'Hash computation is instantaneous because it uses hardware-accelerated Web Crypto API primitives directly on your device.',
      },
      {
        question: 'Is my input sent to any remote server?',
        answer: 'No. Your input never leaves your computer.',
      },
    ],
    relatedTools: ['uuid-generator', 'password-generator', 'base64-encoder-decoder', 'jwt-decoder'],
  },
  {
    slug: 'timestamp-converter',
    title: 'Unix Timestamp Epoch Converter',
    description: 'Convert Unix epoch timestamps (seconds and milliseconds) to human dates (UTC & Local) and vice versa. Includes live epoch clock and timezone converter.',
    category: 'developer',
    primaryKeyword: 'unix timestamp converter',
    keywords: ['timestamp converter', 'unix epoch converter', 'epoch to date', 'date to timestamp', 'unix time clock', 'epoch time online'],
    icon: 'Clock',
    isPopular: true,
    content: {
      whatItIs: 'The Unix Timestamp Epoch Converter converts between Unix epoch seconds/milliseconds and human-readable calendar dates in UTC, ISO 8601, and your local timezone. It features a ticking live epoch clock, relative time indicators ("3 hours ago"), and batch conversion.',
      howToUse: [
        'View the live ticking Unix epoch timestamp at the top.',
        'Enter an epoch number (in seconds or milliseconds) to convert to human date.',
        'Or pick a date and time from the calendar picker to convert to Unix timestamp.',
        'Copy your desired format: Unix Seconds, Milliseconds, UTC, ISO 8601, or Local Time.',
      ],
      useCases: [
        'Debugging backend database timestamps (PostgreSQL, MongoDB, Firebase).',
        'Inspecting expiration times in OAuth tokens, cookies, and cache headers.',
        'Converting server access logs and telemetry events for incident investigation.',
      ],
      tips: [
        'Unix epoch is the number of seconds that have elapsed since January 1, 1970 00:00:00 UTC.',
        '10-digit timestamps represent seconds; 13-digit timestamps represent milliseconds (common in JavaScript).',
        'Always check whether your backend expects seconds (Unix standard) or milliseconds (JS Date.now()).',
      ],
    },
    faq: [
      {
        question: 'What is Unix Epoch time?',
        answer: 'Unix epoch time is a system for tracking time as a running count of seconds elapsed since 00:00:00 UTC on January 1, 1970.',
      },
      {
        question: 'How do I know if my timestamp is in seconds or milliseconds?',
        answer: 'A timestamp with 10 digits is in seconds (e.g., 1700000000), while a 13-digit timestamp is in milliseconds (e.g., 1700000000000).',
      },
      {
        question: 'What is the Year 2038 problem?',
        answer: 'On January 19, 2038, 32-bit signed integers will overflow. Modern 64-bit systems handle timestamps billions of years into the future.',
      },
      {
        question: 'Does this converter account for daylight saving time (DST)?',
        answer: 'Yes, your local browser automatically computes exact daylight saving offsets according to your operating system timezone rules.',
      },
      {
        question: 'Can I generate a timestamp for right now?',
        answer: 'Yes, click "Current Time" to immediately populate the current epoch second and millisecond values.',
      },
    ],
    relatedTools: ['date-difference-calculator', 'cron-expression-explainer', 'jwt-decoder', 'stopwatch-timer'],
  },
  {
    slug: 'cron-expression-explainer',
    title: 'Cron Expression Generator & Explainer',
    description: 'Generate and translate Cron expressions into plain human-readable English. Preview upcoming execution schedule dates with zero signup.',
    category: 'developer',
    primaryKeyword: 'cron expression generator',
    keywords: ['cron expression', 'cron generator', 'cron schedule explainer', 'crontab generator', 'cron human readable', 'cron syntax'],
    icon: 'CalendarClock',
    isPopular: false,
    content: {
      whatItIs: 'The Cron Expression Generator & Explainer translates complex 5-part and 6-part cron syntax into plain English. Build automated job schedules visually using dropdown selectors or paste existing crontab strings to inspect future trigger dates.',
      howToUse: [
        'Enter or build your cron expression (e.g., `*/15 * * * *` or `0 2 * * 1-5`).',
        'Read the instant English translation of the schedule.',
        'Inspect the upcoming execution times table to verify scheduled occurrences.',
        'Copy the verified expression or standard crontab command.',
      ],
      useCases: [
        'Configuring scheduled GitHub Actions workflows and AWS CloudWatch Events.',
        'Scheduling database backups, report exports, and cron jobs on Linux servers.',
        'Validating periodic Celery or BullMQ queue tasks in backend services.',
      ],
      tips: [
        'Standard Unix cron has 5 fields: Minute, Hour, Day of Month, Month, Day of Week.',
        'Use asterisk (*) for "every", comma (,) for lists, hyphen (-) for ranges, and slash (/) for step values.',
        'Remember that Sunday can be represented as either 0 or 7 in most cron implementations.',
      ],
    },
    faq: [
      {
        question: 'What do the 5 fields of a cron expression mean?',
        answer: 'From left to right: Minute (0-59), Hour (0-23), Day of the month (1-31), Month (1-12), and Day of the week (0-7, where 0 and 7 are Sunday).',
      },
      {
        question: 'How do I run a job every 15 minutes?',
        answer: 'Use the expression `*/15 * * * *`.',
      },
      {
        question: 'How do I run a job every weekday at 9:00 AM?',
        answer: 'Use the expression `0 9 * * 1-5`.',
      },
      {
        question: 'Can I view the next 5 times my cron job will run?',
        answer: 'Yes! The schedule preview box computes the exact upcoming execution dates based on your expression.',
      },
      {
        question: 'Is any schedule data sent to external servers?',
        answer: 'No. All cron parsing and date projections happen client-side.',
      },
    ],
    relatedTools: ['timestamp-converter', 'date-difference-calculator', 'regex-tester', 'stopwatch-timer'],
  },
  {
    slug: 'color-converter',
    title: 'Color Converter (HEX, RGB, HSL, CMYK)',
    description: 'Convert colors between HEX, RGB, HSL, HSV, and CMYK formats. Includes live color picker, contrast checker, and CSS code export.',
    category: 'developer',
    primaryKeyword: 'hex to rgb color converter',
    keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'hex to hsl', 'color picker online', 'cmyk to rgb', 'css color codes'],
    icon: 'Palette',
    isPopular: true,
    content: {
      whatItIs: 'The Color Converter transforms color codes across HEX, RGB, HSL, HSV, and CMYK models in real-time. It features an interactive visual spectrum picker, alpha transparency support, WCAG color contrast validation against light and dark backgrounds, and one-click CSS code copy.',
      howToUse: [
        'Enter a color in any format (e.g., `#6366f1`, `rgb(99, 102, 241)`, or `hsl(239, 84%, 67%)`).',
        'Or click the interactive color swatch to visually pick your hue and saturation.',
        'Inspect all converted color values instantly in the synchronized table.',
        'Click the copy icon next to any format to copy its CSS-ready string.',
      ],
      useCases: [
        'Translating design mockups (Figma, Sketch) into production CSS and Tailwind configs.',
        'Converting print CMYK specifications into digital RGB and HEX formats.',
        'Testing color accessibility and text contrast ratios for WCAG AA compliance.',
      ],
      tips: [
        'HEX codes are 6 characters (or 8 with alpha); 3-character shortcuts double each digit (#fff = #ffffff).',
        'HSL (Hue, Saturation, Lightness) is the most intuitive format for programmatic color tweaking and hover states.',
        'Ensure a minimum contrast ratio of 4.5:1 for normal body text to meet WCAG AA standards.',
      ],
    },
    faq: [
      {
        question: 'What is the advantage of HSL over RGB?',
        answer: 'HSL allows you to easily adjust brightness (lightness) or color intensity (saturation) without altering the core hue, making it ideal for creating hover and active design states.',
      },
      {
        question: 'Can I input 8-digit HEX codes with transparency?',
        answer: 'Yes! The converter supports alpha channels across all formats, including HEX8, RGBA, and HSLA.',
      },
      {
        question: 'How accurate is CMYK conversion?',
        answer: 'It uses standard mathematical color profile transformations suitable for screen design and preliminary print estimation.',
      },
      {
        question: 'Does this tool check accessibility contrast ratios?',
        answer: 'Yes, it displays the contrast ratio against both white and black backgrounds alongside WCAG pass/fail indicators.',
      },
      {
        question: 'Are color history selections saved?',
        answer: 'Your recent color picks are remembered in your browser memory for quick reference.',
      },
    ],
    relatedTools: ['css-gradient-generator', 'box-shadow-generator', 'color-picker-image', 'html-css-js-minifier'],
  },
  {
    slug: 'css-gradient-generator',
    title: 'CSS Gradient Generator (Linear & Radial)',
    description: 'Create beautiful CSS gradients visually. Customize color stops, angles, radial shapes, and copy clean cross-browser CSS code instantly.',
    category: 'developer',
    primaryKeyword: 'css gradient generator',
    keywords: ['css gradient generator', 'linear gradient generator', 'radial gradient', 'gradient maker online', 'css background gradient', 'mesh gradient'],
    icon: 'Layers',
    isPopular: false,
    content: {
      whatItIs: 'The CSS Gradient Generator allows designers and frontend developers to craft linear and radial CSS background gradients with an intuitive visual editor. Add multiple color stops, adjust directional angles, blend modes, and copy ready-to-use CSS code.',
      howToUse: [
        'Choose gradient type: Linear or Radial.',
        'Adjust the directional angle (0° to 360°) or radial shape position.',
        'Click the gradient slider bar to add or remove color stops, and customize their colors.',
        'Click "Copy CSS" to grab the production-ready code with vendor prefixes.',
      ],
      useCases: [
        'Designing modern hero section backgrounds, buttons, and card accents for websites.',
        'Creating smooth subtle aesthetic overlays for typography and branding graphics.',
        'Exporting Tailwind CSS or standard CSS background rules for UI development.',
      ],
      tips: [
        'Pair colors that sit adjacent on the color wheel for smooth, natural blending without muddy gray zones.',
        'Diagonal angles like 135deg or 45deg feel more dynamic than flat horizontal or vertical lines.',
        'Use semi-transparent color stops to layer gradients over photographs or textures.',
      ],
    },
    faq: [
      {
        question: 'How many color stops can I add?',
        answer: 'You can add as many color stops as you need; simply click anywhere on the gradient slider bar to insert a new stop.',
      },
      {
        question: 'Is the generated CSS compatible with all modern browsers?',
        answer: 'Yes, standard `linear-gradient()` and `radial-gradient()` syntax is universally supported across all modern browsers.',
      },
      {
        question: 'Can I copy Tailwind CSS classes directly?',
        answer: 'Yes! The generator provides both standard CSS `background: ...` declarations and Tailwind arbitrary value classes.',
      },
      {
        question: 'Are there curated gradient presets available?',
        answer: 'Yes, a curated library of trending UI gradients is included for one-click loading.',
      },
      {
        question: 'Does the tool operate offline?',
        answer: 'Yes, all visual rendering and CSS code generation execute client-side in your browser.',
      },
    ],
    relatedTools: ['color-converter', 'box-shadow-generator', 'color-picker-image', 'html-css-js-minifier'],
  },
  {
    slug: 'box-shadow-generator',
    title: 'CSS Box Shadow Generator',
    description: 'Design smooth CSS box shadows visually. Customize horizontal offset, vertical offset, blur, spread, color, and inset mode. Copy CSS instantly.',
    category: 'developer',
    primaryKeyword: 'css box shadow generator',
    keywords: ['box shadow generator', 'css shadow generator', 'drop shadow generator', 'css box shadow maker', 'smooth shadow generator', 'inset shadow'],
    icon: 'Box',
    isPopular: false,
    content: {
      whatItIs: 'The CSS Box Shadow Generator is an interactive visual tool to create realistic depth and elevation for UI elements. Configure horizontal and vertical offsets, blur radius, spread distance, shadow color, opacity, and toggle inset shadows with immediate real-time preview.',
      howToUse: [
        'Adjust the sliders for X-offset, Y-offset, Blur radius, and Spread radius.',
        'Select the shadow color and adjust opacity for realistic softness.',
        'Toggle the "Inset" checkbox if you want an internal shadow effect.',
        'Copy the generated `box-shadow` CSS property to your clipboard.',
      ],
      useCases: [
        'Designing elevated card components, modals, and dropdown navigation menus.',
        'Creating subtle Neumorphic or skeuomorphic UI button press states with inset shadows.',
        'Layering multiple smooth shadows for natural ambient light styling.',
      ],
      tips: [
        'For realistic physical lighting, use a slight vertical Y-offset (e.g. 4px–12px) with zero or small horizontal X-offset.',
        'Use low-opacity black shadows (10% to 15% opacity) for subtle, professional modern UI design.',
        'Larger blur radii with negative spread produce elegant diffused elevation without harsh borders.',
      ],
    },
    faq: [
      {
        question: 'What is the spread property in CSS box-shadow?',
        answer: 'The spread radius increases or decreases the size of the shadow relative to the element before blur is applied; positive values expand the shadow, while negative values shrink it.',
      },
      {
        question: 'What is an inset shadow?',
        answer: 'An inset shadow is drawn inside the border of the element rather than outside, creating an embossed, recessed, or pressed-down visual appearance.',
      },
      {
        question: 'Can I generate multiple layered shadows?',
        answer: 'Yes! Layering multiple soft shadows with varying blur radiuses produces ultra-smooth shadows inspired by physical lighting.',
      },
      {
        question: 'Is box-shadow supported on mobile browsers?',
        answer: 'Yes, CSS box-shadow has 100% universal support across all desktop and mobile browsers.',
      },
      {
        question: 'Can I preview dark mode contrast?',
        answer: 'Yes, you can toggle the preview background between light and dark backgrounds to test shadow visibility.',
      },
    ],
    relatedTools: ['css-gradient-generator', 'color-converter', 'html-css-js-minifier', 'regex-tester'],
  },
];
