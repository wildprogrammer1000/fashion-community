import { getServerSession } from 'next-auth';
import { query } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await query('user.getByEmail', [session.user.email]);
    
    if (result.data.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(result.data[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 