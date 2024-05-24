import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '../../../../services/userService';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const { token, supabaseToken } = await authenticateUser(email, password);
    return NextResponse.json({ token, supabaseToken }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Invalid email or password' }, { status: 401 });
  }
}
