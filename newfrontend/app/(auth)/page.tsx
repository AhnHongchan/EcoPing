"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from 'axios';

import Cookies from "js-cookie";
import useAuthStore from "../store/use-auth-store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../../styles/globals.css";
import {
  BiSolidLockAlt,
  BiSolidUser,
  BiSolidShow,
  BiSolidHide,
} from "react-icons/bi";

const Login = (): JSX.Element => {
  const router = useRouter();
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const setUserId = useAuthStore((state) => state.setUserId);

  const handleLogin = async () => {
    const id = idRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      const response = await axios.post("https://j11a304.p.ssafy.io/api/api/users/login", {
        // const response = await axios.post("http://localhost:8080/api/users/login", {
        email: id,
        password: password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      if (
        response.status === 200 &&
        accessToken &&
        refreshToken
      ) {
        setUserId(response.data);
        router.push("/dashboard");
      } else {
        console.log('200 아님:', response)
      }
    } catch (error) {
      alert("로그인 실패")
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <ToastContainer draggable  theme="light"  position="top-center" autoClose={1000}  className="mt-10"/> 
      <div className="image-container">
        <img className="image1" src="/assets/plant.jpg" alt="Plant" />
        <img className="image2" src="/assets/wave-mask.svg" alt="Plant" />
      </div>

      <h2 className="text-2xl font-bold text-center text-loginDarkGreen mt-4">
        환영합니다
      </h2>
      <p className="text-center text-gray-400 mb-6 mt-1">
        로그인 후 이용가능합니다
      </p>
      <div className="mt-8 flex flex-col justify-center items-center">
        <div className="flex items-center bg-loginLightGreen p-2 rounded-lg w-10/12">
          <div className="p-2">
            <BiSolidUser className="text-loginDarkGreen" />
          </div>
          <input
            ref={idRef}
            type="text"
            name="username"
            placeholder="아이디"
            className="bg-loginLightGreen text-loginDarkGreen placeholder-loginDarkGreen flex-1 py-2 px-4 rounded-lg focus:outline-none"
          />
        </div>

        <div className="flex items-center bg-loginLightGreen p-2 rounded-lg w-10/12 mt-4">
          <div className="p-2">
            <BiSolidLockAlt className="text-loginDarkGreen" />
          </div>
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="비밀번호"
            className="bg-loginLightGreen text-loginDarkGreen placeholder-loginDarkGreen flex-1 py-2 px-4 rounded-lg focus:outline-none"
          />
          <p
            className="text-loginDarkGreen mr-4 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <BiSolidHide /> : <BiSolidShow />}
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="w-10/12 bg-loginDarkGreen text-white font-bold py-3 rounded-full shadow-md mt-20 hover:bg-green-800 transition-colors duration-300"
          onClick={handleLogin}
        >
          로그인
        </button>
      </div>

      <div className="text-center mt-4 flex justify-center">
        <p className="text-gray-400 mr-1">아직 계정이 없으시다면? </p>
        <Link href="/account">
          <p className="text-loginDarkGreen font-bold underline cursor-pointer">
            회원가입
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
