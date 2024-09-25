// app/components/QuizSection.tsx
import React from 'react';
import Link from 'next/link';

const TodayQuiz = (): JSX.Element => (
  <div className="my-8">
    <p className="">오늘의 환경퀴즈</p>
    <Link href="/todayquiz">
      <button className="bg-white shadow-md rounded-lg">
        <img src="/assets/quizquiz.png" className="w-32 h-32" alt="Quiz Banner" />
      </button>
    </Link>
  </div>
);

export default TodayQuiz;
