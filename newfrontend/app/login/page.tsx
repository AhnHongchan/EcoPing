'use client'

import { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
  <div>
    <div className="text-2xl font-bold">로그인</div>
    <div className="mt-3">
      <input type="text" name="username" placeholder="Email" className="my-2 pl-2 py-1 shadow-md rounded-md"/>
      <br />
      <input type="text" name="password" placeholder="Password" className="my-2 pl-2 py-1 shadow-md rounded-md"/>
      <button className="ml-5 font-bold bg-green-400 shadow-md rounded-md px-2 py-1">확인</button>
    </div>
  </div>
)}

export default Login;