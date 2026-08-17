import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export async function parsePdfBuffer(buffer, originalName = 'Uploaded Document') {
  try {
    const data = await pdfParse(buffer);
    const fullText = data.text || '';
    const numPages = data.numpages || 1;

    // Clean extracted text
    const cleanedText = fullText
      .replace(/[\r\n]+/g, '\n\n')
      .replace(/[^\x20-\x7E\n\t]/g, ' ')
      .replace(/ {2,}/g, ' ')
      .trim();

    const title = originalName.replace(/\.[^/.]+$/, '');

    // Chunk text per ~500 characters if single text stream
    const CHUNK_SIZE = 500;
    const pages = [];
    const chapters = [];

    if (cleanedText.length > 0) {
      let currentIndex = 0;
      let pageNum = 1;

      while (currentIndex < cleanedText.length) {
        let nextIndex = Math.min(currentIndex + CHUNK_SIZE, cleanedText.length);

        if (nextIndex < cleanedText.length) {
          const spaceOrDot = cleanedText.indexOf('. ', nextIndex - 80);
          if (spaceOrDot !== -1 && spaceOrDot < nextIndex + 80) {
            nextIndex = spaceOrDot + 1;
          }
        }

        const content = cleanedText.slice(currentIndex, nextIndex).trim();
        const chapterNum = Math.ceil(pageNum / 2);
        const chapterTitle = `Chapter ${chapterNum}: Extracted Content`;

        if ((pageNum - 1) % 2 === 0) {
          chapters.push({ title: chapterTitle, startPage: pageNum });
        }

        pages.push({
          pageNumber: pageNum,
          chapterTitle,
          isChapterStart: (pageNum - 1) % 2 === 0,
          content: content || `Page ${pageNum} from ${title}`,
        });

        currentIndex = nextIndex;
        pageNum++;
      }
    } else {
      pages.push({
        pageNumber: 1,
        chapterTitle: 'Document Content',
        isChapterStart: true,
        content: `Document: ${title}\n\nSuccessfully parsed ${numPages} pages from PDF buffer.`,
      });
      chapters.push({ title: 'Document Content', startPage: 1 });
    }

    return {
      id: `pdf-parsed-${Date.now()}`,
      title,
      author: 'Uploaded PDF',
      subtitle: `${pages.length} Pages • Extracted PDF Data`,
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
      totalPages: pages.length,
      chapters,
      pages,
    };
  } catch (error) {
    console.error('PDF Parse Error:', error);
    throw error;
  }
}
