import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MyPageSlide.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';

const MyPageSlide = () => {
  const [campaigns, setCampaigns] = useState([]);
  const userId = 1;
  const navigate = useNavigate();

  useEffect(() => {
    // 캠페인 데이터를 가져오는 함수
    const fetchCampaigns = async () => {
      try {
        console.log('userId', userId);
        const response = await axios.get(`/api/campaignhistory/${userId}`);
        console.log("res", response.data);
        setCampaigns(response.data); // 가져온 데이터를 상태에 저장
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      }
    };

    fetchCampaigns(); // 데이터를 가져오는 함수를 호출
  }, []);

  // 캠페인 클릭 핸들러
  const handleClickCampaign = (campaign) => {
    if (campaign.completed) {
      window.alert("이미 종료된 캠페인입니다.");
    } else {
      navigate(`/campaign/${campaign.campaignId + 1}`);
    }
  };

  const settings = {
    showIndicators: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div className={styles.campaignContainer}>
      <div className={styles.campaignHeader}>
        <p className={styles.campaignTitle}>참여한 캠페인</p>
      </div>
      <Carousel showStatus={false}  {...settings} className={styles.carosize}>
        {campaigns.map((campaign) => (
          <div key={campaign.campaignId} className={styles.slide}>
            <div className={styles.imageWrapper}>
              <img
                className={styles.campaignImage}
                src={`/assets/${campaign.campaignId + 1}.png`}
                alt={`Campaign ${campaign.campaignId}`}
              />
            </div>
            <div className={styles.campaignDetails}>
              <p className={styles.campaignText}>{campaign.title}</p>
              <div className={styles.campaignInfo}>
                <p className={styles.campaignDays}>{campaign.completed ? "종료" : "진행 중"}</p>
              </div>
              <div className={styles.userPoints}>
                <p>소비한 포인트: {campaign.amount.toLocaleString()} P</p>
              </div>
              {/* 캠페인 보러가기 버튼 */}
              <button
                className={styles.campaignButton}
                onClick={() => handleClickCampaign(campaign)}
                disabled={campaign.completed} // 완료된 캠페인은 비활성화
              >
                캠페인 보러가기
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MyPageSlide;
