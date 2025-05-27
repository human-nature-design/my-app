import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - List all companies
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('Companies')
      .select('id, name')
      .order('name', { ascending: true });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
} 