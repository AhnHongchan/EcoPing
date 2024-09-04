import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용
import styles from './campaignSlide.module.css';
import axios from 'axios';

const CampaignSlide = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [points, setPoints] = useState("");
  const [remainingPoints, setRemainingPoints] = useState(0); // 초기 포인트를 0으로 설정
  const navigate = useNavigate(); // useNavigate 훅 사용
  const userId = 1; // 예시로 userId를 설정
  const campaignId = window.location.pathname.split("/").pop(); // URL에서 campaignId를 추출

  useEffect(() => {
    // 초기 포인트 가져오기
    const fetchPoints = async () => {
      try {
        const response = await axios.get("/api/points/mypoint", {
          headers: { userId: userId }, // 헤더에 userId 추가
        });
        setRemainingPoints(response.data); // 가져온 포인트 데이터로 상태 설정
      } catch (error) {
        console.error("포인트를 가져오는데 실패했습니다:", error);
      }
    };

    fetchPoints();
  }, []);

  const toggleModal = () => {
    if (isOpen) {
      const overlay = document.querySelector(`.${styles.modalOverlay}`);
      overlay.classList.add(styles.closing);
      setTimeout(() => {
        setIsOpen(false);
        overlay.classList.remove(styles.closing);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  const handleDonate = async () => {
    const donatePoints = Number(points);
    if (donatePoints <= remainingPoints) {
      try {
        // 기부 요청 보내기

        await axios.post(
          `/api/campaignhistory/participate?userId=${userId}&campaignId=${campaignId}&pay=${donatePoints}`
        );

        console.log("Donating points:", donatePoints);
        toggleModal(); // 모달 닫기
        setPoints("");

        // 기부 후 페이지 새로고침
        navigate(0); // 현재 페이지 새로고침
      } catch (error) {
        console.error("기부 요청에 실패했습니다:", error);
      }
    } else {
      alert("포인트가 부족합니다.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      toggleModal();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (
      value === "" ||
      (Number(value) >= 0 && Number(value) <= remainingPoints)
    ) {
      setPoints(value);
    }
  };

  const handleAllDonate = () => {
    setPoints(remainingPoints.toString());
  };

  // Expose a function to be called by the parent component
  useImperativeHandle(ref, () => ({
    donateDirectly() {
      if (!isOpen) {
        toggleModal(); // Open the modal first if it's not open
      }
      setTimeout(() => {
        handleDonate(); // Trigger the donate action
      }, 30000); // Wait for the modal to open
    },
  }));

  return (
    <div className={styles.container}>
      <button onClick={toggleModal} className={styles.button}>
        기부하기
      </button>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={styles.modalContent}>
            <h2>얼만큼 기부하시나요?</h2>
            <p>포인트를 입력하세요</p>
            <input
              type="number"
              value={points}
              onChange={handleInputChange}
              placeholder="포인트를 입력하세요"
              className={styles.input}
            />
            <p>남은 포인트: {remainingPoints}</p>
            <button
              onClick={handleAllDonate}
              className={styles.allDonateButton}
            >
              전체 기부
            </button>
            <button onClick={handleDonate} className={styles.donateButton}>
              기부하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default CampaignSlide;
