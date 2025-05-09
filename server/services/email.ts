import { MailService } from '@sendgrid/mail';
import { Booking } from '@shared/schema';

// Initialize SendGrid
const mailService = new MailService();
const apiKey = process.env.SENDGRID_API_KEY || '';
mailService.setApiKey(apiKey);

// Admin email address
const ADMIN_EMAIL = 'kelvinmukaria2023@gmail.com';
const PHONE_NUMBER = '+254757086742';

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Send an email using SendGrid
 */
export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

/**
 * Send a booking confirmation email to customer
 */
export async function sendBookingConfirmationToCustomer(booking: Booking): Promise<boolean> {
  const subject = 'Booking Confirmation - Eugine Ray Studios';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #000; margin-bottom: 10px;">Eugine Ray Studios</h1>
        <p style="color: #D4AF37; font-style: italic;">Premium Photography & Videography</p>
      </div>
      
      <h2 style="color: #000;">Thank You for Your Booking!</h2>
      
      <p>Dear ${booking.firstName} ${booking.lastName},</p>
      
      <p>We have received your booking request for ${booking.serviceType} services. Thank you for choosing Eugine Ray Studios!</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #D4AF37; margin: 20px 0;">
        <h3 style="margin-top: 0;">Booking Details:</h3>
        <p><strong>Service:</strong> ${booking.serviceType}</p>
        ${booking.eventDate ? `<p><strong>Date:</strong> ${new Date(booking.eventDate).toLocaleDateString()}</p>` : ''}
        ${booking.location ? `<p><strong>Location:</strong> ${booking.location}</p>` : ''}
        <p><strong>Budget:</strong> KSh ${booking.budget.toLocaleString()}</p>
      </div>
      
      <p>Our team will review your request and reach out to you within 24 hours to discuss the details and confirm your booking.</p>
      
      <p>If you have any questions or need to make changes to your booking, please contact us at:</p>
      <p>📞 ${PHONE_NUMBER}<br>
      ✉️ ${ADMIN_EMAIL}</p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 14px; color: #777;">
        <p>Eugine Ray Studios | Meru, Kenya</p>
      </div>
    </div>
  `;
  
  return sendEmail({
    to: booking.email,
    from: ADMIN_EMAIL,
    subject,
    html,
  });
}

/**
 * Send a booking notification email to admin
 */
export async function sendBookingNotificationToAdmin(booking: Booking): Promise<boolean> {
  const subject = `New Booking Request: ${booking.serviceType} - ${booking.firstName} ${booking.lastName}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #000; margin-bottom: 10px;">Eugine Ray Studios</h1>
        <p style="color: #D4AF37; font-style: italic;">New Booking Alert</p>
      </div>
      
      <h2 style="color: #000;">New Booking Request</h2>
      
      <p>A new booking request has been submitted with the following details:</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Customer Information:</h3>
        <p><strong>Name:</strong> ${booking.firstName} ${booking.lastName}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        
        <h3>Booking Details:</h3>
        <p><strong>Service:</strong> ${booking.serviceType}</p>
        ${booking.eventDate ? `<p><strong>Date:</strong> ${new Date(booking.eventDate).toLocaleDateString()}</p>` : ''}
        ${booking.location ? `<p><strong>Location:</strong> ${booking.location}</p>` : ''}
        <p><strong>Budget:</strong> KSh ${booking.budget.toLocaleString()}</p>
        
        ${booking.message ? `
        <h3>Additional Message:</h3>
        <p>${booking.message}</p>
        ` : ''}
      </div>
      
      <p><a href="${process.env.BASE_URL || 'https://eugineraystudios.com'}/admin/bookings" style="background-color: #D4AF37; color: #000; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block;">View in Dashboard</a></p>
      
      <p>Please respond to this booking request within 24 hours.</p>
    </div>
  `;
  
  return sendEmail({
    to: ADMIN_EMAIL,
    from: ADMIN_EMAIL,
    subject,
    html,
  });
}

/**
 * Send a contact form submission notification to admin
 */
export async function sendContactFormNotification(name: string, email: string, subject: string, message: string): Promise<boolean> {
  const emailSubject = `Contact Form: ${subject}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #000; margin-bottom: 10px;">Eugine Ray Studios</h1>
        <p style="color: #D4AF37; font-style: italic;">New Contact Form Submission</p>
      </div>
      
      <h2 style="color: #000;">New Contact Form Submission</h2>
      
      <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h3>Message:</h3>
        <p>${message}</p>
      </div>
    </div>
  `;
  
  return sendEmail({
    to: ADMIN_EMAIL,
    from: ADMIN_EMAIL,
    subject: emailSubject,
    html,
  });
}