import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Get a specific opportunity by ID with company information
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid opportunity ID' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('Opportunities')
      .select(`
        *,
        Companies (
          id,
          name,
          website,
          headquarters,
          status
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Opportunity not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunity' },
      { status: 500 }
    );
  }
}

// PUT - Update a specific opportunity
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid opportunity ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, "dollar amount": dollarAmount, companyId, "close date": closeDate, status } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Opportunity name is required' },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = { 
      name: name.trim(),
      status: status || 'Qualified'
    };
    
    if (companyId) {
      updateData.companyId = parseInt(companyId);
    }
    
    if (dollarAmount !== undefined && dollarAmount !== null) {
      updateData["dollar amount"] = parseFloat(dollarAmount);
    }
    
    if (closeDate) {
      updateData["close date"] = closeDate;
    }

    const { data, error } = await supabase
      .from('Opportunities')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        Companies (
          id,
          name,
          website,
          headquarters,
          status
        )
      `)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Opportunity not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to update opportunity' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a specific opportunity
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid opportunity ID' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('Opportunities')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'Opportunity deleted successfully' });
  } catch (error) {
    console.error('Error deleting opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to delete opportunity' },
      { status: 500 }
    );
  }
} 