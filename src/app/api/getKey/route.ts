import { NextResponse } from 'next/server';

export const GET = async (): Promise<NextResponse> => {
  return NextResponse.json({ key: process.env.RAZORPAY_KEY_ID }, { status: 200 });
};

export const POST = async (): Promise<NextResponse> => {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
};