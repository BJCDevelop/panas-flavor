import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiting (resets on server restart)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5;

  const record = requestCounts.get(ip);
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (record.count >= maxRequests) return false;
  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const ip =
      req.headers.get('x-forwarded-for') ??
      req.headers.get('x-real-ip') ??
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    const {
      name,
      email,
      phone,
      preferredDate,
      alternativeDate,
      eventType,
      guests,
      location,
      details,
      howFound,
      honeypot,
    } = body;

    // Anti-bot: silently succeed if honeypot is filled
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Server-side validation
    if (!name || !email || !phone || !preferredDate || !eventType || !guests || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Email to Carlos
    await resend.emails.send({
      from: 'Panas Flavor Website <onboarding@resend.dev>',
      to: ['bjcdevelop@gmail.com'],
      replyTo: email,
      subject: `🔥 New Catering Request — ${eventType} on ${preferredDate}`,
      html: `
        <div style="font-family:sans-serif;max-width:700px;margin:0 auto;">
          <h2 style="color:#C8102E;">New Catering Request from panasflavor.com</h2>
          <table style="border-collapse:collapse;width:100%;">
            <tr style="background:#f9f9f9;">
              <td style="padding:10px 12px;font-weight:bold;width:160px;">Name</td>
              <td style="padding:10px 12px;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;font-weight:bold;">Email</td>
              <td style="padding:10px 12px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr style="background:#f9f9f9;">
              <td style="padding:10px 12px;font-weight:bold;">Phone</td>
              <td style="padding:10px 12px;">${phone}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;font-weight:bold;">Preferred Date</td>
              <td style="padding:10px 12px;">${preferredDate}</td>
            </tr>
            <tr style="background:#f9f9f9;">
              <td style="padding:10px 12px;font-weight:bold;">Alternative Date</td>
              <td style="padding:10px 12px;">${alternativeDate || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;font-weight:bold;">Event Type</td>
              <td style="padding:10px 12px;">${eventType}</td>
            </tr>
            <tr style="background:#f9f9f9;">
              <td style="padding:10px 12px;font-weight:bold;">Guests</td>
              <td style="padding:10px 12px;">${guests}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;font-weight:bold;">Location</td>
              <td style="padding:10px 12px;">${location}</td>
            </tr>
            <tr style="background:#f9f9f9;">
              <td style="padding:10px 12px;font-weight:bold;">Details</td>
              <td style="padding:10px 12px;">${details || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;font-weight:bold;">How Found</td>
              <td style="padding:10px 12px;">${howFound || 'N/A'}</td>
            </tr>
          </table>
        </div>
      `,
    });

    // Confirmation email to client
    await resend.emails.send({
      from: 'Panas Flavor <onboarding@resend.dev>',
      to: [email],
      subject: 'We received your catering request! — Panas Flavor',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <h2 style="color:#C8102E;">Thank you, ${name}!</h2>
          <p>We received your catering request for <strong>${preferredDate}</strong>.</p>
          <p>Our team will review the details and get back to you within 24 hours.</p>
          <p>If you have any urgent questions, feel free to DM us on Instagram:
             <a href="https://instagram.com/PanasFlavor" style="color:#C8102E;">@PanasFlavor</a></p>
          <br/>
          <p style="color:#6B7280;">— The Panas Flavor Team 🇻🇪</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Catering request error:', error);
    return NextResponse.json({ error: 'Failed to send request' }, { status: 500 });
  }
}
