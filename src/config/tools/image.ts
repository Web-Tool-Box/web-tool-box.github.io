import { ToolDefinition } from '@/types/tool';

export const imageTools: ToolDefinition[] = [
  {
    slug: 'image-compressor',
    title: 'In-Browser Image Compressor',
    description: 'Compress PNG, JPG, and WebP images directly in your browser. Reduce file size up to 90% without losing visual quality. 100% private.',
    category: 'image',
    primaryKeyword: 'compress image online free',
    keywords: ['image compressor', 'compress png online', 'compress jpg', 'reduce image size', 'compress webp', 'photo size reducer'],
    icon: 'Minimize2',
    isPopular: true,
    content: {
      whatItIs: 'The In-Browser Image Compressor optimizes digital photographs and web graphics using HTML5 Canvas and browser compression algorithms. It achieves dramatic file size reductions (up to 85–90%) while preserving sharp visual fidelity, all without uploading a single photo to any external server.',
      howToUse: [
        'Drag and drop your image (PNG, JPG, WebP) or click "Select Image".',
        'Adjust the quality slider (e.g. 75% to 85% provides the optimal balance of quality and size).',
        'Compare original vs compressed size and reduction percentage in real time.',
        'Click "Download Compressed Image" to save the optimized file instantly.',
      ],
      useCases: [
        'Optimizing blog post images to speed up page load times and improve Core Web Vitals (LCP).',
        'Downsizing photo attachments for email clients with strict attachment limits.',
        'Preparing digital resumes, passport photos, and application forms with maximum file size restrictions.',
      ],
      tips: [
        'Converting photographic PNGs to WebP or high-quality JPG yields massive size savings.',
        'An 80% compression level is virtually indistinguishable from 100% to the human eye.',
        'For vector-like graphics with text and transparency, keep PNG or convert to WebP.',
      ],
    },
    faq: [
      {
        question: 'Is my photo uploaded to a server?',
        answer: 'No! All compression is computed client-side using your computer\'s canvas rendering engine. Your private photos never leave your device.',
      },
      {
        question: 'Which image formats are supported?',
        answer: 'You can compress JPEG/JPG, PNG, WebP, and AVIF (in supported modern browsers).',
      },
      {
        question: 'Will compression degrade image resolution?',
        answer: 'Image dimensions (pixel width and height) remain identical; compression optimizes color quantization and metadata to shrink file size.',
      },
      {
        question: 'Can I compress multiple images?',
        answer: 'Yes, you can compress images sequentially and download each optimized file immediately.',
      },
      {
        question: 'What is the recommended compression quality?',
        answer: '75% to 85% is the sweet spot for web graphics, delivering 60-80% size savings with zero noticeable visual artifacts.',
      },
    ],
    relatedTools: ['image-resizer', 'image-format-converter', 'image-cropper', 'image-to-base64'],
  },
  {
    slug: 'image-resizer',
    title: 'Image Resizer Online',
    description: 'Resize images by pixels or percentage in your browser. Lock aspect ratio, maintain crisp image quality, and export to PNG, JPG, or WebP.',
    category: 'image',
    primaryKeyword: 'resize image online free',
    keywords: ['image resizer', 'resize picture', 'change image dimensions', 'resize photo online', 'scale image pixels', 'aspect ratio resizer'],
    icon: 'Maximize2',
    isPopular: true,
    content: {
      whatItIs: 'The Image Resizer lets you scale images to custom pixel dimensions (width x height) or percentage scales with high-precision bicubic canvas interpolation. Maintain exact aspect ratios, fit social media templates, and download instantly.',
      howToUse: [
        'Upload your image by dragging it into the drop zone.',
        'Enter your target Width and Height in pixels, or choose a percentage scale (e.g. 50%).',
        'Keep "Lock Aspect Ratio" checked to prevent image stretching or distortion.',
        'Preview the resized image and click "Download Resized Image".',
      ],
      useCases: [
        'Resizing photos to exact banner dimensions for YouTube, Twitter/X, and LinkedIn.',
        'Downscaling 4K camera photos to reasonable dimensions for web publishing.',
        'Standardizing product photo dimensions for e-commerce stores.',
      ],
      tips: [
        'Always maintain aspect ratio to prevent unnatural horizontal or vertical stretching.',
        'Downscaling images produces crisp results; upscaling beyond native resolution will introduce softness.',
        'Use the preset buttons for quick social media dimensions (1200x630 for OpenGraph, 1080x1080 for Instagram).',
      ],
    },
    faq: [
      {
        question: 'How does client-side resizing work?',
        answer: 'The tool uses the browser\'s hardware-accelerated Canvas 2D API to render the source bitmap at target dimensions with smooth bilinear filtering.',
      },
      {
        question: 'Are my photos stored anywhere?',
        answer: 'No. The image is processed in your device\'s local RAM and discarded upon leaving the page.',
      },
      {
        question: 'Can I resize by percentage?',
        answer: 'Yes, you can scale by 25%, 50%, 75%, 200%, or enter a custom percentage.',
      },
      {
        question: 'What happens if I unlock the aspect ratio?',
        answer: 'Unlocking aspect ratio lets you set width and height independently, though it may stretch your image if proportions differ.',
      },
      {
        question: 'Is there a file size limit?',
        answer: 'You can resize images up to several thousand pixels wide with ease on modern devices.',
      },
    ],
    relatedTools: ['image-compressor', 'image-cropper', 'image-format-converter', 'favicon-generator'],
  },
  {
    slug: 'image-cropper',
    title: 'Image Cropper Online',
    description: 'Crop images online with freeform or fixed aspect ratios (1:1, 16:9, 4:3, 9:16). Fast, intuitive canvas cropping with instant high-res export.',
    category: 'image',
    primaryKeyword: 'crop image online free',
    keywords: ['image cropper', 'crop picture', 'photo cropper', 'crop image 16:9', 'crop square photo', 'online photo crop'],
    icon: 'Crop',
    isPopular: false,
    content: {
      whatItIs: 'The Image Cropper provides an interactive visual crop frame to trim unwanted borders, focus on subjects, and fit standard social media aspect ratios (Square 1:1, Landscape 16:9, Portrait 9:16, Classic 4:3).',
      howToUse: [
        'Upload your photo from your device.',
        'Select an aspect ratio preset (1:1, 16:9, 4:3, 9:16) or choose Freeform.',
        'Drag the crop handles to frame your desired area.',
        'Click "Crop Image" and download the cropped photo in full resolution.',
      ],
      useCases: [
        'Creating square 1:1 profile avatars for Instagram, Discord, and Slack.',
        'Cropping landscape photos into 16:9 for YouTube video thumbnails and blog headers.',
        'Removing distracting background elements from personal or product photographs.',
      ],
      tips: [
        'Follow the rule of thirds when cropping portraits to position focal points dynamically.',
        'Use fixed 1:1 ratio for profile pictures to ensure they display neatly inside circular UI avatars.',
        'Cropping before resizing saves processing power and preserves maximum subject detail.',
      ],
    },
    faq: [
      {
        question: 'Does cropping reduce the resolution of the remaining area?',
        answer: 'No, the cropped section retains 100% of its native pixel quality from the original image.',
      },
      {
        question: 'Which aspect ratio should I use for Instagram?',
        answer: 'Use 1:1 for square grid posts, 4:5 for portrait feed posts, and 9:16 for Stories and Reels.',
      },
      {
        question: 'Can I crop without fixing an aspect ratio?',
        answer: 'Yes, select "Freeform" to freely adjust width and height to any custom boundary.',
      },
      {
        question: 'Is my uploaded photo kept private?',
        answer: 'Yes, 100% client-side execution ensures your photos never touch any server.',
      },
      {
        question: 'Can I undo or adjust my crop before downloading?',
        answer: 'Yes, you can re-drag the crop box or reset at any time before downloading.',
      },
    ],
    relatedTools: ['image-resizer', 'image-compressor', 'favicon-generator', 'image-format-converter'],
  },
  {
    slug: 'image-format-converter',
    title: 'Image Format Converter (PNG, JPG, WebP)',
    description: 'Convert images between PNG, JPG, and WebP formats in your browser. Fast, batch-ready conversion with transparency and quality controls.',
    category: 'image',
    primaryKeyword: 'convert image format online',
    keywords: ['image format converter', 'png to jpg', 'jpg to png', 'png to webp', 'convert photo format', 'webp converter online'],
    icon: 'RefreshCw',
    isPopular: true,
    content: {
      whatItIs: 'The Image Format Converter seamlessly changes image container formats among WebP, PNG, and JPEG. Convert modern WebP files to universal JPEG for presentations, convert PNGs to WebP for Google PageSpeed optimization, or preserve transparency in PNG format.',
      howToUse: [
        'Upload your source image (PNG, JPG, WebP, GIF, BMP).',
        'Select your desired output format: WebP, PNG, or JPEG.',
        'Adjust the quality setting if selecting JPEG or WebP.',
        'Click "Convert & Download" to get your converted file immediately.',
      ],
      useCases: [
        'Converting downloaded WebP images to JPG for software that doesn\'t yet support WebP.',
        'Converting bulky PNG screenshots to lightweight WebP files for web publishing.',
        'Removing transparency by converting transparent PNGs into solid white-background JPEGs.',
      ],
      tips: [
        'WebP offers 25–35% smaller file sizes than JPEG at equivalent visual quality.',
        'PNG is lossless and supports alpha transparency, ideal for logos and UI graphics.',
        'JPEG does not support transparency; transparent areas will be filled with white background.',
      ],
    },
    faq: [
      {
        question: 'Why convert PNG to WebP?',
        answer: 'WebP provides both lossy and lossless compression with alpha transparency, cutting file sizes by 30-50% and dramatically boosting Google Core Web Vitals.',
      },
      {
        question: 'Can I convert WebP images back to JPG or PNG?',
        answer: 'Yes! You can convert any WebP file to standard JPG or PNG for compatibility with older image viewers.',
      },
      {
        question: 'What happens to transparency when converting PNG to JPG?',
        answer: 'Because JPEG doesn\'t support transparency, any transparent pixels are automatically rendered on a clean white background.',
      },
      {
        question: 'Are my images uploaded to a cloud service?',
        answer: 'No. The conversion is performed locally via your browser\'s canvas rendering engine.',
      },
      {
        question: 'Does converting reduce image quality?',
        answer: 'Converting to PNG is 100% lossless. When converting to JPG or WebP, you can set quality to 95%+ for indistinguishable results.',
      },
    ],
    relatedTools: ['image-compressor', 'image-to-base64', 'image-resizer', 'favicon-generator'],
  },
  {
    slug: 'image-to-base64',
    title: 'Image to Base64 Data URI Converter',
    description: 'Convert images (PNG, JPG, WebP, SVG) into Base64 Data URIs online. Copy ready-to-use HTML <img> tags, CSS background-image code, or raw Base64.',
    category: 'image',
    primaryKeyword: 'image to base64 converter',
    keywords: ['image to base64', 'base64 image converter', 'image data uri', 'png to base64', 'embed image css base64', 'photo to base64 string'],
    icon: 'FileImage',
    isPopular: false,
    content: {
      whatItIs: 'The Image to Base64 Data URI Converter encodes visual image files into ASCII Base64 data strings. Embed small icons, logos, and textures directly into HTML `<img src="data:image/png;base64,...">` tags or CSS stylesheets to eliminate additional HTTP network requests.',
      howToUse: [
        'Upload or drag and drop any image file.',
        'The tool instantly generates the Base64 Data URI string.',
        'Choose your desired format: Raw Base64, Full Data URI, HTML <img> tag, or CSS background-image.',
        'Click the copy button to copy the snippet to your clipboard.',
      ],
      useCases: [
        'Inlining critical micro-assets and icons into HTML emails to prevent broken external image links.',
        'Embedding UI icons inside CSS files for single-file component distribution.',
        'Storing image thumbnails directly inside JSON documents and SQLite database records.',
      ],
      tips: [
        'Base64 increases binary file size by ~33%; only use it for small assets (under 10KB–20KB).',
        'Inlining critical above-the-fold icons can eliminate render-blocking HTTP round trips.',
        'For large photos, serve regular WebP/JPG files with proper caching headers instead of Base64.',
      ],
    },
    faq: [
      {
        question: 'What is a Data URI?',
        answer: 'A Data URI is a scheme that allows small data items to be included inline in URLs, prefixed with `data:[mediatype];base64,[data]`.',
      },
      {
        question: 'Why does Base64 increase file size?',
        answer: 'Base64 represents 3 binary bytes as 4 ASCII characters, resulting in a mathematical ~33% overhead in payload size.',
      },
      {
        question: 'Can I decode a Base64 string back to an image?',
        answer: 'Yes! You can paste a Base64 Data URI into the previewer to decode and download the original image.',
      },
      {
        question: 'Does this tool support SVGs?',
        answer: 'Yes, SVG vector files can be converted to Base64 Data URIs just like bitmap images.',
      },
      {
        question: 'Is my image data kept confidential?',
        answer: 'Yes, the FileReader API encodes the file entirely on your local machine; nothing is sent across the web.',
      },
    ],
    relatedTools: ['base64-encoder-decoder', 'image-format-converter', 'color-picker-image', 'qr-code-generator'],
  },
  {
    slug: 'color-picker-image',
    title: 'Color Picker from Image',
    description: 'Extract HEX, RGB, and HSL colors from any image. Features an interactive loupe magnifying glass eyedropper and automatic dominant palette generator.',
    category: 'image',
    primaryKeyword: 'color picker from image online',
    keywords: ['color picker from image', 'extract colors from photo', 'image palette generator', 'eyedropper tool online', 'get hex code from image'],
    icon: 'Pipette',
    isPopular: true,
    content: {
      whatItIs: 'The Color Picker from Image allows you to sample exact pixel colors from any photograph or design asset. Hover over the canvas with the magnifying loupe eyedropper to inspect pixel-perfect colors, or automatically extract the dominant 6-color palette.',
      howToUse: [
        'Upload your image or paste it directly from your clipboard.',
        'Move your cursor over the image to preview magnified pixels.',
        'Click anywhere on the image to sample the color at that exact coordinate.',
        'Copy the sampled color in HEX, RGB, or HSL format, or explore the auto-extracted color palette.',
      ],
      useCases: [
        'Matching website background and accent colors to brand photography.',
        'Extracting color palettes from nature photos, fashion designs, and architecture.',
        'Inspecting anti-aliasing color transitions and icon rendering fidelity.',
      ],
      tips: [
        'Use the magnifying glass to ensure you select the core color rather than an anti-aliased edge pixel.',
        'Paste screenshots directly into the browser using Ctrl+V / Cmd+V for rapid sampling.',
        'Save dominant color swatches to build cohesive CSS design systems.',
      ],
    },
    faq: [
      {
        question: 'Can I paste an image directly from my clipboard?',
        answer: 'Yes! Simply press Ctrl+V (or Cmd+V on Mac) while on the page to paste screenshots immediately.',
      },
      {
        question: 'How does the dominant palette generator work?',
        answer: 'It quantizes image pixels using k-means clustering to identify the most prominent color families in the image.',
      },
      {
        question: 'Can I copy both HEX and RGB codes?',
        answer: 'Yes, every sampled color includes one-click copy buttons for HEX (#ffffff), RGB (255, 255, 255), and HSL.',
      },
      {
        question: 'Does the eyedropper work on retina / high-DPI displays?',
        answer: 'Yes, the canvas coordinates are normalized to physical image pixels for 100% precision regardless of device scale factor.',
      },
      {
        question: 'Are my uploaded images kept secure?',
        answer: 'Absolutely. Images are rendered on an in-memory HTML5 Canvas and never transmitted to any server.',
      },
    ],
    relatedTools: ['color-converter', 'css-gradient-generator', 'image-compressor', 'favicon-generator'],
  },
  {
    slug: 'favicon-generator',
    title: 'Favicon Generator Online',
    description: 'Generate multi-size favicons (16x16, 32x32, 48x48, 180x180 Apple Touch, 512x512 PWA) from any image or text/emoji. Free & instant ZIP download.',
    category: 'image',
    primaryKeyword: 'favicon generator online',
    keywords: ['favicon generator', 'create favicon', 'ico generator', 'apple touch icon generator', 'pwa icon generator', 'favicon maker'],
    icon: 'Sparkle',
    isPopular: true,
    content: {
      whatItIs: 'The Favicon Generator creates a complete, production-ready favicon package for modern browsers, iOS Apple Touch devices, Android, and Progressive Web Apps (PWAs). Upload a logo or create a crisp emoji/text icon, and download all required PNG sizes and HTML tags.',
      howToUse: [
        'Upload your logo image, or enter an emoji / letter with custom background color.',
        'Preview how your favicon looks in simulated browser tabs and mobile home screens.',
        'Download individual sizes (16x16, 32x32, 180x180, 512x512) or the complete ZIP bundle.',
        'Copy the pre-configured HTML `<link>` tags into your website\'s `<head>` section.',
      ],
      useCases: [
        'Setting up branding icons for new Next.js, WordPress, Shopify, or static websites.',
        'Creating high-resolution 180x180 Apple Touch icons for iOS Home Screen bookmarking.',
        'Generating 192x192 and 512x512 icons for PWA manifest.json compliance.',
      ],
      tips: [
        'Start with a square image of at least 512x512 pixels for the sharpest output across all scales.',
        'Keep favicon designs simple and high-contrast so they remain recognizable at 16x16 pixels.',
        'Include both `favicon.ico` (for legacy browsers) and `apple-touch-icon.png` in your site root.',
      ],
    },
    faq: [
      {
        question: 'Which sizes are included in the generated package?',
        answer: 'It includes 16x16 (classic browser tab), 32x32 (standard tab/retina), 48x48 (Windows desktop), 180x180 (Apple Touch Icon), 192x192 (Android PWA), and 512x512 (PWA splash screen).',
      },
      {
        question: 'Can I generate a favicon from an emoji?',
        answer: 'Yes! You can choose any emoji, pick a background color and corner radius, and generate a crisp vector-like favicon in seconds.',
      },
      {
        question: 'Where do I put the favicon files on my website?',
        answer: 'Place them in your website\'s `public/` or root directory, and paste the provided `<link>` snippet into your HTML `<head>`.',
      },
      {
        question: 'Are transparent PNGs supported?',
        answer: 'Yes, transparency is fully preserved across all generated PNG sizes.',
      },
      {
        question: 'Does generating favicons upload my logo to a server?',
        answer: 'No. Canvas rendering and ZIP packaging happen entirely inside your browser.',
      },
    ],
    relatedTools: ['image-resizer', 'image-cropper', 'meta-tag-generator', 'image-format-converter'],
  },
  {
    slug: 'qr-code-generator',
    title: 'Custom QR Code Generator',
    description: 'Generate high-resolution QR codes for URLs, WiFi networks, text, emails, and vCards. Customize colors, error correction, and download PNG/SVG.',
    category: 'image',
    primaryKeyword: 'free qr code generator online',
    keywords: ['qr code generator', 'create qr code', 'free qr code maker', 'custom qr code', 'wifi qr code generator', 'qr code svg download'],
    icon: 'QrCode',
    isPopular: true,
    content: {
      whatItIs: 'The Custom QR Code Generator creates scan-ready 2D barcodes for website URLs, WiFi login credentials, plain text, email messages, phone numbers, and vCard contact cards. Customize foreground and background colors, adjust error correction levels, and export in high-res PNG or vector SVG.',
      howToUse: [
        'Select your QR code type (URL, Plain Text, WiFi Network, Email, or Phone).',
        'Enter your information into the fields.',
        'Customize colors (Foreground / Background) and Error Correction Level (L, M, Q, H).',
        'Download your QR code in crisp PNG or scalable SVG format.',
      ],
      useCases: [
        'Creating scannable WiFi QR codes for guests and office visitors to connect without typing passwords.',
        'Printing QR codes on business cards, restaurant menus, product packaging, and event banners.',
        'Directing marketing traffic to mobile landing pages, app stores, and campaign URLs.',
      ],
      tips: [
        'Always ensure high color contrast (dark foreground on light background) for reliable camera scanning.',
        'Use High (H) error correction if you plan to overlay a logo or if the code may get scuffed or partially obscured.',
        'Test your generated QR code with both iOS and Android cameras before printing large batches.',
      ],
    },
    faq: [
      {
        question: 'Do these QR codes ever expire?',
        answer: 'Never! These are static QR codes that encode your data directly into the visual pattern. They function indefinitely without third-party redirection.',
      },
      {
        question: 'What is QR code error correction?',
        answer: 'Error correction allows a QR code to remain readable even if it is partially damaged or obscured. Level H allows up to 30% damage tolerance.',
      },
      {
        question: 'Can I generate a WiFi QR code?',
        answer: 'Yes! Select the WiFi tab, enter your network SSID and password, and devices can scan to connect automatically.',
      },
      {
        question: 'Can I download vector SVG for professional printing?',
        answer: 'Yes, SVG format can be scaled infinitely to billboard sizes without any pixelation.',
      },
      {
        question: 'Is my data tracked or recorded?',
        answer: 'No. The QR matrix is plotted client-side; no scan telemetry or private data is ever logged.',
      },
    ],
    relatedTools: ['qr-code-scanner', 'utm-link-builder', 'url-encoder-decoder', 'image-compressor'],
  },
];
