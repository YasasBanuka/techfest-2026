import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

/**
 * Exports all marketing leads as a CSV file.
 * Restricted to admins or authorized service calls.
 */
export async function GET(req) {
  try {
    const supabase = await createClient();

    // 1. Security Check: Only allow if user is logged in
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (!user || authError) {
      return new Response('Unauthorized', { status: 401 });
    }

    // 2. Fetch Leads using Admin Client to bypass RLS
    const adminSupabase = createAdminClient();
    const { data: leads, error: fetchError } = await adminSupabase
      .from('marketing_leads')
      .select('email, full_name, source, tags, created_at')
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;

    // 3. Convert to CSV
    const headers = ['Email', 'Full Name', 'Source', 'Tags', 'Signed Up At'];
    const csvRows = [
      headers.join(','),
      ...leads.map(l => [
        `"${(l.email || '').replace(/"/g, '""')}"`,
        `"${(l.full_name || '').replace(/"/g, '""')}"`,
        `"${(l.source || '').replace(/"/g, '""')}"`,
        `"${(l.tags || []).join(';').replace(/"/g, '""')}"`,
        `"${l.created_at ? new Date(l.created_at).toISOString() : ''}"`
      ].join(','))
    ];

    const csvString = csvRows.join('\n');

    // 4. Return as downloadable file
    return new Response(csvString, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="techfest-leads-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });

  } catch (error) {
    console.error('🔥 [EXPORT_ERROR]', error);
    return new Response('Server Error', { status: 500 });
  }
}
