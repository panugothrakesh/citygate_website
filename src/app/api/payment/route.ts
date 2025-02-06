import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../utils/dbConnect";
import Booking from "../../../utils/models/Booking";
import crypto from "crypto";
import { sendBookingEmail } from "../../../utils/sendEmail";
// import { sendConfirmationSMS } from "../../../utils/sendSMS";
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  await dbConnect();

  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    userDetails,
    startDate,
    endDate,
  } = await req.json();

  try {
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { message: "Invalid payment signature" },
        { status: 400 }
      );
    }

    const newBooking = new Booking({
      startDate,
      endDate,
      userDetails,
      paymentDetails: {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      },
    });

    await newBooking.save();
    // await sendConfirmationSMS(userDetails, date);
    await sendBookingEmail(userDetails, startDate, endDate);

    return NextResponse.json(
      { message: "Booking successful!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error processing payment", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = async (): Promise<NextResponse> => {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
};
