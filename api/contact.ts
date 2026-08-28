import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Name is required' });
    }
    if (!email || !email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, error: 'A valid email is required' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    // 1. Send notification email to Admin (dipusardar.dev@gmail.com)
    // Note: If using Resend free tier without a custom domain, emails must be sent 'from' onboarding@resend.dev.
    const adminEmailPromise = resend.emails.send({
      from: 'Portfolio Contact <contact@dipusardar.com>',
      to: 'dipusardar.dev@gmail.com',
      replyTo: cleanEmail,
      subject: `New Portfolio Message from ${cleanName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #d8d8d8; border-radius: 8px;">
          <h2 style="color: #111111; border-bottom: 2px solid #262626; padding-bottom: 10px;">New Message Details</h2>
          <p><strong>Name:</strong> ${cleanName}</p>
          <p><strong>Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f7f7f7; border-radius: 5px; color: #111111; line-height: 1.5; white-space: pre-wrap;">
            <strong>Message:</strong><br/>${cleanMessage}
          </div>
          <p style="font-size: 12px; color: #8c8c8c; margin-top: 30px;">Sent via Dipu Sardar's Portfolio Contact Form.</p>
        </div>
      `,
    });

    // 2. Send confirmation email to User
    const userEmailPromise = resend.emails.send({
      from: 'Dipu Sardar <contact@dipusardar.com>',
      to: cleanEmail,
      subject: 'Message Received - Dipu Sardar',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #111111; padding: 40px 20px; margin: 0; min-height: 100%;">
          <div style="max-width: 500px; margin: 0 auto; background-color: #f7f7f7; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.5); border-top: 6px solid #262626;">

            <!-- Header Section -->
            <div style="background-color: #111111; padding: 30px; text-align: center; border-bottom: 1px solid #262626;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px;">DIPU SARDAR</h1>
              <p style="color: #8c8c8c; margin: 5px 0 0 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Machine Learning & Interface Design</p>
            </div>

            <!-- Body Content -->
            <div style="padding: 30px; color: #111111;">
              <p style="font-size: 16px; font-weight: 600; margin-top: 0;">Hello ${cleanName},</p>

              <p style="font-size: 15px; line-height: 1.6; color: #262626;">
                Thank you for reaching out through my portfolio. I have received your message and will get back to you shortly at <a href="mailto:${cleanEmail}" style="color: #262626; text-decoration: none; font-weight: 500;">${cleanEmail}</a>.
              </p>

              <!-- Message Quote -->
              <div style="margin: 25px 0; padding: 15px; background-color: #e8e8e8; border-left: 4px solid #262626; border-radius: 4px; font-style: italic; color: #262626; font-size: 14px;">
                "${cleanMessage.length > 100 ? cleanMessage.slice(0, 100) + '...' : cleanMessage}"
              </div>

              <p style="font-size: 14px; line-height: 1.5; color: #8c8c8c; margin-bottom: 0;">
                Best regards,<br/>
                <strong>Dipu Sardar</strong><br/>
                <span style="font-size: 12px;">Machine Learning Engineer</span>
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #e8e8e8; padding: 15px 30px; text-align: center; font-size: 11px; color: #8c8c8c; border-top: 1px solid #d8d8d8;">
              <p style="margin: 0;">© ${new Date().getFullYear()} Dipu Sardar. All rights reserved.</p>
              <p style="margin: 5px 0 0 0;">
                <a href="https://github.com/dipu-sardar" style="color: #262626; text-decoration: none; margin: 0 5px;">GitHub</a> |
                <a href="https://www.linkedin.com/in/dipu-sardar-1b6a07321/" style="color: #262626; text-decoration: none; margin: 0 5px;">LinkedIn</a>
              </p>
            </div>

          </div>
        </div>
      `,
    });

    // Wait for both emails to be sent
    const [adminResult, userResult] = await Promise.all([adminEmailPromise, userEmailPromise]);

    // Check if Resend returned any errors (errors are returned in the response object as 'error' key)
    if (adminResult.error) {
      console.error('Resend Admin Email Error:', adminResult.error);
      return res.status(500).json({ success: false, error: adminResult.error.message });
    }
    if (userResult.error) {
      console.error('Resend User Email Error:', userResult.error);
      return res.status(500).json({ success: false, error: userResult.error.message });
    }

    return res.status(200).json({ success: true, message: 'Emails sent successfully!' });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'An unexpected error occurred while sending the message.' 
    });
  }
}
