import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function downloadPDF(
  elementId: string,
  filename: string = "hujjat.pdf"
) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found:", elementId);
    return;
  }

  // Qizil matnlarni yuklab olish paytida qora qilish uchun maxsus rejimni yoqish
  element.classList.add("export-black-mode");

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png", 1.0);

    const pdfWidth = 210;
    const pdfHeight = 297;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const ratio = canvasWidth / canvasHeight;
    let imgWidth = pdfWidth;
    let imgHeight = pdfWidth / ratio;

    if (imgHeight > pdfHeight) {
      imgHeight = pdfHeight;
      imgWidth = pdfHeight * ratio;
    }

    const xOffset = (pdfWidth - imgWidth) / 2;
    const yOffset = 0;

    pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);
    pdf.save(filename);
  } catch (error) {
    console.error("PDF generatsiyada xatolik:", error);
    throw error;
  } finally {
    element.classList.remove("export-black-mode");
  }
}

/**
 * Chop etish (Print): Yashirin iframe orqali popup blockerlarsiz
 * to'g'ridan-to'g'ri va eng sifatli (vektor) tarzda chop etadi.
 */
export async function printDocument(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found:", elementId);
    return;
  }

  // Eski print iframe bo'lsa tozalash
  const oldIframe = document.getElementById("print-iframe-docmaker");
  if (oldIframe) {
    oldIframe.remove();
  }

  // Yashirin iframe yaratish
  const iframe = document.createElement("iframe");
  iframe.id = "print-iframe-docmaker";
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  iframe.style.zIndex = "-1";

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    // Fallback oddiy print
    window.print();
    return;
  }

  // HTML nusxasi
  const htmlContent = element.outerHTML;

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>DocMaker Hujjat</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 10mm;
        }
        body {
          margin: 0;
          padding: 0;
          background: #ffffff;
          font-family: 'Times New Roman', Times, serif;
          color: #000000;
        }
        #docx-preview-container {
          box-shadow: none !important;
          border: none !important;
          padding: 0 !important;
          width: 100% !important;
          min-height: auto !important;
        }
        .red-field {
          color: #000000 !important;
          background-color: transparent !important;
          border: none !important;
          padding: 0 !important;
          font-weight: bold !important;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        p {
          line-height: 1.5;
        }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `);
  doc.close();

  // Yuklangandan so'ng print oynasini ochish
  iframe.onload = () => {
    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch (err) {
        console.error("Print error:", err);
      } finally {
        setTimeout(() => {
          iframe.remove();
        }, 1500);
      }
    }, 200);
  };
}
