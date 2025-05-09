import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Document, Paragraph, Table, TableRow, TableCell, HeadingLevel, AlignmentType, BorderStyle, Packer } from 'docx';
import { Booking } from '@shared/schema';
import { saveAs } from 'file-saver';

// Custom type for jsPDF with autoTable
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
}

/**
 * Format date in a readable format
 */
const formatDate = (date: string | null | undefined): string => {
  if (!date) return 'Not specified';
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Convert booking status to a user-friendly format
 */
const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    completed: 'Completed',
    canceled: 'Canceled',
  };
  return statusMap[status] || status;
};

/**
 * Export bookings to PDF
 */
export const exportToPDF = (bookings: Booking[], title: string = 'Booking Report'): void => {
  // Create new document
  const doc = new jsPDF() as jsPDFWithAutoTable;

  // Add title
  doc.setFontSize(20);
  doc.text(title, 14, 22);
  
  // Add subtitle with date
  doc.setFontSize(12);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 30);
  
  // Add Eugine Ray Studios header
  doc.setFontSize(14);
  doc.text('Eugine Ray Studios', 14, 38);
  
  // Define table columns
  const columns = [
    { header: 'ID', dataKey: 'id' },
    { header: 'Name', dataKey: 'name' },
    { header: 'Service', dataKey: 'service' },
    { header: 'Event Date', dataKey: 'date' },
    { header: 'Budget (KSh)', dataKey: 'budget' },
    { header: 'Status', dataKey: 'status' },
  ];

  // Define table data
  const data = bookings.map((booking) => ({
    id: booking.id,
    name: `${booking.firstName} ${booking.lastName}`,
    service: booking.serviceType,
    date: formatDate(booking.eventDate),
    budget: booking.budget.toLocaleString(),
    status: formatStatus(booking.status),
  }));

  // Create table
  doc.autoTable({
    startY: 45,
    columns,
    body: data,
    headStyles: {
      fillColor: [212, 175, 55], // Gold color
      textColor: [0, 0, 0], // Black text
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245], // Light gray for alternate rows
    },
    styles: {
      fontSize: 10,
      cellPadding: 5,
    },
  });

  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      'Eugine Ray Studios | Premium Photography & Videography | Meru, Kenya',
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  doc.save(`${title.toLowerCase().replace(/\\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
};

/**
 * Export a single booking to PDF
 */
export const exportBookingToPDF = (booking: Booking): void => {
  // Create new document
  const doc = new jsPDF() as jsPDFWithAutoTable;

  // Add title
  doc.setFontSize(18);
  doc.text('Booking Details', 14, 20);

  // Add booking reference
  doc.setFontSize(12);
  doc.text(`Booking Reference: #${booking.id}`, 14, 30);
  doc.text(`Status: ${formatStatus(booking.status)}`, 14, 38);
  doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, 14, 46);

  // Add horizontal line
  doc.setDrawColor(212, 175, 55); // Gold color
  doc.setLineWidth(0.5);
  doc.line(14, 50, 196, 50);

  // Customer information section
  doc.setFontSize(14);
  doc.text('Customer Information', 14, 60);

  doc.setFontSize(12);
  doc.text(`Name: ${booking.firstName} ${booking.lastName}`, 14, 70);
  doc.text(`Email: ${booking.email}`, 14, 78);
  doc.text(`Phone: ${booking.phone}`, 14, 86);

  // Booking details section
  doc.setFontSize(14);
  doc.text('Booking Details', 14, 100);

  doc.setFontSize(12);
  doc.text(`Service Type: ${booking.serviceType}`, 14, 110);
  doc.text(`Event Date: ${formatDate(booking.eventDate)}`, 14, 118);
  doc.text(`Location: ${booking.location || 'Not specified'}`, 14, 126);
  doc.text(`Budget: KSh ${booking.budget.toLocaleString()}`, 14, 134);
  
  // Additional information section
  if (booking.message) {
    doc.setFontSize(14);
    doc.text('Additional Information', 14, 148);
    
    doc.setFontSize(12);
    
    // Split long messages into multiple lines
    const textLines = doc.splitTextToSize(booking.message, 180);
    doc.text(textLines, 14, 158);
  }

  // Add footer
  doc.setFontSize(10);
  doc.text(
    'Eugine Ray Studios | Premium Photography & Videography | Meru, Kenya',
    doc.internal.pageSize.getWidth() / 2,
    doc.internal.pageSize.getHeight() - 10,
    { align: 'center' }
  );

  // Save the PDF
  doc.save(`booking_${booking.id}_${new Date().toISOString().split('T')[0]}.pdf`);
};

