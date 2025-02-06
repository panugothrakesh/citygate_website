import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import Booking, { IBooking } from '../../../utils/models/Booking';
import dayjs from 'dayjs';

export const GET = async () => {
  try {
    await dbConnect();

    const bookings: IBooking[] = await Booking.find({}, 'startDate endDate');

    const bookedDates: string[] = bookings.flatMap((booking) => {
      const startDate = dayjs(booking.startDate);
      const endDate = dayjs(booking.endDate);

      const dates = [];
      let currentDate = startDate;

      while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
        dates.push(currentDate.format('YYYY-MM-DD'));
        currentDate = currentDate.add(1, 'day'); 
      }

      return dates;
    });

    return NextResponse.json({ success: true, bookedDates }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching booked dates:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};
