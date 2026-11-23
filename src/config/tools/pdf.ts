import { ToolDefinition } from '@/types/tool';

export const pdfTools: ToolDefinition[] = [
  {
    slug: 'pdf-merge',
    title: 'Merge PDF Files Online',
    description: 'Combine multiple PDF documents into a single PDF file in seconds. Drag-and-drop reordering, 100% private in-browser processing via pdf-lib.',
    category: 'pdf',
    primaryKeyword: 'merge pdf files online free',
    keywords: ['merge pdf', 'combine pdf', 'join pdf files', 'pdf merger online', 'merge pdf no limit', 'merge pdf private'],
    icon: 'Combine',
    isPopular: true,
    content: {
      whatItIs: 'The Merge PDF Files utility combines two or more individual PDF documents into one organized, unified PDF file. Engineered with the high-performance client-side `pdf-lib` engine, it processes your confidential tax returns, bank statements, and legal contracts entirely within your browser memory without uploading a single page.',
      howToUse: [
        'Select or drag and drop your PDF files into the upload zone.',
        'Reorder documents using drag handles or up/down arrow buttons.',
        'Review the page count and file size summary for each document.',
        'Click "Merge PDFs" and instantly download your merged PDF document.',
      ],
      useCases: [
        'Combining monthly financial statements, receipts, and invoices for tax reporting.',
        'Merging job application cover letters, resumes, and academic certificates into one dossier.',
        'Assembling legal affidavits, addendums, and exhibits into a single court filing.',
      ],
      tips: [
        'Drag the file cards to arrange the exact page sequence before merging.',
        'Because processing runs on your local machine, there are zero artificial file size restrictions.',
        'Ensure none of the input PDFs are password-protected before merging.',
      ],
    },
    faq: [
      {
        question: 'Are my confidential documents uploaded to your servers?',
        answer: 'Never! Merging is performed directly in your browser using WebAssembly and pure client-side JavaScript (`pdf-lib`). Your files never leave your device.',
      },
      {
        question: 'Is there a limit on how many PDFs I can merge?',
        answer: 'There are no artificial limits. You can combine 2, 10, or 50+ documents as long as your computer has available memory.',
      },
      {
        question: 'Does merging alter original document formatting or links?',
        answer: 'No, all vector typography, embedded fonts, graphics, annotations, and hyperlinks are faithfully preserved.',
      },
      {
        question: 'Can I reorder the files before merging?',
        answer: 'Yes! Use the intuitive drag-and-drop handles or arrow controls to set your desired document order.',
      },
      {
        question: 'Can I merge on mobile devices?',
        answer: 'Yes, our responsive interface works seamlessly across iOS Safari, Android Chrome, and modern desktop browsers.',
      },
    ],
    relatedTools: ['pdf-split', 'images-to-pdf', 'pdf-compress', 'image-compressor'],
  },
  {
    slug: 'pdf-split',
    title: 'Split PDF Pages Online',
    description: 'Split PDF files into individual pages or extract specific page ranges (e.g. 1-3, 5, 8-10). 100% client-side privacy with instant download.',
    category: 'pdf',
    primaryKeyword: 'split pdf pages online free',
    keywords: ['split pdf', 'extract pdf pages', 'separate pdf pages', 'cut pdf online', 'pdf splitter free', 'split pdf private'],
    icon: 'Scissors',
    isPopular: true,
    content: {
      whatItIs: 'The Split PDF Pages tool extracts designated pages or splits multi-page documents into smaller standalone PDF files. Whether you need to pull out a single signed page or slice a 100-page manual into specific chapters, this tool executes the extraction locally in your browser.',
      howToUse: [
        'Upload your PDF file by dragging it into the drop zone.',
        'Choose your split mode: "Extract Page Range" (e.g. `1-3, 5, 7-10`) or "Split Every Page".',
        'Preview detected total page counts and target ranges.',
        'Click "Split & Download" to get your extracted PDF documents.',
      ],
      useCases: [
        'Extracting specific agreement signature pages to forward to clients or escrow.',
        'Separating specific chapters from large eBooks, study guides, or whitepapers.',
        'Deleting sensitive or irrelevant pages from medical records and contracts.',
      ],
      tips: [
        'Use commas to separate distinct page numbers and hyphens for continuous ranges (e.g., `1, 3-5, 9`).',
        'Page numbering starts at 1, matching the standard page numbers displayed in PDF viewers.',
        'All extracted pages maintain original DPI resolution, text searchability, and formatting.',
      ],
    },
    faq: [
      {
        question: 'How do I specify which pages to extract?',
        answer: 'Enter individual page numbers separated by commas, or ranges using hyphens (e.g., "1-4, 8, 12-15").',
      },
      {
        question: 'Can I split every page into a separate PDF file?',
        answer: 'Yes, select "Split Every Page" to generate a separate PDF for each individual page.',
      },
      {
        question: 'Does this tool compromise document confidentiality?',
        answer: 'Not at all. Processing executes purely inside your web browser; no document data ever travels over the internet.',
      },
      {
        question: 'Does splitting reduce the quality of the pages?',
        answer: 'No, page extraction is lossless. Embedded fonts, vector outlines, and images remain completely untouched.',
      },
      {
        question: 'Does it work with scanned PDF documents?',
        answer: 'Yes, both digital vector PDFs and scanned image PDFs are fully supported.',
      },
    ],
    relatedTools: ['pdf-merge', 'images-to-pdf', 'pdf-compress', 'image-compressor'],
  },
  {
    slug: 'images-to-pdf',
    title: 'Images to PDF Converter',
    description: 'Convert JPG, PNG, and WebP images into a clean PDF document. Reorder photos, customize page orientation (Portrait/Landscape), and download.',
    category: 'pdf',
    primaryKeyword: 'convert images to pdf online',
    keywords: ['images to pdf', 'jpg to pdf', 'png to pdf', 'photo to pdf converter', 'combine photos to pdf', 'make pdf from images'],
    icon: 'FileImage',
    isPopular: true,
    content: {
      whatItIs: 'The Images to PDF Converter transforms image files (JPEG, PNG, WebP) into an organized multi-page PDF document. Adjust page margins, page orientation (Portrait or Landscape), reorder photos with drag-and-drop, and create clean presentations or portfolios.',
      howToUse: [
        'Select or drag multiple images into the converter.',
        'Arrange the sequence of images using drag handles.',
        'Choose page orientation (Auto, Portrait, or Landscape) and margin size.',
        'Click "Create PDF" and download your compiled PDF document.',
      ],
      useCases: [
        'Compiling photographed receipts, invoices, and expense slips for accounting submissions.',
        'Assembling photo portfolios, creative moodboards, and product catalogs.',
        'Converting scanned document photos into standard PDF submissions for government portals.',
      ],
      tips: [
        'Choose "Auto" orientation to automatically rotate pages matching each photo\'s aspect ratio.',
        'Ensure photos are oriented right-side up before converting for the cleanest document.',
        'For high-resolution camera photos, "Fit to Page" maintains correct proportional margins.',
      ],
    },
    faq: [
      {
        question: 'Which image formats can I convert to PDF?',
        answer: 'You can convert JPG/JPEG, PNG, WebP, and standard web image formats.',
      },
      {
        question: 'Can I mix different image orientations in the same PDF?',
        answer: 'Yes! When set to "Auto Orientation", each PDF page adapts its dimensions to match the corresponding image.',
      },
      {
        question: 'Are my personal photos uploaded anywhere?',
        answer: 'No. The PDF generation is handled 100% on your device using client-side `pdf-lib` and Canvas APIs.',
      },
      {
        question: 'Can I reorder my images before making the PDF?',
        answer: 'Yes, you can easily drag and drop or use the up/down controls to reorder your photos.',
      },
      {
        question: 'Is there a limit to how many images I can include?',
        answer: 'You can combine dozens of images into a single PDF depending on your device\'s available RAM.',
      },
    ],
    relatedTools: ['pdf-merge', 'pdf-split', 'image-compressor', 'image-format-converter'],
  },
  {
    slug: 'pdf-compress',
    title: 'PDF Optimizer & Compressor',
    description: 'Reduce PDF file size directly in your browser. Strip unnecessary metadata, optimize embedded streams, and compress without server upload.',
    category: 'pdf',
    primaryKeyword: 'compress pdf online free',
    keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf', 'pdf size reducer', 'pdf compressor private', 'compress pdf no limit'],
    icon: 'FileDown',
    isPopular: true,
    content: {
      whatItIs: 'The PDF Optimizer & Compressor reduces PDF document weight by stripping redundant object streams, unused metadata, and optimizing page structural trees. Ideal for shrinking documents to meet strict email attachment and portal upload quotas.',
      howToUse: [
        'Drag and drop your PDF file into the drop zone.',
        'Select your desired optimization level (Standard or Maximum).',
        'View the file size reduction and savings percentage.',
        'Click "Download Compressed PDF" to save your optimized document.',
      ],
      useCases: [
        'Downsizing government applications, visa documents, and university submissions under 2MB limits.',
        'Shrinking presentation decks and proposals to send effortlessly via email attachments.',
        'Optimizing document storage on mobile devices and internal cloud drives.',
      ],
      tips: [
        'Scanned PDFs with high-resolution image pages benefit the most from optimization.',
        'Documents created in Adobe Acrobat often contain heavy embedded structural metadata that can be safely pruned.',
        'Always check the visual clarity of text and diagrams before sending the optimized file.',
      ],
    },
    faq: [
      {
        question: 'How does client-side PDF compression work?',
        answer: 'It reconstructs the PDF object tree, strips orphaned data streams, unreferenced fonts, and optimizes structural dictionaries.',
      },
      {
        question: 'Is it safe to compress confidential legal papers here?',
        answer: 'Yes! Because everything runs locally in your browser, no legal, medical, or financial documents are ever transmitted over the network.',
      },
      {
        question: 'Will text remain searchable after compression?',
        answer: 'Yes, all selectable vector text, fonts, and hyperlinks remain completely intact and searchable.',
      },
      {
        question: 'Can I compress password-protected PDF files?',
        answer: 'Encrypted PDFs must be unlocked before compression so the structural stream can be optimized.',
      },
      {
        question: 'Is there any subscription or watermark added?',
        answer: 'No. All tools on WebToolBox are 100% free and never add watermarks or brand stamps.',
      },
    ],
    relatedTools: ['pdf-merge', 'pdf-split', 'images-to-pdf', 'image-compressor'],
  },
];
