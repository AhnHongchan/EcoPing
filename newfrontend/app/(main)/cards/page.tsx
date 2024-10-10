"use client";

import React, { useEffect, useState } from "react";
import { BiPlus , BiChevronLeft } from "react-icons/bi";
import instance from "@/lib/axios";
import Link from 'next/link';

const Cards = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [existsCard, setExistsCard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCardInfo = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get("/card/check");
      if (response.data.existsCard) {
        setExistsCard(true);
        setCardNumber(response.data.cardNumber);
      } else {
        setExistsCard(false);
      }
    } catch (error) {
      console.error("Error fetching card info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCardInfo();
  }, []);

  const addCard = async () => {
    const generateRandomNumber = () => Math.floor(1000 + Math.random() * 9000);

    const cardData = {
      num1: generateRandomNumber(),
      num2: generateRandomNumber(),
      num3: generateRandomNumber(),
      num4: generateRandomNumber(),
      cvc: Math.floor(100 + Math.random() * 900),
    };

    try {
      await instance.post("/card/register", cardData);
      fetchCardInfo();
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  return (
    <div>
    <Link  href={`/mypage`} className="flex items-center"><BiChevronLeft className="size-6"/>뒤로가기</Link>
    <div className="w-full mt-20 flex justify-center items-center">

      {isLoading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="spinner border-t-4 border-loginDarkGreen w-8 h-8 rounded-full animate-spin"></div>
        </div>
      ) : existsCard ? (
        <div className="relative w-[380px] h-[230px] border border-white/20 bg-green-300 rounded-lg backdrop-blur-md overflow-hidden z-10">
          <div className="float-right p-2">
            <img
              src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
              alt="Visa Logo"
              className="w-[70px] h-[40px]"
            />
          </div>
          <div className="p-2 mt-[30px] mb-2">
            <img
              src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
              alt="Chip"
              className="w-[60px] h-[45px]"
            />
            <p className="text-[22px] mt-4 tracking-widest text-white font-semibold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.3)]">
              **** **** **** {cardNumber}
            </p>
          </div>
          <div className="flex justify-between px-2 mt-8 text-white">
            <p className="">10/11</p>
            <p className="mr-2">에코핑</p>
          </div>
        </div>
      ) : (
        <div
          className="relative w-[380px] h-[230px] border-green-300 border-4 border-dashed bg-transparent rounded-lg backdrop-blur-md overflow-hidden z-10 flex justify-center items-center flex-col cursor-pointer"
          onClick={addCard}
        >
          <BiPlus className="size-10 mt-2" />
          <p className="mt-2">카드 추가하기</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Cards;
