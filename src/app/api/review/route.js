import { query } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await query('review.getAll');
    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, content, author_id } = await request.json();
    const result = await query('review.create', [{ title, content, author_id }]);
    return NextResponse.json(result.data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 