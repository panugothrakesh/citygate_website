import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBooking extends Document {
  startDate: string;
  endDate: string;
  userDetails: {
    name: string;
    email: string;
    phone: string;
    amountPaid: number;
    noOfPeople: number;
  };
  paymentDetails: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  };
}

const BookingSchema: Schema<IBooking> = new Schema({
  startDate: {
    type: String,
    required: true,
    unique: true,
  },
  endDate: {
    type: String,
    required: true,
    unique: true,
  },
  userDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    amountPaid: { type: Number, required: true },
    noOfPeople: { type: Number, required: true },
  },
  paymentDetails: {
    razorpay_payment_id: { type: String, required: true },
    razorpay_order_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },
  },
});

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
