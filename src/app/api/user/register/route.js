import { getServerSession } from 'next-auth';
import { query } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name } = await request.json();
    const sql = 'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *';
    const result = await query(sql, [session.user.email, name]);
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 