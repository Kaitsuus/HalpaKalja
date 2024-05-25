// pages/api/contact.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { nimi, osoite, paikkakunta, drink1, price1, drink2, price2, drink3, price3 } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: 'New Bar Submission',
      text: `
        Name: ${nimi}
        Address: ${osoite}
        City: ${paikkakunta}
        Drinks:
        - ${drink1}: €${price1}
        - ${drink2}: €${price2}
        - ${drink3}: €${price3}
      `,
    });

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email.' }, { status: 500 });
  }
}
