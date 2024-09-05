"use client";

import { useState } from "react";
import Link from "next/link";
import "../../styles/globals.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div>
      <div className="text-2xl font-bold">로그인</div>
      <div className="mt-3">
        <input
          type="text"
          name="username"
          placeholder="Email"
          className="input-style"
        />
        <div className="min-w-max">
          <input
            type="text"
            name="password"
            placeholder="Password"
            className="input-style"
          />
          <button className="ml-5 font-bold bg-green-400 shadow-md rounded-md px-2 py-1">
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
