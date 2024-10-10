'use client'

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import instance from "@/lib/axios";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// 더미 데이터 타입 정의
interface AttendanceData {
  attendance: number[];
  todayCheck: boolean;
}

const CalendarComponent = () => {
  const [dateState, setDateState] = useState<Date>(new Date());
  const [attendance, setAttendance] = useState<number[]>([]);
  const [todayCheck, setTodayCheck] = useState<boolean>(false);

  useEffect(() => {
    CallAttendanceMonth();
  }, []);

  const handleAttendance = async () => {
    const today = moment().date();

    if (!attendance.includes(today)) {
      try {
        const response = await instance.get("/attendance/attend", {
     
        });
        setAttendance(response.data.check);
        setTodayCheck(response.data.todayCheck);
      } catch (error) {
        console.error("Error updating attendance:", error);
      }
    }
  };

  const CallAttendanceMonth = async () => {
    try {
      const response = await instance.get("/attendance/check", {
      
      });
      setAttendance(response.data.check);
      setTodayCheck(response.data.todayCheck);
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const day = date.getDate();
      const currentMonth = date.getMonth();
      const currentYear = date.getFullYear();
    
      // 달력의 날짜가 현재 표시된 달의 날짜와 일치하는지 확인
      const selectedMonth = dateState.getMonth();
      const selectedYear = dateState.getFullYear();
    
      // Debugging logs
      console.log("Date:", date);
      console.log("Day:", day);
      console.log("Attendance:", attendance);
      console.log("Current Month:", currentMonth, "Selected Month:", selectedMonth);
      console.log("Current Year:", currentYear, "Selected Year:", selectedYear);
      if (
        attendance.includes(day) &&
        currentMonth === selectedMonth &&
        currentYear === selectedYear
      ) {
        console.log("Adding class to:", day);
        return "bg-blue-700 text-white rounded-full";
      }
    
      // 오늘 날짜가 오늘인지 확인하고 오늘 출석 체크가 되어 있는지 확인
      const today = new Date();
      if (
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear() &&
        todayCheck
      ) {
        return "bg-blue-700 text-white rounded-full";
      }
    }
  };
  
  

  return (
    <div className="flex flex-col justify-center items-center">
        <div className="mt-[90px] bg-white w-[90%] rounded-2xl shadow-custom-lg">
          <p className="text-lg ml-6 mt-8 text-black">
            <b>{moment(dateState).format("M")}월</b>
          </p>
          
          <Calendar
            value={dateState}
            className="border-none bg-white mt-4"
            locale="ko-KR"
            formatDay={(locale, date) => moment(date).format("D")}
            prevLabel={null}
            nextLabel={null}
            showNavigation={false}
            showNeighboringMonth={false}
            tileClassName={tileClassName}
          />

          <button
            onClick={handleAttendance}
            disabled={todayCheck}
            className={`mx-auto my-5 px-5 py-2.5 mt-8 mb-8 text-base rounded-full block text-center transition-colors
              ${todayCheck 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-blue-700 hover:bg-blue-800 cursor-pointer'} 
              text-white`}
          >
            {todayCheck ? "오늘은 이미 출석하셨습니다" : "오늘의 출석 체크"}
          </button>
        </div>

      <style jsx global>{`
        .react-calendar {
          border: none;
          background: transparent;
          font-family: inherit;
        }
        .react-calendar__tile {
          height: 50px !important;
          width: 50px !important;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }
        .react-calendar__month-view__weekdays__weekday {
          text-align: center;
          font-weight: bold;
          color: #666;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default CalendarComponent;