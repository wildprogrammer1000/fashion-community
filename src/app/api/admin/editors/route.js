import { getServerSession } from 'next-auth';
import { query } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const userResult = await query('user.getByEmail', [session.user.email]);
    
    if (userResult.data[0]?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const result = await query('user.getByRole', ['pending_editor']);
    
    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 