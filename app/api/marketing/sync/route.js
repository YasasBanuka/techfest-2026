import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Syncs a new user to Resend Audiences.
 * This is triggered after a successful signup.
 */
export async function POST(req) {
  try {
    const { email, name, tags } = await req.json();

    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️ [RESEND] API Key missing. Skipping audience sync.');
      return NextResponse.json({ success: false, message: 'API Key missing' });
    }

    // Note: To use Audiences, your domain must be verified in Resend.
    // If you haven't created an audience yet, this might fail unless you provide an audienceId.
    // For now, we'll try to add to the first audience found or create one if possible (manually is better).
    
    // Standard Resend Add Contact implementation
    // Replace 'audience_id' with your actual PayHere Audience ID from the Resend Dashboard
    const { data, error } = await resend.contacts.create({
      email: email,
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' '),
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID || '', // User should add this to .env
    });

    if (error) {
      console.error('❌ [RESEND_SYNC_ERROR]', error);
      return NextResponse.json({ success: false, error: error.message });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('🔥 [RESEND_SYNC_CRASH]', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
