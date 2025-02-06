import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { amount } = await req.json();

    const options = { amount: amount * 100, currency: 'INR' };
    const order = await razorpay.orders.create(options);

    return NextResponse.json({ order }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const GET = async (): Promise<NextResponse> => {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
};