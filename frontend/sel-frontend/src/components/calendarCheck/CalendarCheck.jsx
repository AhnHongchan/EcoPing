//CalendarCheck.jsx
import React, { useState, useEffect } from "react"; // React 및 훅을 가져옵니다.
import Calendar from "react-calendar"; // react-calendar 라이브러리에서 Calendar 컴포넌트를 가져옵니다.
import moment from "moment"; // moment.js 라이브러리에서 moment 함수를 가져옵니다.
import styles from "./CalendarCheck.module.css"; // 모듈 CSS 파일을 가져옵니다.
import "react-calendar/dist/Calendar.css";
import axios from "axios"; // axios 라이브러리를 가져옵니다.

// REST API 응답을 시뮬레이션하는 더미 데이터
const attendanceData = {
  attendance: [1, 2, 5, 14, 20, 23], // 출석한 날짜들
  todayCheck: false, // 오늘 출석 체크 여부
};

export default function CalendarComponent() {
  const [dateState, setDateState] = useState(new Date()); // 현재 선택된 날짜 상태를 관리합니다.
  const [attendance, setAttendance] = useState([]); // 출석 데이터를 관리하는 상태
  const [todayCheck, setTodayCheck] = useState(false); // 오늘의 출석 체크 여부를 관리하는 상태

  // 출석 데이터를 불러오는 useEffect 훅
  useEffect(() => {
    /**
     * 로컬 더미데이터로 불러오기
     */
    setAttendance(attendanceData.attendance); // 더미 데이터에서 출석 정보를 상태에 설정합니다.
    setTodayCheck(attendanceData.todayCheck); // 더미 데이터에서 오늘의 출석 여부를 상태에 설정합니다.
    /**
     * API로 데이터 불러오기
     */
    CallAttendanceMonth();
  
  }, []);

  //출석을 기록하는 Attend API와 그에 따른 동적 함수
  const handleAttendance = async () => {
    const today = moment().date(); // 오늘 날짜의 일을 가져옵니다.

    if (!attendance.includes(today)) {
      setAttendance([...attendance, today]); // 출석하지 않은 경우 출석 날짜에 추가합니다.
      setTodayCheck(true); // 오늘의 출석 체크 상태를 true로 설정합니다.
      // 여기서 업데이트된 출석 정보를 API로 전송하는 로직을 추가할 수 있습니다.
      // userId 는 int로

      try {
        // 출석 API 호출
        const response = await axios.get("/api/attendance/attend", {
          headers: { userId: 5 }, // userId 헤더 추가
        });

        setAttendance(response.data.check); // API 응답에서 새로운 출석 정보를 상태에 설정합니다.
        setTodayCheck(response.data.todayCheck); // 오늘의 출석 체크 상태를 true로 설정합니다.
      } catch (error) {
        console.error("Error updating attendance:", error);
      }

    }
  };

  //이번달 출석 목록을 불러오는 APi
  const CallAttendanceMonth = async () => {

      try {
        // 출석 API 호출
        const response = await axios.get("/api/attendance/check", {
          headers: { userId: 5 }, // userId 헤더 추가
        });

        setAttendance(response.data.check); // API 응답에서 새로운 출석 정보를 상태에 설정합니다.
        setTodayCheck(response.data.todayCheck); // 오늘의 출석 체크 상태를 true로 설정합니다.
        console.log(response.data.check);

      } catch (error) {
        console.error("Error updating attendance:", error);
      }

  };


  // 타일에 적용할 클래스 이름을 결정하는 함수
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      // 달력 뷰가 'month'일 때만 적용합니다.
      const day = date.getDate(); // 현재 타일의 날짜를 가져옵니다.
      if (attendance.includes(day)) {
        return styles.attended; // 출석한 날이면 'attended' 클래스 적용
      }
      if (day === new Date().getDate() && todayCheck) {
        return styles.today; // 오늘 날짜이며 출석 체크가 완료된 경우 'today' 클래스 적용
      }
    }
  };

  // 커스텀 헤더를 렌더링하는 함수 (년도를 제외하고 월만 표시)
  const renderCustomHeader = () => {
    const month = moment(dateState).format("M월"); // '8월', '9월' 등의 형식으로 월을 포맷팅합니다.
    return <div className={styles.monthHeader}>{month}</div>; // 포맷된 월을 표시하는 div를 반환합니다.
  };

  return (
    <div className={styles.fullBackGroundColor}>
      <div className={styles.MainCalendar}>
        <div className={styles.IntroduceCalendarCheck}>
          <div className={styles.IntroduceTitle}>
            신한 에코 리더 출석 이벤트
          </div>
          <div className={styles.IntroduceContent}>
            <div className={styles.IntroduceText}>
              <p>출석 체크 이벤트를 참여하고</p>
              <p>포인트를 받아가세요!</p>
              <p>연속 출석 이벤트까지!</p>
            </div>
            {/* 대표 이미지 */}
            <img
              src="/assets/icon/mascotTree.png"
              alt="mascot"
              className={styles.mascotTree}
            />
          </div>
        </div>

        <div className={styles.HowManyBox}>
          <div className={styles.ThisMonthCount}>
            <p>이번달 출석 횟수</p>
            <b>0일</b>
          </div>

          <div className={styles.ThisMonthPoint}>
            <p>이번달 출석 포인트</p>
            <b>0P</b>
          </div>
        </div>
        <div className={styles.calendarContent}>
          <p className={styles.dateText}>
            <b>{moment(dateState).format("M")}월</b>
          </p>
          <Calendar
            className={styles.calendar} // 달력에 모듈 CSS 스타일 적용
            value={dateState} // 달력에 표시할 현재 날짜 상태
            // minDetail="month" // 달력에서 최소로 볼 수 있는 단위 설정 (month)
            // maxDetail="month" // 달력에서 최대로 볼 수 있는 단위 설정 (month)
            tileClassName={tileClassName} // 각 날짜 타일에 적용할 클래스 이름 결정
            locale="kor-US" // Set the locale to 'en-US' to start the week on Sunday
            formatDay={(locale, date) => moment(date).format("D")} // "일" 없이 날짜만 표시
            prevLabel={null} // 이전 버튼 제거
            nextLabel={null} // 다음 버튼 제거
            showNavigation={false} // 네비게이션 표시 여부
            showNeighboringMonth={false} // 인접한 달의 날짜 표시 여부
            navigationLabel={renderCustomHeader} // 커스텀 헤더 사용
            onClickMonth={null} // 월 클릭 기능 비활성화
          />
          <button
            className={styles.attendanceButton} // 출석 버튼에 모듈 CSS 스타일 적용
            onClick={handleAttendance} // 출석 버튼 클릭 시 실행할 함수
            disabled={todayCheck} // 오늘 출석 체크가 완료된 경우 버튼 비활성화
          >
            {todayCheck ? "오늘은 이미 출석하셨습니다" : "오늘의 출석 체크"}
          </button>
        </div>
      </div>
    </div>
  );
}
