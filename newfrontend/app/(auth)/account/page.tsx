"use client";

import { useRef, useState } from "react";
import "../../../styles/account.css";
import "../../../styles/globals.css";
import instance from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import 'bootstrap-icons/font/bootstrap-icons.css';

const CreateAccount = () => {
  const smallTitle = "text-lg font-bold mt-5";
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
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
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailLoading, setEmailLoading] = useState<boolean>(false); // 중복 확인 버튼 로딩 상태

  const genderOptions = [
    { label: "남", value: "male" },
    { label: "여", value: "female" },
    { label: "비공개", value: "private" },
  ];

  const domainOptions = ["직접 입력", "gmail.com", "naver.com", "kakao.com"];

  const selectClasses = "form-select h-8 rounded-md bg-green-100 shadow-md focus:ring focus:ring-green-500 focus:ring-opacity-50";

  const checkEmailDuplication = async () => {
    setEmailLoading(true); // 로딩 시작
    const email = emailRef.current?.value || "";
    const domain = selectedDomain === "직접 입력" ? customDomain : selectedDomain;
  
    if (!email) {
      setEmailMessage("이메일을 입력해주세요.");
      setEmailLoading(false);
      return;
    }
  
    // 이메일 정규 표현식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const fullEmail = `${email}`;
  
    if (!emailRegex.test(fullEmail)) {
      setEmailMessage("올바른 이메일 형식을 입력해주세요.");
      setEmailValid(false);
      setEmailLoading(false);
      return;
    }
  
    try {
      const response = await instance.get("/users/emailExist", {
        params: { email: fullEmail },
      });
  
      if (response.status === 200) {
        setEmailValid(true);
        setEmailMessage("사용 가능한 이메일입니다."); 
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        setEmailValid(false);
        setEmailMessage("이미 사용 중인 이메일입니다. 다른 이메일을 사용해 주세요.");
      } else {
        console.error("Error during email check:", error);
        setEmailMessage("서버 오류로 이메일 중복 확인에 실패했습니다.");
      }
    } finally {
      setEmailLoading(false); // 로딩 종료
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

  const handlePasswordChange = () => {
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    setPasswordValid(validatePassword(password));
    setPasswordMatch(password === confirmPassword);
};


  const handleCreateAccount = async () => {
    if (loading) return; // 이미 로딩 중인 경우 중복 요청 방지
  
    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const domain = selectedDomain === "직접 입력" ? customDomain : selectedDomain;
    const password = passwordRef.current?.value || "";
    const phoneNumber = phoneNumberRef.current?.value || "";
  
    if (!validatePassword(password)) return;
  
    const birthDate = `${selectedYear}-${selectedMonth.padStart(2, '0')}-${selectedDay.padStart(2, '0')}`;
  
    setLoading(true); // 로딩 시작
  
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
    } finally {
      setLoading(false); // 로딩 종료
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
    <select className="form-select rounded-md p-3 mr-2 bg-transparent" style={{ outline: 'none' }}  onChange={onChange} value={defaultValue}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center w-10 h-10 bg-loginLightGreen rounded-full ml-10 mt-10">
        <Link href="/">
          <i className="bi bi-chevron-left text-loginDarkGreen"></i>
        </Link>
      </div>
      <p className="text-2xl font-bold text-center text-loginDarkGreen mt-8">회원 가입</p>
      <p className="text-center text-gray-400 mb-6 mt-2">새로운 계정을 생성해 보세요</p>

      <div className="flex flex-col items-center">
        <div className="w-10/12 z-10">
          <p className="translate-y-3 translate-x-3 bg-white w-12 text-center">이메일</p>
        </div>
        <div className="border-2 border-lime-800 w-10/12 rounded">
          <div className="relative">
            <input
              type="email"
              placeholder="example@email.com"
              className="p-3 w-full focus:outline-none rounded"
              ref={emailRef}
            />
          </div>
        </div>
        <div className="w-10/12">
          {emailMessage && (
            <p className={`text-sm mt-1 ${emailValid ? "text-green-500" : "text-red-500"}`}>{emailMessage}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button
          type="button"
          className="bg-loginDarkGreen text-white rounded mt-4 w-10/12 p-3 shadow-md"
          onClick={checkEmailDuplication}
          disabled={emailLoading} // 로딩 중일 때 버튼 비활성화
        >
          {emailLoading ? (
            <div className="p-2 flex flex-col items-center">
              <div className="loader">
                <li className="ball"></li>
                <li className="ball"></li>
                <li className="ball"></li>
              </div>
            </div>
          ) : (
            "중복 확인"
          )}
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-10/12 z-10">
          <p className="translate-y-3 translate-x-3 bg-white w-16 text-center">비밀 번호</p>
        </div>
        <div className="border-2 border-lime-800 w-10/12 rounded">
          <div className="relative">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="password"
                placeholder="비밀번호를 적어주세요"
                className={`p-3 p-3 w-full focus:outline-none rounded ${passwordValid ? "" : "border-red-500"}`}
                ref={passwordRef}
                onChange={handlePasswordChange}
                autoComplete="new-password"
              />
            </form>
          </div>
        </div>
        <div className="w-10/12">
          {!passwordValid && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>
      </div>


      {/* <div className="flex flex-col items-center">
        <div className="w-10/12 z-10">
          <p className="translate-y-3 translate-x-3 bg-white w-24 text-center">비밀 번호 확인</p>
        </div>
        <div className="border-2 border-lime-800 w-10/12 rounded">
          <div className="relative">
          <input
    type="password"
    placeholder="비밀번호를 다시 입력해주세요"
    className={`p-3 w-full focus:outline-none rounded ${passwordMatch ? "" : "border-red-500"}`}
    ref={confirmPasswordRef}
    onChange={handlePasswordChange}
  />
          </div>
        </div>
        <div className="w-10/12">
        {!confirmPasswordRef.current?.value && !passwordMatch && (
    <p className="text-red-500 text-sm mt-1">비밀번호가 일치하지 않습니다.</p>
  )}
        </div>
      </div> */}



      <div className="flex flex-col items-center">
        <div className="w-10/12 z-10">
          <p className="translate-y-3 translate-x-3 bg-white w-10 text-center">이름</p>
        </div>
        <div className="border-2 border-lime-800 w-10/12 rounded">
          <div className="relative">
            <input
              type="text"
              placeholder="이름을 적어주세요"
              className="p-3 w-full focus:outline-none rounded"
              ref={nameRef}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-10/12 z-10">
          <p className="translate-y-3 translate-x-3 bg-white w-10 text-center">성별</p>
        </div>
        <div className="border-2 border-lime-800 w-10/12 rounded">
          <div className="relative">
            <div className="p-3">
              <div className="flex items-center place-content-around">
                {genderOptions.map((option) => (
                  <div key={option.value} className="container">
                    <input
                      type="checkbox"
                      id={`cbx-${option.value}`}
                      name="gender"
                      value={option.value}
                      checked={gender === option.value}
                      onChange={() => handleGenderChange(option.value)}
                      style={{ display: 'none' }} // 체크박스는 숨깁니다.
                    />
                    <label htmlFor={`cbx-${option.value}`} className="check">
                      <svg width="18px" height="18px" viewBox="0 0 18 18">
                        <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                        <polyline points="1 9 7 14 15 4"></polyline>
                      </svg>
                      <p className="ml-2">{option.label}</p>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-10/12 z-10">
          <p className="translate-y-3 translate-x-3 bg-white w-16 text-center">생년월일</p>
        </div>
        <div className="flex flex-row w-10/12 place-content-between">
          <div className="border-2 border-lime-800 w-4/12 rounded">
            <div className="relative flex justify-center">
              {renderSelect(Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => (new Date().getFullYear() - i).toString()), (e) => setSelectedYear(e.target.value), selectedYear)}
            </div>
          </div>
          <div className="border-2 border-lime-800 w-3/12 rounded">
            <div className="relative flex justify-center">
              {renderSelect(Array.from({ length: 12 }, (_, i) => (i + 1).toString()), (e) => setSelectedMonth(e.target.value), selectedMonth)}
            </div>
          </div>
          <div className="border-2 border-lime-800 w-3/12 rounded">
            <div className="relative flex justify-center">
              {renderSelect(Array.from({ length: 31 }, (_, i) => (i + 1).toString()), (e) => setSelectedDay(e.target.value), selectedDay)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-10/12 z-10">
          <p className="translate-y-3 translate-x-3 bg-white w-24 text-center">핸드폰 번호</p>
        </div>
        <div className="border-2 border-lime-800 w-10/12 rounded">
          <div className="relative">
            <input
              type="text"
              placeholder="010-1234-5678"
              className="p-3 w-full focus:outline-none rounded"
              ref={phoneNumberRef}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <button
          className="bg-loginDarkGreen text-white rounded mt-12 w-10/12 p-3 shadow-md"
          onClick={handleCreateAccount}
          disabled={loading} // 로딩 중일 때 버튼 비활성화
          style={{ minHeight: "48px" }}
        >
          {loading ? (
            <div className="p-2 flex flex-col items-center">
              <div className="loader">
                <li className="ball"></li>
                <li className="ball"></li>
                <li className="ball"></li>
              </div>
            </div>
          ) : (
            "회원 가입"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
