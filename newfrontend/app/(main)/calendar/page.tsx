'use client'
// CalendarCheck.tsx
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import styles from "./calendar.module.css";
import "react-calendar/dist/Calendar.css";
import instance from "@/lib/axios";
import "./calendar.css"

interface AttendanceData {
  attendance: number[];
  todayCheck: boolean;
}

export default function CalendarComponent() {
  const [dateState, setDateState] = useState<Date>(new Date());
  const [attendance, setAttendance] = useState<number[]>([]);
  const [todayCheck, setTodayCheck] = useState<boolean>(false);

  useEffect(() => {
    CallAttendanceMonth();
  }, []);

  const handleAttendance = async () => {
    const today = moment().date();

    if (!attendance.includes(today)) {
      setAttendance([...attendance, today]);
      setTodayCheck(true);

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
      console.log(response.data.check);
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const day = date.getDate();
      if (attendance.includes(day)) {
        return styles.attended;
      }
      if (day === new Date().getDate() && todayCheck) {
        return styles.today;
      }
    }
    return null;
  };

  const renderCustomHeader = () => {
    const month = moment(dateState).format("M월");
    return <div className={styles.monthHeader}>{month}</div>;
  };

  return (
    <div className="flex flex-col justify-center items-center">
        <div className={styles.HowManyBox}>
          <div className={styles.ThisMonthCount}>
            <p>이번달 출석 횟수</p>
            <b>{attendance.length}일</b>
          </div>

          <div className={styles.ThisMonthPoint}>
            <p>이번달 출석 포인트</p>
            <b>{attendance.length * 10}P</b>
          </div>
        </div>

      <div className={styles.MainCalendar}>
        <div className={styles.calendarContent}>
          <p className={styles.dateText}>
            <b>{moment(dateState).format("M")}월</b>
          </p>
          <Calendar
  className={styles.calendar}
  value={dateState}
  tileClassName={tileClassName}
  tileContent={({ date, view }) => {
    if (view === "month" && attendance.includes(date.getDate())) {
      return <div style={{ fontSize: "16px", marginTop: "4px" }}>🍀</div>; // 네잎 클로버 이모지 추가
    }
    return <div style={{ height: "16px", marginTop: "4px" }}></div>; // 기본 빈 공간을 모든 날짜에 추가
  }}
  locale="kor-US"
  formatDay={(locale, date) => moment(date).format("D")}
  prevLabel={null}
  nextLabel={null}
  showNavigation={false}
  showNeighboringMonth={false}
  navigationLabel={renderCustomHeader}
/>

          <button
            className={styles.attendanceButton}
            onClick={handleAttendance}
            disabled={todayCheck}
          >
            {todayCheck ? "오늘은 이미 출석하셨습니다" : "오늘의 출석 체크"}
          </button>
        </div>
      </div>
    </div>
  );
}
