"use client";

import { useRef } from "react";
import Link from "next/link";
import instance from "@/lib/axios";
import "../../styles/globals.css";

const Login = () => {
  // useRef로 input 요소를 참조하여 직접 값을 가져오도록 설정
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async () => {
    const id = idRef.current?.value || ''; // 참조된 input의 값을 가져옴
    const password = passwordRef.current?.value || ''; // 참조된 input의 값을 가져옴

    try {
      // 생성된 axios 인스턴스를 사용하여 POST 요청 전송
      const response = await instance.post('/user/login', {
        email: id,
        password: password,
      });

      const data = response.data;
      console.log(data);
      if (data.success) {
        // 로그인 성공 시 로직 (예: 토큰 저장, 페이지 이동 등)
        console.log('Login successful:', response.data);
      } else {
        // 로그인 실패 시 로직
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <div className="text-2xl font-bold">로그인</div>
      <div className="mt-3">
        <input
          ref={idRef} // input 요소에 useRef 연결
          type="text"
          name="username"
          placeholder="Email"
          className="input-style"
        />
        <div className="min-w-max">
          <input
            ref={passwordRef} // input 요소에 useRef 연결
            type="password"
            name="password"
            placeholder="Password"
            className="input-style"
          />
          <button
            className="ml-5 font-bold bg-green-400 shadow-md rounded-md px-2 py-1"
            onClick={handleLogin}
          >
            확인
          </button>
        </div>
        <div className="mt-3 font-bold">
          <div>
            아직 아이디가 없으시다면?
            <Link href="/account">
              <button className="ml-7 font-bold bg-green-400 shadow-md rounded-md px-2 py-1">
                회원가입
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
