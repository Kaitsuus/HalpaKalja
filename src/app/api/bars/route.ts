import { NextRequest, NextResponse } from 'next/server';
import { barsService } from '../../../services/barService';
import { barSchema, bulkBarSchema } from '../../../validation/barValidation';
import { authenticate } from '../../../middleware/auth';
import { Bar } from '@/interface/interface';

export async function POST(req: NextRequest) {
  const authResponse = await authenticate(req);
  if (authResponse) return authResponse;

  const body = await req.json();

  if (Array.isArray(body)) {
    const { error, value } = bulkBarSchema.validate(body);

    if (error) {
      return new Response(error.details[0].message, { status: 400 });
    }

    try {
      const updatedBars = await barsService.addOrUpdateBars(value as Bar[]);
      return NextResponse.json(updatedBars, { status: 201 });
    } catch (error: any) {
      return new Response('Error adding or updating bars', { status: 500 });
    }
  } else {
    const { error, value } = barSchema.validate(body);

    if (error) {
      return new Response(error.details[0].message, { status: 400 });
    }

    try {
      const updatedBar = await barsService.addOrUpdateBar(value as Bar);
      return NextResponse.json(updatedBar, { status: 201 });
    } catch (error: any) {
      return new Response('Error adding or updating bar', { status: 500 });
    }
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  if (pathname === '/api/bars') {
    return handleGetBars(req);
  } else if (pathname.startsWith('/api/bars/name')) {
    return handleGetBarByName(req);
  } else {
    return new Response('Method Not Allowed', { status: 405 });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { error, value } = barSchema.validate(body);

  if (error) {
    return new Response(error.details[0].message, { status: 400 });
  }

  // If 'verified' is null, skip authentication
  const authResponse = value.verified !== null ? await authenticate(req) : null;
  if (authResponse) return authResponse;

  try {
    // Set verified to false
    value.verified = false;

    const updatedBar = await barsService.updateBar(value.id, value as Bar);
    return NextResponse.json(updatedBar, { status: 200 });
  } catch (error: any) {
    return new Response('Error updating bar', { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const authResponse = await authenticate(req);
  if (authResponse) return authResponse;

  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response('ID is required', { status: 400 });
  }

  try {
    await barsService.deleteBar(id);
    return new Response('Bar deleted successfully', { status: 200 });
  } catch (error: any) {
    return new Response('Error deleting bar', { status: 500 });
  }
}

async function handleGetBars(req: NextRequest) {
  try {
    const bars = await barsService.getBars();
    return NextResponse.json(bars);
  } catch (error) {
    return new Response('Error getting bars', { status: 500 });
  }
}

async function handleGetBarByName(req: NextRequest) {
  const url = new URL(req.url);
  const name = url.searchParams.get('name');
  if (!name) {
    return new Response('Name is required', { status: 400 });
  }

  try {
    const bar = await barsService.getBarByName(name);
    if (bar) {
      return NextResponse.json(bar);
    } else {
      return new Response('Bar not found', { status: 404 });
    }
  } catch (error) {
    return new Response('Error getting bar by name', { status: 500 });
  }
}
