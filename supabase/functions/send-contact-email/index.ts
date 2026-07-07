import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(1000),
});

const RECIPIENTS = ['oussamaabdel889@gmail.com', 'abdeljebbaroussama51@gmail.com'];

function buildHtml(name: string, email: string, message: string, dateStr: string) {
  const safe = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#0b0f19;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#e6edf7;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0f19;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:linear-gradient(180deg,#0f172a 0%,#0b0f19 100%);border:1px solid rgba(56,189,248,0.18);border-radius:16px;overflow:hidden;">
        <tr><td style="padding:28px 32px;background:linear-gradient(90deg,rgba(56,189,248,0.14),rgba(139,92,246,0.14));border-bottom:1px solid rgba(56,189,248,0.15);">
          <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#38bdf8;font-weight:600;">Portfolio · New Message</div>
          <div style="font-size:22px;font-weight:700;margin-top:6px;color:#f8fafc;">New Portfolio Contact</div>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
            <tr><td style="padding:10px 0;color:#94a3b8;width:110px;">Name</td><td style="padding:10px 0;color:#f1f5f9;font-weight:600;">${safe(name)}</td></tr>
            <tr><td style="padding:10px 0;color:#94a3b8;border-top:1px solid rgba(148,163,184,0.12);">Email</td><td style="padding:10px 0;color:#f1f5f9;font-weight:600;border-top:1px solid rgba(148,163,184,0.12);"><a href="mailto:${safe(email)}" style="color:#38bdf8;text-decoration:none;">${safe(email)}</a></td></tr>
            <tr><td style="padding:10px 0;color:#94a3b8;border-top:1px solid rgba(148,163,184,0.12);">Date</td><td style="padding:10px 0;color:#f1f5f9;font-weight:600;border-top:1px solid rgba(148,163,184,0.12);">${safe(dateStr)}</td></tr>
          </table>
          <div style="margin-top:22px;padding:18px 20px;background:rgba(15,23,42,0.7);border:1px solid rgba(56,189,248,0.15);border-radius:12px;color:#e2e8f0;line-height:1.6;white-space:pre-wrap;font-size:14px;">${safe(message)}</div>
        </td></tr>
        <tr><td style="padding:18px 32px;border-top:1px solid rgba(148,163,184,0.12);color:#64748b;font-size:12px;">
          Sent from oussama-abdeljebbar.com contact form
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ success: false, error: 'Email service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const json = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid input', details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }
    const { name, email, message } = parsed.data;
    const dateStr = new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' });

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: RECIPIENTS,
        reply_to: email,
        subject: 'New Portfolio Contact',
        html: buildHtml(name, email, message, dateStr),
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error(`Resend failed [${res.status}]: ${errBody}`);
      return new Response(JSON.stringify({ success: false, error: 'Failed to send email' }), {
        status: res.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-contact-email error:', err);
    return new Response(JSON.stringify({ success: false, error: 'Unexpected server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
