import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportReportPdf() {
  const report = document.getElementById('esg-report');

  if (!report) return;

  const canvas = await html2canvas(report, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // Primera página
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // Resto de páginas
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;

    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

    heightLeft -= pageHeight;
  }

  pdf.save('Reporte-ESG.pdf');
}
