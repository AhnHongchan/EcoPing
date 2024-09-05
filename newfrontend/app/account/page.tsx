"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 기본 react-datepicker 스타일 임포트
import "../../styles/account.css";
import { ko } from "date-fns/locale";

const CreateAccount = () => {
  const smallTitle = "text-lg font-bold mt-5";
  const [gender, setGender] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 성별 옵션 배열
  const genderOptions = [
    { label: "남", value: "male" },
    { label: "여", value: "female" },
    { label: "비공개", value: "private" },
  ];

  return (
    <div>
      <p className="text-3xl font-extrabold">회원 가입</p>
      <br />
      <p className={smallTitle}>이름</p>
      <input type="text" placeholder="이름을 적어주세요" className="input-style" />
      <br />
      <p className={smallTitle}>성별</p>
      <div className="flex items-center space-x-4 mt-2">
        {genderOptions.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="checkbox"
              name="gender"
              value={option.value}
              checked={gender === option.value}
              onChange={(e) => setGender(e.target.value)}
              className="mr-2 appearance-none w-4 h-4 border border-gray-400 rounded-sm checked:bg-green-400 checked:border-green-400 focus:outline-none shadow-sm"
            />
            {option.label}
          </label>
        ))}
      </div>
      <p className={smallTitle}>생년월일</p>
      <div className="flex items-center">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="생년월일을 선택해주세요"
          className="input-style w-full"
          showYearDropdown
          showMonthDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          minDate={new Date(1900, 0, 1)}
          maxDate={new Date()}
          locale={ko} // 한국어 로케일 설정
        />
      </div>
      <p className={smallTitle}>아이디</p>
      <input type="text" placeholder="아이디를 적어주세요" className="input-style" />
      <p className={smallTitle}>비밀번호</p>
      <input type="text" placeholder="비밀번호를 적어주세요" className="input-style" />
    </div>
  );
};

export default CreateAccount;
