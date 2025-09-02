import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

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

// Template for contact form notification email
export function createContactFormNotificationEmail(contactData: {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  submittedAt: string;
}) {
  const subject = `New Contact Form Submission: ${contactData.subject || 'General Inquiry'}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #2c3e50; margin-bottom: 20px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #34495e; margin-bottom: 10px;">Contact Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Name:</td>
              <td style="padding: 8px 0; color: #333;">${contactData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px 0; color: #333;">${contactData.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
              <td style="padding: 8px 0; color: #333;">${contactData.subject || 'General Inquiry'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Submitted:</td>
              <td style="padding: 8px 0; color: #333;">${contactData.submittedAt}</td>
            </tr>
          </table>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #34495e; margin-bottom: 10px;">Message:</h3>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 4px solid #3498db;">
            <p style="margin: 0; line-height: 1.6; color: #333;">${contactData.message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: center;">
          <p style="color: #6c757d; font-size: 14px; margin: 0;">
            This email was sent from the Vaibhav Selukar Portfolio contact form.
          </p>
        </div>
      </div>
    </div>
  `;

  const text = `
New Contact Form Submission

Name: ${contactData.name}
Email: ${contactData.email}
Subject: ${contactData.subject || 'General Inquiry'}
Submitted: ${contactData.submittedAt}

Message:
${contactData.message}

---
This email was sent from the Vaibhav Selukar Portfolio contact form.
  `;

  return { subject, html, text };
}

// Template for weekly summary email
export function createWeeklySummaryEmail(contactSubmissions: Array<{
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  isRead: boolean | null;
  createdAt: Date | null;
}>, weekStartDate: string, weekEndDate: string) {
  const subject = `Weekly Contact Form Summary - ${weekStartDate} to ${weekEndDate}`;
  
  const totalSubmissions = contactSubmissions.length;
  const unreadSubmissions = contactSubmissions.filter(sub => sub.isRead === false || sub.isRead === null).length;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #2c3e50; margin-bottom: 20px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          Weekly Contact Form Summary
        </h2>
        
        <div style="margin-bottom: 25px;">
          <h3 style="color: #34495e; margin-bottom: 15px;">Summary for ${weekStartDate} to ${weekEndDate}</h3>
          <div style="display: flex; gap: 20px; margin-bottom: 20px;">
            <div style="background-color: #e8f4f8; padding: 15px; border-radius: 6px; text-align: center; flex: 1;">
              <div style="font-size: 24px; font-weight: bold; color: #2c3e50;">${totalSubmissions}</div>
              <div style="color: #34495e; font-size: 14px;">Total Submissions</div>
            </div>
            <div style="background-color: ${unreadSubmissions > 0 ? '#fff3cd' : '#d4edda'}; padding: 15px; border-radius: 6px; text-align: center; flex: 1;">
              <div style="font-size: 24px; font-weight: bold; color: #2c3e50;">${unreadSubmissions}</div>
              <div style="color: #34495e; font-size: 14px;">Unread Messages</div>
            </div>
          </div>
        </div>
        
        ${totalSubmissions > 0 ? `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #34495e; margin-bottom: 15px;">Contact Submissions:</h3>
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; background-color: white;">
              <thead>
                <tr style="background-color: #f8f9fa;">
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6; color: #495057; font-weight: 600;">Date</th>
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6; color: #495057; font-weight: 600;">Name</th>
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6; color: #495057; font-weight: 600;">Email</th>
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6; color: #495057; font-weight: 600;">Subject</th>
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6; color: #495057; font-weight: 600;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${contactSubmissions.map(submission => `
                  <tr style="border-bottom: 1px solid #dee2e6;">
                    <td style="padding: 12px; color: #495057;">${submission.createdAt ? new Date(submission.createdAt).toLocaleDateString() : 'N/A'}</td>
                    <td style="padding: 12px; color: #495057;">${submission.name}</td>
                    <td style="padding: 12px; color: #495057;">${submission.email}</td>
                    <td style="padding: 12px; color: #495057;">${submission.subject || 'General Inquiry'}</td>
                    <td style="padding: 12px;">
                      <span style="padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; 
                                   background-color: ${submission.isRead ? '#d4edda' : '#fff3cd'}; 
                                   color: ${submission.isRead ? '#155724' : '#856404'};">
                        ${submission.isRead ? 'Read' : 'Unread'}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        ` : `
        <div style="text-align: center; padding: 40px 20px; background-color: #f8f9fa; border-radius: 6px;">
          <p style="color: #6c757d; font-size: 16px; margin: 0;">No contact form submissions received this week.</p>
        </div>
        `}
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: center;">
          <p style="color: #6c757d; font-size: 14px; margin: 0;">
            This is an automated weekly summary from Vaibhav Selukar Portfolio website.
          </p>
        </div>
      </div>
    </div>
  `;

  const text = `
Weekly Contact Form Summary - ${weekStartDate} to ${weekEndDate}

Summary:
- Total Submissions: ${totalSubmissions}
- Unread Messages: ${unreadSubmissions}

${totalSubmissions > 0 ? `
Contact Submissions:
${contactSubmissions.map(submission => `
- ${submission.createdAt ? new Date(submission.createdAt).toLocaleDateString() : 'N/A'} | ${submission.name} (${submission.email})
  Subject: ${submission.subject || 'General Inquiry'}
  Status: ${submission.isRead ? 'Read' : 'Unread'}
`).join('')}
` : 'No contact form submissions received this week.'}

---
This is an automated weekly summary from Vaibhav Selukar Portfolio website.
  `;

  return { subject, html, text };
}