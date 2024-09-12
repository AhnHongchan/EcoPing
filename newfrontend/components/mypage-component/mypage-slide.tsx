'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './mypage-slide.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import instance from "@/lib/axios";

interface Campaign {
    campaignId: number;
    title: string;
    completed: boolean;
    amount: number;
    startDate: string;
    endDate: string;
}

const MypageSlide = () => {
    const dummyData: Campaign[] = [
      {
        campaignId: 0,
        title: '더미 캠페인 1',
        completed: false,
        amount: 0,
        startDate: "2024-09-09T06:59:00.910Z",
        endDate: "2024-09-09T06:59:00.910Z",
      },
      {
        campaignId: 1,
        title: '더미 캠페인 2',
        completed: true,
        amount: 5000,
        startDate: "2024-09-08T06:59:00.910Z",
        endDate: "2024-09-08T06:59:00.910Z",
      },
    ];

  // const [campaigns, setCampaigns] = useState<Campaign[]>([]);
const [campaigns, setCampaigns] = useState<Campaign[]>(dummyData);

  const userId: number = 1;
  const router = useRouter();



  
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await instance.get(`/campaignhistory/${userId}`);
        console.log(response.data);
        // setCampaigns(response.data); 
      } catch (error) {
        console.error('Failed to fetch campaigns:', error);
      }
    };

    fetchCampaigns(); 
  }, []);

  const handleClickCampaign = (campaign: Campaign) => {
    if (campaign.completed) {
      window.alert('이미 종료된 캠페인입니다.');
    } else {
      router.push(`/campaign/${campaign.campaignId + 1}`);
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
    infiniteLoop: true, 
  };

  return (
    <div className={styles.allContainer}>
    <div className={styles.campaignContainer}>
      <div className={styles.campaignHeader}>
        <p className={styles.campaignTitle}>참여한 캠페인</p>
      </div>
      <Carousel showStatus={false} {...settings} className={styles.carosize}>
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
                <p className={styles.campaignDays}>
                  {campaign.completed ? '종료' : '진행 중'}
                </p>
              </div>
              <div className={styles.userPoints}>
                <p>소비한 포인트: {campaign.amount.toLocaleString()} P</p>
              </div>
              <button
                className={styles.campaignButton}
                onClick={() => handleClickCampaign(campaign)}
                disabled={campaign.completed} 
              >
                캠페인 보러가기
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
    </div>
  );
};

export default MypageSlide;
