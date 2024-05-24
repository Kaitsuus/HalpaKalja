import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function authenticate(req: NextRequest): Promise<NextResponse | undefined> {
  const token = req.headers.get('Authorization')?.split('Bearer ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decodedToken; // Attach the user to the request
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }
}
