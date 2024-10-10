import React from "react";
import Link from 'next/link';
import { BiChevronLeft } from "react-icons/bi";

const Qna = () => {
  const faqs = [
    {
      question: "에코 포인트는 어떻게 적립하나요?",
      answer: "에코 포인트로 나무 키우기 게임을 하거나, 에코 소비 캠페인에 참여하여 적립할 수 있습니다.",
    },
    {
      question: "적립된 에코 포인트는 어디에서 사용할 수 있나요?",
      answer: "에코 포인트는 제휴 매장에서 사용할 수 있으며, 특정 환경 캠페인에 기부할 수도 있습니다.",
    },
    {
      question: "에코 소비가 무엇인가요?",
      answer: "에코 소비란, 친환경 제품을 구매하거나 에코 활동에 참여하여 환경에 기여하는 소비를 말합니다.",
    },
    {
      question: "에코 포인트는 얼마 동안 유효한가요?",
      answer: "에코 포인트는 적립 후 1년 동안 유효하며, 기간 내 사용하지 않은 포인트는 소멸됩니다.",
    },
    {
      question: "포인트를 친구에게 양도할 수 있나요?",
      answer: "현재 포인트 양도는 불가능하며, 본인 계정 내에서만 사용 가능합니다.",
    },
  ];

  return (
    <div className="p-6">
      <Link href="/mypage" className="flex items-center text-gray-700 mb-6">
        <BiChevronLeft className="w-6 h-6" />
        <span className="ml-2 text-lg font-semibold">뒤로가기</span>
      </Link>

      <h1 className="text-2xl font-bold text-gray-800 mb-8">자주 묻는 질문 (Q&A)</h1>
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-custom-lg">
            <h2 className="text-lg font-semibold text-gray-800">{faq.question}</h2>
            <p className="text-gray-600 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Qna;
