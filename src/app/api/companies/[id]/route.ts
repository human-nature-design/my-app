import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Get a specific company by ID with people count
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid company ID' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('Companies')
      .select(`
        *,
        People (count)
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Company not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    // Transform the data to include people count
    const companyWithCount = {
      ...data,
      peopleCount: data.People?.[0]?.count || 0
    };

    return NextResponse.json(companyWithCount);
  } catch (error) {
    console.error('Error fetching company:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company' },
      { status: 500 }
    );
  }
}

// PUT - Update a specific company
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid company ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, website, headquarters } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('Companies')
      .update({ name, website, headquarters })
      .eq('id', id)
      .select(`
        *,
        People (count)
      `)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Company not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    // Transform the data to include people count
    const companyWithCount = {
      ...data,
      peopleCount: data.People?.[0]?.count || 0
    };

    return NextResponse.json(companyWithCount);
  } catch (error) {
    console.error('Error updating company:', error);
    return NextResponse.json(
      { error: 'Failed to update company' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a specific company
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid company ID' },
        { status: 400 }
      );
    }

    // Check if company has associated people
    const { data: people, error: peopleError } = await supabase
      .from('People')
      .select('id')
      .eq('companyId', id)
      .limit(1);

    if (peopleError) throw peopleError;

    if (people && people.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete company with associated people. Please reassign or delete the people first.' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('Companies')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    return NextResponse.json(
      { error: 'Failed to delete company' },
      { status: 500 }
    );
  }
} 