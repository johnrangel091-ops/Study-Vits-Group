import * as pdfjs from 'pdfjs-dist';

// Configurar el worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export interface PDFContent {
  text: string;
  pages: number;
  sections: string[];
}

export class PDFService {
  async extractText(file: File): Promise<PDFContent> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    const sections: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item: any) => item.str)
        .join(' ');
      
      fullText += `[Página ${i}]\n${pageText}\n\n`;
      
      // Intento simple de detección de secciones (títulos en mayúsculas o líneas cortas)
      const lines = pageText.split('. ');
      lines.forEach(line => {
        if (line.length > 5 && line.length < 50 && line === line.toUpperCase()) {
          sections.push(line);
        }
      });
    }

    return {
      text: fullText,
      pages: pdf.numPages,
      sections: [...new Set(sections)]
    };
  }
}

export const pdfService = new PDFService();
