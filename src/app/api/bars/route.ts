import { NextRequest, NextResponse } from 'next/server';
import { barsService } from '../../../services/barService';
import { barSchema } from '../../../validation/barValidation';
import { authenticate } from '../../../middleware/auth';

export async function POST(req: NextRequest) {
  const authResponse = await authenticate(req);
  if (authResponse) return authResponse;

  const body = await req.json();
  const { error, value } = barSchema.validate(body);

  if (error) {
    return new Response(error.details[0].message, { status: 400 });
  }

  try {
    const newBar = await barsService.addBar(value);
    return NextResponse.json(newBar, { status: 201 });
  } catch (error: any) {
    if (error.message === 'Bar with the same name, latitude, and longitude already exists') {
      return new Response(error.message, { status: 409 });
    } else {
      return new Response('Error adding bar', { status: 500 });
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