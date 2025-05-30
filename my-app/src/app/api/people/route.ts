import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - List all people with company information
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('People')
      .select(`
        *,
        Companies (
          id,
          name
        )
      `)
      .order('name', { ascending: true });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching people:', error);
    return NextResponse.json(
      { error: 'Failed to fetch people' },
      { status: 500 }
    );
  }
}

// POST - Create a new person
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, companyId } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('People')
      .insert([{ name, email, phone, companyId }])
      .select(`
        *,
        Companies (
          id,
          name
        )
      `)
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating person:', error);
    return NextResponse.json(
      { error: 'Failed to create person' },
      { status: 500 }
    );
  }
} 