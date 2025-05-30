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

// PATCH - Partially update a specific opportunity (useful for drag and drop status changes)
export async function PATCH(
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
    
    // Validate that we have some fields to update
    if (Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: 'No fields provided for update' },
        { status: 400 }
      );
    }

    // Prepare update data with only provided fields
    const updateData: any = {};
    
    if (body.status) {
      const validStatuses = ['Qualified', 'Proposal', 'Negotiation', 'Closed Won'];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { error: 'Invalid status. Valid statuses are: ' + validStatuses.join(', ') },
          { status: 400 }
        );
      }
      updateData.status = body.status;
    }
    
    if (body.name) {
      updateData.name = body.name.trim();
    }
    
    if (body.companyId) {
      updateData.companyId = parseInt(body.companyId);
    }
    
    if (body["dollar amount"] !== undefined && body["dollar amount"] !== null) {
      updateData["dollar amount"] = parseFloat(body["dollar amount"]);
    }
    
    if (body["close date"]) {
      updateData["close date"] = body["close date"];
    }

    if (body.progress !== undefined && body.progress !== null) {
      updateData.progress = parseFloat(body.progress);
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
    console.error('Error partially updating opportunity:', error);
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