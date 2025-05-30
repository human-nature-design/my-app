import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - List all opportunities with company information
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('Opportunities')
      .select(`
        *,
        Companies (
          id,
          name
        )
      `)
      .order('name', { ascending: true });

    if (error) {
      console.error('Opportunities query error:', error);
      throw error;
    }

    console.log('Opportunities data:', data);

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunities', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST - Create a new opportunity
export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/opportunities - Starting opportunity creation');
    
    const body = await request.json();
    console.log('Received opportunity data:', body);
    
    const { name, "dollar amount": dollarAmount, companyId, "close date": closeDate, status } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      console.log('Validation failed: name is required');
      return NextResponse.json(
        { error: 'Opportunity name is required' },
        { status: 400 }
      );
    }

    if (!companyId) {
      return NextResponse.json(
        { error: 'Company ID is required' },
        { status: 400 }
      );
    }

    // Prepare the insert data
    const insertData: any = { 
      name: name.trim(),
      companyId: parseInt(companyId),
      status: status || 'Qualified'
    };
    
    if (dollarAmount !== undefined && dollarAmount !== null) {
      insertData["dollar amount"] = parseFloat(dollarAmount);
    }
    
    if (closeDate) {
      insertData["close date"] = closeDate;
    }

    console.log('Inserting opportunity data:', insertData);

    const { data, error } = await supabase
      .from('Opportunities')
      .insert(insertData)
      .select(`
        *,
        Companies (
          id,
          name
        )
      `)
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      );
    }

    console.log('Opportunity created successfully:', data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to create opportunity', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 