'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import instance from "@/lib/axios";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

interface Campaign {
    campaignId: number;
    title: string;
    completed: boolean;
    amount: number;
    startDate: string;
    endDate: string;
    thumbnailUrl: string;  
}

const MypageSlide = () => {
    const dummyData: Campaign[] = [
      // {
      //   campaignId: 0,
      //   title: '더미 캠페인 1',
      //   completed: false,
      //   amount: 0,
      //   startDate: "2024-09-09T06:59:00.910Z",
      //   endDate: "2024-09-09T06:59:00.910Z",
      // },
      // {
      //   campaignId: 1,
      //   title: '더미 캠페인 2',
      //   completed: true,
      //   amount: 5000,
      //   startDate: "2024-09-08T06:59:00.910Z",
      //   endDate: "2024-09-08T06:59:00.910Z",
      // },
    ];

    const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const userId: number = 1;
  const router = useRouter();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await instance.get(`/campaignhistory/info`);
        console.log(response.data)
        setCampaigns(response.data);
      } catch (error) {
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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div className="flex justify-center">
      <div className="mt-8 relative w-11/12 overflow-hidden bg-gray-200 rounded-xl shadow-custom-lg">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg mt-8 ml-5">참여한 캠페인</p>
        </div>
        {campaigns.length > 0 ? (
          <Slider {...settings} className="carosize"> 
            {campaigns.map((campaign) => (
              <div key={campaign.campaignId} className="p-2">
                <div className="w-full overflow-hidden rounded-lg">
                  <img
                    className="w-full h-[300px] object-cover"
                    // src={`/assets/${campaign.campaignId + 1}.png`}
                    src={`${campaign.thumbnailUrl}`}
                    alt={`Campaign ${campaign.campaignId}`}
                  />
                </div>
                <div className="bg-white p-4 rounded-lg mt-8 mb-4">
                  <p className="text-base text-center">{campaign.title}</p>
                  <div className="flex justify-between mt-4">
                    <p className={`text-sm ${campaign.completed ? 'text-red-500' : 'text-green-500'}`}>
                      {campaign.completed ? '종료' : '진행 중'}
                    </p>
                  </div>
                  <div className="bg-green-50 p-2 rounded-lg text-center font-bold mt-4">
                    <p>소비한 포인트: {campaign.amount.toLocaleString()} P</p>
                  </div>
                  <div className='flex justify-center'>
                    <button
                      className={`mt-4 mb-2 px-5 py-2 text-sm border rounded-full ${
                        campaign.completed
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-white text-mainDarkGreen border-mainDarkGreen hover:bg-mainDarkGreen hover:text-white transition-colors'
                      }`}
                      onClick={() => handleClickCampaign(campaign)}
                      disabled={campaign.completed} 
                    >
                      캠페인 보러가기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="p-8 text-center text-gray-500">
            참여한 캠페인이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
  
};

export default MypageSlide;
