import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { join } from 'path'

// Local API emulator for testing /api/contact without Vercel CLI
const localApiPlugin = () => ({
  name: 'local-api',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url === '/api/contact' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });
        req.on('end', async () => {
          try {
            const parsedBody = JSON.parse(body);

            // Load API key from .env.local
            let apiKey = process.env.RESEND_API_KEY;
            if (!apiKey) {
              try {
                const envContent = readFileSync(join(process.cwd(), '.env.local'), 'utf-8');
                const match = envContent.match(/RESEND_API_KEY=(.*)/);
                if (match && match[1]) {
                  apiKey = match[1].trim();
                }
              } catch (e) {}
            }

            if (!apiKey || apiKey.startsWith('re_your_api_key') || apiKey === 're_61rh8nie_6LFxmSAy2hLgb16qPYKjDrpw_placeholder') {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Resend API Key is missing or not configured.' }));
              return;
            }

            const { name, email, message } = parsedBody;
            if (!name || !email || !message) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Validation failed: Name, Email, and Message are required.' }));
              return;
            }

            // 1. Send notification to admin (dipusardar.dev@gmail.com)
            const adminEmailPromise = fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: 'Portfolio Contact <contact@dipusardar.com>',
                to: 'dipusardar.dev@gmail.com',
                reply_to: email,
                subject: `New Portfolio Message from ${name} (Local Dev)`,
                html: `
                  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #0f0f11; border-bottom: 2px solid #e05e35; padding-bottom: 10px;">New Message (Local Dev)</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f4f4f6; border-radius: 5px; color: #0f0f11; white-space: pre-wrap;">
                      <strong>Message:</strong><br/>${message}
                    </div>
                  </div>
                `,
              })
            });

            // 2. Send confirmation to user
            const userEmailPromise = fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: 'Dipu Sardar <contact@dipusardar.com>',
                to: email,
                subject: 'Message Received - Dipu Sardar (Local Dev)',
                html: `
                  <div style="font-family: sans-serif; background-color: #0f0f11; padding: 30px; color: #f4f4f6; border-radius: 8px;">
                    <h2 style="color: #e05e35;">Hello ${name},</h2>
                    <p>Thank you for contacting me. I have received your message:</p>
                    <blockquote style="border-left: 4px solid #e05e35; padding-left: 10px; color: #ccc;">"${message}"</blockquote>
                    <p>I will get back to you shortly.</p>
                  </div>
                `,
              })
            });

            const [adminRes, userRes] = await Promise.all([adminEmailPromise, userEmailPromise]);
            const adminData = (await adminRes.json()) as any;
            const userData = (await userRes.json()) as any;

            if (adminData.error) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: adminData.error.message }));
              return;
            }

            if (userData.error) {
              console.warn('Local Dev confirmation email warning:', userData.error.message);
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'Emails sent successfully!' }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message }));
          }
        });
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localApiPlugin()],
  server: {
    fs: {
      strict: false
    }
  }
})

