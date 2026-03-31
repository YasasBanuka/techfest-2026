import { Resend } from 'resend';
import { NextResponse } from 'next/server';

/**
 * app/api/submit/route.js
 * Centralized handler for all form submissions (Sponsors, Speakers, Contact).
 * Supports Logging, Email (Resend), and extensible for Google Sheets.
 */

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(req) {
  try {
    const data = await req.json();
    const { type, ...payload } = data;

    // ── 1. LOG TO CONSOLE (Immediate Visibility) ──
    console.log(`\n🚀 [NEW SUBMISSION] Type: ${type.toUpperCase()}`);
    console.log('────────────────────────────────────────────────');
    console.table(payload);
    console.log('────────────────────────────────────────────────\n');

    // ── 2. EMAIL NOTIFICATION (via Resend) ──
    // Note: Requires RESEND_API_KEY in .env
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'TechFest 2026 <onboarding@resend.dev>', // Update with verified domain in production
          to: ['ybanuka2003@gmail.com'], // Replace with your receiving email
          subject: `[${type.toUpperCase()}] New Inquiry from ${payload.name || payload.company}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
              <div style="background: #0f2b69; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                <h1 style="color: #ffcb40; margin: 0; font-size: 24px;">TechFest Sri Lanka 2026</h1>
                <p style="color: #ffffff; margin: 10px 0 0; opacity: 0.8; text-transform: uppercase; letter-spacing: 2px; font-size: 12px;">New ${type} Submission</p>
              </div>
              <div style="padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; background: #ffffff;">
                <table style="width: 100%; border-collapse: collapse;">
                  ${Object.entries(payload).map(([key, value]) => `
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 12px; text-transform: uppercase; width: 35%;">${key.replace(/([A-Z])/g, ' $1')}</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 600;">${value}</td>
                    </tr>
                  `).join('')}
                </table>
                <div style="margin-top: 30px; padding: 15px; background: #f9fafb; border-radius: 8px; font-size: 11px; color: #9ca3af; text-align: center;">
                  This message was sent from the TechFest 2026 platform at ${new Date().toLocaleString()}
                </div>
              </div>
            </div>
          `,
        });
        console.log('✅ [RESEND] Email notification sent.');
      } catch (emailError) {
        console.error('❌ [RESEND] Failed to send email:', emailError.message);
      }
    } else {
      console.warn('⚠️ [RESEND] API Key missing. Skipping email notification.');
    }

    // ── 3. GOOGLE SHEETS / EXTERNAL LOGGING ──
    // Placeholder for Google Apps Script Webhook or Service Account implementation
    if (process.env.GOOGLE_SHEETS_WEBHOOK) {
      try {
        await fetch(process.env.GOOGLE_SHEETS_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        console.log('✅ [SHEETS] Data synced to Google Sheets.');
      } catch (sheetError) {
        console.error('❌ [SHEETS] Sync failed:', sheetError.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received and logged successfully.'
    });

  } catch (error) {
    console.error('🔥 [API_ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