/**
 * Export bookings to DOCX (Word document)
 */
export const exportToDOCX = async (bookings: Booking[], title: string = 'Booking Report'): Promise<void> => {
  // Create document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: title,
            heading: HeadingLevel.HEADING_1,
            spacing: {
              after: 200,
            },
          }),
          new Paragraph({
            text: `Generated on ${new Date().toLocaleDateString()}`,
            spacing: {
              after: 200,
            },
          }),
          new Paragraph({
            text: 'Eugine Ray Studios',
            spacing: {
              after: 400,
            },
          }),
          new Table({
            rows: [
              // Header row
              new TableRow({
                tableHeader: true,
                children: [
                  new TableCell({ children: [new Paragraph('ID')] }),
                  new TableCell({ children: [new Paragraph('Name')] }),
                  new TableCell({ children: [new Paragraph('Service')] }),
                  new TableCell({ children: [new Paragraph('Event Date')] }),
                  new TableCell({ children: [new Paragraph('Budget (KSh)')] }),
                  new TableCell({ children: [new Paragraph('Status')] }),
                ],
              }),
              // Data rows
              ...bookings.map(
                (booking) =>
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph(String(booking.id))] }),
                      new TableCell({
                        children: [new Paragraph(`${booking.firstName} ${booking.lastName}`)],
                      }),
                      new TableCell({ children: [new Paragraph(booking.serviceType)] }),
                      new TableCell({
                        children: [new Paragraph(formatDate(booking.eventDate))],
                      }),
                      new TableCell({
                        children: [new Paragraph(booking.budget.toLocaleString())],
                      }),
                      new TableCell({ children: [new Paragraph(formatStatus(booking.status))] }),
                    ],
                  })
              ),
            ],
          }),
          new Paragraph({
            text: 'Eugine Ray Studios | Premium Photography & Videography | Meru, Kenya',
            alignment: AlignmentType.CENTER,
            spacing: {
              before: 400,
            },
          }),
        ],
      },
    ],
  });

  // Used to export the file
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${title.toLowerCase().replace(/\\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.docx`);
};

/**
 * Export a single booking to DOCX
 */
export const exportBookingToDOCX = async (booking: Booking): Promise<void> => {
  // Create document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: 'Booking Details',
            heading: HeadingLevel.HEADING_1,
            spacing: {
              after: 200,
            },
          }),
          new Paragraph({
            text: `Booking Reference: #${booking.id}`,
          }),
          new Paragraph({
            text: `Status: ${formatStatus(booking.status)}`,
          }),
          new Paragraph({
            text: `Date Generated: ${new Date().toLocaleDateString()}`,
            spacing: {
              after: 400,
            },
          }),
          new Paragraph({
            text: 'Customer Information',
            heading: HeadingLevel.HEADING_2,
            spacing: {
              after: 200,
            },
          }),
          new Paragraph({
            text: `Name: ${booking.firstName} ${booking.lastName}`,
          }),
          new Paragraph({
            text: `Email: ${booking.email}`,
          }),
          new Paragraph({
            text: `Phone: ${booking.phone}`,
            spacing: {
              after: 400,
            },
          }),
          new Paragraph({
            text: 'Booking Details',
            heading: HeadingLevel.HEADING_2,
            spacing: {
              after: 200,
            },
          }),
          new Paragraph({
            text: `Service Type: ${booking.serviceType}`,
          }),
          new Paragraph({
            text: `Event Date: ${formatDate(booking.eventDate)}`,
          }),
          new Paragraph({
            text: `Location: ${booking.location || 'Not specified'}`,
          }),
          new Paragraph({
            text: `Budget: KSh ${booking.budget.toLocaleString()}`,
            spacing: {
              after: 400,
            },
          }),
          ...(booking.message
            ? [
                new Paragraph({
                  text: 'Additional Information',
                  heading: HeadingLevel.HEADING_2,
                  spacing: {
                    after: 200,
                  },
                }),
                new Paragraph({
                  text: booking.message,
                  spacing: {
                    after: 400,
                  },
                }),
              ]
            : []),
          new Paragraph({
            text: 'Eugine Ray Studios | Premium Photography & Videography | Meru, Kenya',
            alignment: AlignmentType.CENTER,
            spacing: {
              before: 400,
            },
          }),
        ],
      },
    ],
  });

  // Used to export the file
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `booking_${booking.id}_${new Date().toISOString().split('T')[0]}.docx`);
};