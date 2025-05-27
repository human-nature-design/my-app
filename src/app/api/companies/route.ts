import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - List all companies
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('Companies')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Companies query error:', error);
      throw error;
    }

    console.log('Companies data:', data);

    // Add peopleCount as 0 for now (we can add this back later)
    const companiesWithCount = data?.map(company => ({
      ...company,
      peopleCount: 0
    })) || [];

    return NextResponse.json(companiesWithCount);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch companies', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST - Create a new company
export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/companies - Starting company creation');
    
    const body = await request.json();
    console.log('Received company data:', body);
    
    const { name, website, headquarters } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      console.log('Validation failed: name is required');
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    // Prepare the insert data - only include non-empty values
    const insertData: any = { 
      name: name.trim()
    };
    
    if (website && website.trim()) {
      insertData.website = website.trim();
    }
    
    if (headquarters && headquarters.trim()) {
      insertData.headquarters = headquarters.trim();
    }

    console.log('Inserting company data:', insertData);

    const { data, error } = await supabase
      .from('Companies')
      .insert(insertData)
      .select('*')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      );
    }

    console.log('Company created successfully:', data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json(
      { error: 'Failed to create company', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 