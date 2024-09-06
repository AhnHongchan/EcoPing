"use client";

import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 기본 react-datepicker 스타일 임포트
import "../../../styles/account.css";
import "../../../styles/globals.css";
import { ko } from "date-fns/locale";
import instance from "@/lib/axios"; // axios 인스턴스 임포트
import { useRouter } from "next/navigation";

const CreateAccount = () => {
  const smallTitle = "text-lg font-bold mt-5";
  const router = useRouter(); // useRouter 훅 사용

  // useRef로 input 요소를 참조하여 직접 값을 가져오도록 설정
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const [emailValid, setEmailValid] = useState<boolean | null>(null); // 이메일 중복 확인 결과 상태
  const [gender, setGender] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 성별 옵션 배열
  const genderOptions = [
    { label: "남", value: "male" },
    { label: "여", value: "female" },
    { label: "비공개", value: "private" },
  ];

  // 이메일 중복 확인 요청 함수
  const checkEmailDuplication = async () => {
    const email:string = emailRef.current?.value || '';
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    try {
      const response = await instance.get("/users/emailExists", {params: {email}});

      if (response.status === 200) {
        // 이메일 사용 가능
        setEmailValid(true);
        alert("사용 가능한 이메일입니다.");
      } 
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        // 이메일 중복됨
        setEmailValid(false);
        alert("이미 사용 중인 이메일입니다.");
      } else {
        console.error("Error during email check:", error);
        alert("이메일 중복 확인 중 오류가 발생했습니다.");
      }
    }
  };

  // 회원 가입 요청 처리 함수
  const handleCreateAccount = async () => {
    const name = nameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const phoneNumber = phoneNumberRef.current?.value || '';

    if (emailValid === false) {
      alert("이미 사용 중인 이메일입니다. 다른 이메일을 사용해 주세요.");
      return;
    }

    try {
      const response = await instance.post("/users/register", {
        name,
        gender,
        birthDate: selectedDate ? selectedDate.toISOString().split("T")[0] : null,
        email,
        password,
        phoneNumber,
      });

      if (response.status === 200) {
        console.log("회원 가입 성공:", response);
        alert("회원 가입이 성공적으로 완료되었습니다!");
        router.push('/')
      } else {
        console.error("회원가입 실패:", response);
        alert("회원 가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error during account creation:", error);
      alert("서버 오류로 회원 가입에 실패했습니다.");
    }
  };

  return (
    <div>
      <p className="text-3xl font-extrabold">회원 가입</p>
      <br />
      <p className={smallTitle}>이름</p>
      <input
        type="text"
        placeholder="이름을 적어주세요"
        className="input-style"
        ref={nameRef} // input 요소에 useRef 연결
      />
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
      <p className={smallTitle}>핸드폰 번호</p>
      <div>
        <input type="text" placeholder="010-1234-5678" className="input-style" ref={phoneNumberRef}/>
      </div>
      <p className={smallTitle}>아이디</p>
      <div>
        <input
          type="text"
          placeholder="아이디를 적어주세요"
          className="input-style"
          ref={emailRef} // input 요소에 useRef 연결
        />
        <button className="bg-green-700 text-white rounded-md ml-3 p-1" onClick={checkEmailDuplication}>
          중복 확인
        </button>
      </div>
      <p className={smallTitle}>비밀번호</p>
      <div>
        <input
          type="password"
          placeholder="비밀번호를 적어주세요"
          className="input-style"
          ref={passwordRef} // input 요소에 useRef 연결
        />
      </div>
      <button
        className="bg-green-700 text-white rounded-md mt-3 p-1"
        onClick={handleCreateAccount}
      >
        회원 가입
      </button>
    </div>
  );
};

export default CreateAccount;
