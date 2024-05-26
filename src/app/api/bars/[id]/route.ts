import { NextRequest, NextResponse } from 'next/server';
import { barsService } from '../../../../services/barService';
import { barSchema } from '../../../../validation/barValidation';
import { authenticate } from '../../../../middleware/auth';
import { Bar } from '@/interface/interface';

export async function PUT(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();

  if (!id) {
    return new Response('ID is required', { status: 400 });
  }

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

    const updatedBar = await barsService.updateBar(id, value as Bar);
    return NextResponse.json(updatedBar, { status: 200 });
  } catch (error: any) {
    return new Response('Error updating bar', { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();

  if (!id) {
    return new Response('ID is required', { status: 400 });
  }

  const authResponse = await authenticate(req);
  if (authResponse) return authResponse;

  try {
    await barsService.deleteBar(id);
    return new Response('Bar deleted successfully', { status: 200 });
  } catch (error: any) {
    return new Response('Error deleting bar', { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return new Response('Method Not Allowed', { status: 405 });
}

export async function POST(req: NextRequest) {
  return new Response('Method Not Allowed', { status: 405 });
}
