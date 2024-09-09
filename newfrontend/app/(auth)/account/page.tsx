"use client";

import { useRef, useState } from "react";
import "../../../styles/account.css";
import "../../../styles/globals.css";
import instance from "@/lib/axios";
import { useRouter } from "next/navigation";

const CreateAccount = () => {
  const smallTitle = "text-lg font-bold mt-5";
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [emailMessage, setEmailMessage] = useState<string>(""); // 이메일 상태 메시지
  const [gender, setGender] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState<string>("1");
  const [selectedDay, setSelectedDay] = useState<string>("1");
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState<JSX.Element | string>("");
  const [selectedDomain, setSelectedDomain] = useState<string>("직접 입력");
  const [customDomain, setCustomDomain] = useState<string>("");

  const genderOptions = [
    { label: "남", value: "male" },
    { label: "여", value: "female" },
    { label: "비공개", value: "private" },
  ];

  const domainOptions = ["직접 입력", "gmail.com", "naver.com", "kakao.com"];

  const selectClasses = "form-select h-8 rounded-md bg-green-100 shadow-md focus:ring focus:ring-green-500 focus:ring-opacity-50";

  const checkEmailDuplication = async () => {
    const email = emailRef.current?.value || "";
    const domain = selectedDomain === "직접 입력" ? customDomain : selectedDomain;
    
    if (!email || !domain) {
      setEmailMessage("이메일을 입력하거나 선택해주세요.");
      return;
    }

    const fullEmail = `${email}@${domain}`;

    try {
      const response = await instance.get("/users/emailExist", {
        params: { email: fullEmail },
      });

      if (response.status === 200) {
        setEmailValid(true);
        setEmailMessage("사용 가능한 이메일입니다."); // 사용 가능 메시지
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        setEmailValid(false);
        setEmailMessage("이미 사용 중인 이메일입니다. 다른 이메일을 사용해 주세요.");
      } else {
        console.error("Error during email check:", error);
        setEmailMessage("서버 오류로 이메일 중복 확인에 실패했습니다.");
      }
    }
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError("");
      return true;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    const isValid = passwordRegex.test(password);
    setPasswordError(
      isValid ? "" : (
        <>
          비밀번호는 8자에서 20자 사이로
          <br />
          영문, 숫자, 특수문자를 포함해야 합니다.
        </>
      )
    );
    return isValid;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValid(validatePassword(e.target.value));
  };

  const handleCreateAccount = async () => {
    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const domain = selectedDomain === "직접 입력" ? customDomain : selectedDomain;
    const password = passwordRef.current?.value || "";
    const phoneNumber = phoneNumberRef.current?.value || "";

    // 이메일 유효성 검사를 제거
    if (!validatePassword(password)) return;

    const birthDate = `${selectedYear}-${selectedMonth.padStart(2, '0')}-${selectedDay.padStart(2, '0')}`;

    try {
      const response = await instance.post("/users/register", {
        name,
        gender,
        birthDate,
        email: `${email}@${domain}`,
        password,
        phoneNumber,
      });

      if (response.status === 200) {
        alert("회원 가입이 성공적으로 완료되었습니다!");
        router.push("/");
      } else {
        alert("회원 가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error during account creation:", error);
      alert("서버 오류로 회원 가입에 실패했습니다.");
    }
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedDomain(value);
    setCustomDomain(value !== "직접 입력" ? value : "");
  };

  const handleGenderChange = (value: string) => {
    setGender(gender === value ? "" : value);
  };

  const renderSelect = (options: string[], onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, defaultValue: string) => (
    <select className={selectClasses} onChange={onChange} value={defaultValue}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  return (
    <div>
      <p className="text-3xl font-extrabold">회원 가입</p>
      <br />
      <p className={smallTitle}>이름</p>
      <input
        type="text"
        placeholder="이름을 적어주세요"
        className="input-style"
        ref={nameRef}
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
              onChange={() => handleGenderChange(option.value)}
              className="mr-2 appearance-none w-4 h-4 border border-gray-400 rounded-sm checked:bg-green-400 checked:border-green-400 focus:outline-none shadow-sm"
            />
            {option.label}
          </label>
        ))}
      </div>
      <p className={smallTitle}>생년월일</p>
      <div className="flex items-center space-x-2 mt-2">
        {renderSelect(Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => (new Date().getFullYear() - i).toString()), (e) => setSelectedYear(e.target.value), selectedYear)}
        {renderSelect(Array.from({ length: 12 }, (_, i) => (i + 1).toString()), (e) => setSelectedMonth(e.target.value), selectedMonth)}
        {renderSelect(Array.from({ length: 31 }, (_, i) => (i + 1).toString()), (e) => setSelectedDay(e.target.value), selectedDay)}
      </div>
      <p className={smallTitle}>핸드폰 번호</p>
      <input
        type="text"
        placeholder="010-1234-5678"
        className="input-style"
        ref={phoneNumberRef}
      />
      <p className={smallTitle}>이메일</p>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="이메일"
          className="input-style w-24"
          ref={emailRef}
        />
        <span>@</span>
        {selectedDomain === "직접 입력" ? (
          <input
            type="text"
            placeholder="직접 입력"
            className="input-style w-24"
            value={customDomain}
            onChange={(e) => setCustomDomain(e.target.value)}
          />
        ) : (
          <input
            type="text"
            className="input-style w-24"
            value={selectedDomain}
            readOnly
          />
        )}
        {renderSelect(domainOptions, handleDomainChange, selectedDomain)}
      </div>
      <button
        type="button"
        className="bg-green-700 text-white rounded-md p-1 mt-1 shadow-md"
        onClick={checkEmailDuplication}
      >
        중복 확인
      </button>
      {emailMessage && (
        <p className={`text-sm mt-1 ${emailValid ? "text-green-500" : "text-red-500"}`}>{emailMessage}</p>
      )}
      <p className={smallTitle}>비밀번호</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="password"
          placeholder="비밀번호를 적어주세요"
          className={`input-style ${passwordValid ? "" : "border-red-500"}`}
          ref={passwordRef}
          onChange={handlePasswordChange}
          autoComplete="new-password"
        />
        {!passwordValid && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
        )}
      </form>
      <button
        className="bg-green-700 text-white rounded-md my-1 p-1 shadow-md"
        onClick={handleCreateAccount}
      >
        회원 가입
      </button>
    </div>
  );
};

export default CreateAccount;
