import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './Game.module.css';

const quizzes = [
  { question: "지구의 평균 기온이 상승하는 현상을 무엇이라고 하나요?", answers: ["지구 온난화", "빙하기"], correct: 0 },
  { question: "다음 중 재활용할 수 있는 것은 무엇인가요?", answers: ["유리병", "플라스틱 칫솔"], correct: 0 },
  { question: "수질 오염의 주된 원인 중 하나는 무엇인가요?", answers: ["산업 폐수", "대기 오염"], correct: 0 },
  { question: "대기 중의 이산화탄소가 증가하면 일어나는 현상은?", answers: ["온실 효과", "자외선 감소"], correct: 0 },
  { question: "산성비의 원인은 무엇인가요?", answers: ["황산화물", "질소"], correct: 0 },
  { question: "다음 중 생태계를 보존하기 위한 방법은?", answers: ["삼림 벌채", "생태계 보호구역 지정"], correct: 1 },
  { question: "오존층을 파괴하는 물질은 무엇인가요?", answers: ["프레온가스", "이산화탄소"], correct: 0 },
  { question: "다음 중 해양 오염을 유발하는 주요 원인은?", answers: ["플라스틱 쓰레기", "온실가스"], correct: 0 },
  { question: "지속 가능한 에너지원으로 적합한 것은?", answers: ["태양광", "석탄"], correct: 0 },
  { question: "기후 변화의 주요 원인으로 잘못된 것은?", answers: ["화석 연료 사용", "나무 심기"], correct: 1 },
];

const Game = () => {
  const [player, setPlayer] = useState({
    speed: 3,
    moveDistance: 10,
    score: 0,
    isGamePaused: false,
    x: 0,
    midpoint: 0,
  });
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizPosition, setQuizPosition] = useState(-200);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [finalPosition, setFinalPosition] = useState(0); // 최종 위치를 저장하는 상태 변수 추가
  const [wrongAnswers, setWrongAnswers] = useState(0); // 틀린 횟수를 추적하는 상태 변수
  const gameAreaRef = useRef(null);

  useEffect(() => {
    const updateFinalPosition = () => {
      setFinalPosition(player.midpoint);
    };

    updateFinalPosition();

    if (gameStarted && !gameOver) {
      const gameLoop = () => {
        moveLines();
        moveQuiz();
        requestAnimationFrame(gameLoop);
      };
      gameLoop();
    }
  }, [player.midpoint, gameStarted, gameOver]);

  const moveLines = () => {
    const lines = document.querySelectorAll(`.${styles.line}`);
    lines.forEach((item) => {
      let y = parseFloat(item.style.top) || 0;
      if (y >= 1500) {
        y -= 1500;
      }
      item.style.top = `${y + player.speed}px`;
    });
  };

  const moveQuiz = () => {
    if (currentQuiz && gameAreaRef.current) {
      setQuizPosition((prev) => {
        if (prev > gameAreaRef.current.offsetHeight) {
          checkAnswerBasedOnFinalPosition();
          return -200; // Reset quiz position
        }
        return prev + 1; // 문제 내려가는 속도를 2배로 빠르게 설정
      });
    }
  };

  const getNextQuiz = () => {
    const newQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    setCurrentQuiz(newQuiz);
    return newQuiz;
  };

  const showQuiz = () => {
    getNextQuiz();
    setQuizPosition(-200);
  };

  const checkAnswerBasedOnFinalPosition = () => {
    if (!currentQuiz || !gameAreaRef.current) return;

    const gameAreaWidth = gameAreaRef.current.offsetWidth;
    const gameAreaMidpoint = gameAreaWidth / 2;

    const selectedIndex = finalPosition < gameAreaMidpoint ? 0 : 1;

    if (selectedIndex === currentQuiz.correct) {
      setPlayer((prev) => ({
        ...prev,
        score: prev.score + 1,
        speed: prev.speed + 0.25, // 속도 증가를 반으로 줄임
      }));
      showQuiz();
    } else {
      setWrongAnswers(prev => {
        const newWrongAnswers = prev + 1;
        if (newWrongAnswers >= 4) {
          endGame(); // 4번 틀리면 게임 오버
        }
        return newWrongAnswers;
      });
    }
  };

  const endGame = () => {
    setGameStarted(false);
    setGameOver(true);
    sendScoreToAPI(player.score);
  };

  const sendScoreToAPI = (score) => {
    window.alert(`게임이 종료되었습니다. 점수: ${score}`);
  };

  const startGame = () => {
    const gameAreaWidth = gameAreaRef.current ? gameAreaRef.current.offsetWidth : 400;
    const initialX = gameAreaWidth / 2 - 25;
    setPlayer({
      speed: 1,
      moveDistance: 30,
      score: 0,
      isGamePaused: false,
      x: initialX,
      midpoint: initialX + 25,
    });
    setFinalPosition(initialX + 25); // 초기 위치 설정
    setWrongAnswers(0); // 틀린 횟수 초기화
    setGameStarted(true);
    setGameOver(false);
    showQuiz();
  };

  const movePlayer = (direction) => {
    const roadWidth = gameAreaRef.current ? gameAreaRef.current.offsetWidth : 400;
    setPlayer((prev) => {
      let newX;
      if (direction === 'left') {
        newX = Math.max(prev.x - prev.moveDistance, 0);
      } else {
        newX = Math.min(prev.x + prev.moveDistance, roadWidth - 50);
      }
      const newMidpoint = newX + 25;
      return {
        ...prev,
        x: newX,
        midpoint: newMidpoint,
      };
    });
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => movePlayer('left'),
    onSwipedRight: () => movePlayer('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className={styles.container} {...handlers}>
      {gameStarted && !gameOver && (
        <>
          <div className={styles.score}>Score: {player.score}</div>
          <div className={styles.gameArea} ref={gameAreaRef}>
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className={styles.line} style={{ top: `${index * 150}px` }}></div>
            ))}
            <div className={styles.car} style={{ left: `${player.x}px` }}></div>
            {currentQuiz && (
              <div className={styles.quizContainer} style={{ top: `${quizPosition}px` }}>
                <div className={styles.question}>{currentQuiz.question}</div>
                <div className={styles.answers}>
                  <div className={`${styles.answer} ${styles.left}`}>
                    {currentQuiz.answers[0]}
                  </div>
                  <div className={`${styles.answer} ${styles.right}`}>
                    {currentQuiz.answers[1]}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {!gameStarted && (
        <div className={styles.start} onClick={startGame}>
          {gameOver ? 'Restart' : 'Start'}
        </div>
      )}

      {gameOver && (
        <div className={styles.pauseScreen}>
          <h2>Game Over</h2>
          <p>Your Score: {player.score}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
