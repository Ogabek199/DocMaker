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
    // Rejimni qaytarish (foydalanuvchi yana qizil ta'kidni ko'rishi uchun)
    element.classList.remove("export-black-mode");
  }
}

export async function printDocument(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.classList.add("export-black-mode");

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const dataUrl = canvas.toDataURL("image/png");
    const windowContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>DocMaker Hujjat</title>
        <style>
          body { margin: 0; padding: 0; }
          img { width: 100%; height: auto; }
          @page { margin: 0; }
        </style>
      </head>
      <body>
        <img src="${dataUrl}" />
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(windowContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  } finally {
    element.classList.remove("export-black-mode");
  }
}
