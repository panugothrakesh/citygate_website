"use client";

import React, { useState } from "react";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import CustomCalender from "@/components/Calendar";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
interface RazorpayInstance {
  open: () => void;
}

interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key?: string;
  amount?: number;
  currency?: string;
  name?: string;
  description?: string;
  handler?: (response: PaymentResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
    noOfpeople?: number;
  };
  notes?: {
    address?: string;
  };
  theme?: {
    color?: string;
  };
}

const BookingPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "+91",
    amountPaid: 20000,
    noOfpeople: 1,
  });

  const [bookingDone, setBookingDone] = useState(false);

  const [selectedRange, setSelectedRange] = useState<{
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  }>({ startDate: null, endDate: null });

  const handleRangeSelect = (range: { startDate: Dayjs | null; endDate: Dayjs | null }) => {
    setSelectedRange(range);
    console.log("Selected Range:", range);
    const days = range.endDate?.diff(range.startDate, "day");
    if (days) {
      setUserDetails({ ...userDetails, amountPaid: days * 20000 });
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleConfirmBooking = async () => {
    if (
      !userDetails.name ||
      !userDetails.email ||
      !userDetails.phone ||
      !selectedRange.startDate ||
      !selectedRange.endDate
    ) {
      alert("Please fill all the mandatory fields.");
      return;
    }

    try {
      const { data: orderData } = await axios.post(
        "https://citygate.in/api/order",
        { amount: userDetails.amountPaid }
      );

      const { data: keyData } = await axios.get(
        "https://citygate.in/api/getKey"
      );

      const formattedRange = {
        startDate: dayjs(selectedRange.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(selectedRange.endDate).format("YYYY-MM-DD"),
      };

      console.log(userDetails)
      const options = {
        key: keyData.keyId,
        amount: orderData.order.amount,
        currency: "INR",
        name: "Rohith Chowki",
        description: "Payment for booking",
        order_id: orderData.order.id,
        handler: async function (response: PaymentResponse) {
          try {
            const paymentData = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              userDetails : {
                ...userDetails,
                noOfpeople: Number(userDetails.noOfpeople),
              },
              startDate: formattedRange.startDate,
              endDate: formattedRange.endDate,
            };
            console.log("Payment Data:", paymentData);

            const saveResponse = await axios.post(
              "https://citygate.in/api/payment",
              paymentData
            );

            if (saveResponse.status === 200) {
              alert("Payment successful and booking confirmed!");
              setSelectedRange({ startDate: null, endDate: null });
              setBookingDone(true);
              setUserDetails({
                ...userDetails,
                name: "",
                email: "",
                phone: "",
                
              });
            } else {
              alert("Error saving booking details.");
            }
          } catch (error) {
            console.error("Error saving payment and booking details:", error);
            alert("Payment successful but booking failed.");
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone,
          noOfpeople: userDetails.noOfpeople,
        },
        notes: {
          address: "Booking Service Address",
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error initiating Razorpay payment:", error);
      alert("Error initiating payment. Please try again later.");
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:h-screen gap-5 items-center justify-center p-4 pt-10 md:p-12">
      <div className="w-full md:w-[40%] rounded-3xl h-full mt-10 overflow-hidden relative bg-[#1D4634]">
        <Image
          className="w-full h-full object-cover scale-125"
          src="https://res.cloudinary.com/dauarqbjt/image/upload/v1736706764/OutDoor_ny9qus.jpg"
          alt="Hero"
          layout="fill"
        />
        <div className="absolute items-end justify-end top-0 left-0 w-full h-full bg-gradient-to-b from-[#1D4634]/60 via-[#1D4634]/30 to-[#1D4634]/20">
          <h1 className="text-4xl md:text-5xl text-white p-12 font-semibold text-start -white z-10 leading-[1.02]">
            Book your next
            <br />
            outdoor adventure
          </h1>
          <p className="text-white z-10 px-12">
            Book your next outdoor adventure with us and enjoy the beauty of the
            great outdoors.
          </p>
        </div>
      </div>

      <div className="md:h-full md:mt-10 z-50 rounded-3xl w-full md:w-2/3 flex flex-col items-center justify-between bg-white p-4 py-12 md:p-12 space-y-6 ">
        {!bookingDone ? (
          <>
            <div className="flex md:px-8 flex-col w-full items-start">
              <h2 className="text-2xl font-semibold mb-4">Book Now</h2>
              <p className="text-gray-500">
                Fill in the form below to book your next outdoor adventure.
              </p>
              <p className="text-black text-lg py-2">
                Price starts from <strong>₹2,000</strong> per night.
              </p>
            </div>

            <div className="flex w-full flex-col overflow-y-scroll lg:flex-row">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="rounded-lg py-6 p-2 md:p-6 pt-0 w-full"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userDetails.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="email"
                  >
                    Email ID
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={userDetails.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your Phone"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="noOfpeople"
                  >
                    Number of People
                  </label>
                  <select
                    id="noOfpeople"
                    name="noOfpeople"
                    value={userDetails.noOfpeople}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                  </select>
                </div>
              </form>

              <div className="rounded-lg w-full flex flex-col items-center">
                <CustomCalender
                  selectedRange={selectedRange}
                  onRangeSelect={handleRangeSelect}
                />
                {/* {selectedDate && (
              <p className="mt-4 text-center">
                You have selected: {selectedDate.format("YYYY-MM-DD")}
              </p>
            )} */}
              </div>
            </div>

            <button
              type="submit"
              className="w-1/2 bg-[#1D4634] text-white font-medium py-2 rounded-2xl hover:bg-[#32644f] transition-colors"
              onClick={handleConfirmBooking}
            >
              Submit
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center gap-15 flex-col">
              <div className="flex flex-col w-full mb-20 items-start">
                <h2 className="text-2xl font-semibold mb-4">
                  Booking Confirmed
                </h2>
                <p className="text-gray-500">
                  Your booking has been confirmed. You will receive an email
                  with the booking details shortly.
                </p>
              </div>

              <button
                className="w-1/2 bg-[#1D4634] text-white font-medium py-2 rounded-2xl hover:bg-[#32644f] transition-colors"
                onClick={() => setBookingDone(false)}
              >
                Return to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
