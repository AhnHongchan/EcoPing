import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './TodayQuiz.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodayQuiz = () => {
  const [question, setQuestion] = useState('');
  const [quizId, setQuizId] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNextQuestion = async () => {
    setLoading(true); // 로딩 시작
    try {
        const response = await axios.get('/api/quiz/start', {
            headers: {
              userId: 1
            }
          });
      setQuestion(response.data.quiz);
      setQuizId(response.data.quizId);
    } catch (error) {
      console.error('Failed to fetch the quiz question', error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    fetchNextQuestion(); 
  }, []);

  const handleAnswer = async (answer) => {
    setLoading(true); // 로딩 시작
    try {
      const response = await axios.post(
        '/api/quiz/continue',
        {
          quizId: quizId,
          answer: answer,
        },
        {
          headers: {
            userId: 1,
          },
        }
      );
      setQuestion(response.data.quiz);
      setQuizId(response.data.quizId);
      if (response.data.isCorrect) {
        toast.success('정답입니다!');
      } else {
        toast.error('오답입니다!');
      }
    } catch (error) {
      console.error('Failed to submit the answer', error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className={styles.quizContainer}>
       <ToastContainer position="top-center" autoClose={1000} /> 
    <div className={styles.titlecontainer}>
      <div className={styles.nav}>오늘의 퀴즈</div>
    </div>
      <div className={styles.quizBox}>
         {loading ? ( 
           <div className={styles.loadingcontainer}>
           <div className={styles.spinner}></div>
         </div>
        ) : (
          <div className={styles.questionBox}>
            <p className={styles.question}>{question}</p>
            <div className={styles.buttonContainer}>
              <button className={styles.answerButton} onClick={() => handleAnswer(true)}>O</button>
              <button className={styles.answerButtonx} onClick={() => handleAnswer(false)}>X</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayQuiz;
