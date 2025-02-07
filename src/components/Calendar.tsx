import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";

type DateRangeSelectorProps = {
  onRangeSelect: (range: { startDate: Dayjs | null; endDate: Dayjs | null }) => void;
  selectedRange?: { startDate: Dayjs | null; endDate: Dayjs | null };
};

const CustomCalender: React.FC<DateRangeSelectorProps> = ({ onRangeSelect }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    // Fetch booked dates
    axios
      .get("https://citygate.in/api/booking")
      .then((response) => {
        if (response.data?.success && Array.isArray(response.data.bookedDates)) {
          setBookedDates(response.data.bookedDates);
        } else {
          console.error("Invalid data format for booked dates");
        }
      })
      .catch((error) => console.error("Error fetching booked dates:", error));
  }, []);

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const daysInMonth = endOfMonth.date();
  const startWeekday = startOfMonth.day();

  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Handle date selection
  const handleDateClick = (date: Dayjs) => {
    if (isDateDisabled(date)) return;

    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(date);
      setEndDate(null);
      onRangeSelect({ startDate: date, endDate: null });
    } else if (date.isBefore(startDate)) {
      // Reset if clicked before the start date
      setStartDate(date);
      setEndDate(null);
      onRangeSelect({ startDate: date, endDate: null });
    } else {
      // Set the end date
      setEndDate(date);
      onRangeSelect({ startDate, endDate: date });
    }
    // console.log("Selected range:", startDate, endDate?.format("YYYY-MM-DD"));
  };

  // Check if date is booked or in the past
  const isDateDisabled = (date: Dayjs) => {
    const today = dayjs().startOf("day");
    return (
      bookedDates &&
      (bookedDates.includes(date.format("YYYY-MM-DD")) || date.isBefore(today))
    );
  };

  // Check if a date is within the selected range
  const isInRange = (date: Dayjs) => {
    return startDate && endDate && date.isAfter(startDate) && date.isBefore(endDate);
  };

  // Generate calendar days
  const generateDays = () => {
    const days = [];

    // Empty slots for days before the start of the month
    for (let i = 0; i < startWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    // Actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = startOfMonth.date(i);
      const isToday = date.isSame(dayjs(), "day");
      const isDisabled = isDateDisabled(date);
      const isStartDate = startDate?.isSame(date, "day");
      const isEndDate = endDate?.isSame(date, "day");
      const isWithinRange = isInRange(date);

      days.push(
        <div
          key={i}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
            isDisabled
              ? "text-gray-400 cursor-not-allowed font-medium"
              : "hover:bg-[#316751] hover:text-white font-semibold cursor-pointer"
          } ${
            isStartDate
              ? "bg-green-800 text-white font-bold"
              : isEndDate
              ? "bg-green-800 text-white font-bold"
              : isWithinRange
              ? "bg-green-500 text-black"
              : ""
          } ${isToday ? "ring-2 ring-[#1D4634]" : ""}`}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  // Navigate months
  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) =>
      direction === "prev" ? prev.subtract(1, "month") : prev.add(1, "month")
    );
  };

  return (
    <div className="p-6 bg-white shadow hover:shadow-lg transition-shadow border border-zinc-200 rounded-2xl w-full md:max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{currentDate.format("MMMM YYYY")}</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-2 rounded-full hover:bg-[#1D4634] hover:text-white bg-zinc-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => navigateMonth("next")}
            className="p-2 rounded-full hover:bg-[#1D4634] hover:text-white bg-zinc-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekdays.map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
      </div>
      {/* Days */}
      <div className="grid grid-cols-7 gap-2">{generateDays()}</div>
    </div>
  );
};

export default CustomCalender;
