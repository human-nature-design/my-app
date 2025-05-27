import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Get all people for a specific company
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const companyId = parseInt(params.id);
    
    if (isNaN(companyId)) {
      return NextResponse.json(
        { error: 'Invalid company ID' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('People')
      .select(`
        *,
        Companies (
          id,
          name
        )
      `)
      .eq('companyId', companyId)
      .order('name', { ascending: true });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching company people:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company people' },
      { status: 500 }
    );
  }
} 