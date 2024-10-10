'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import instance from "@/lib/axios";

interface MypageFilterPopupProps {
  campaignId: string;
  onClose: () => void;
  isOpen: boolean;
}

const CampaignPopup = ({ campaignId, onClose, isOpen }: MypageFilterPopupProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [remainingPoints, setRemainingPoints] = useState(0);
  const [donatePoints, setDonatePoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await instance.get("/points/mypoint");
        setRemainingPoints(response.data);
      } catch (error) {
        console.error("Failed to fetch points:", error);
      }
    };

    if (isOpen) {
      fetchPoints();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleDonate = async () => {
    console.log(campaignId+" "+donatePoints)
    try {
      await instance.post("/campaignhistory/participate", 
        {
            campaignId: campaignId,
          donatePoints: donatePoints,
        },
      );
      alert("기부가 완료되었습니다!");
      handleClose();
    } catch (error) {
      console.error("Failed to donate:", error);
      alert("기부에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className={`bg-white rounded-t-lg p-5 w-full max-w-md mx-auto ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end"
      contentLabel="Campaign Donation Modal"
      ariaHideApp={false}
    >
      <h2 className="text-lg font-semibold mb-4">기부하기</h2>
      <p className="mb-4">남은 포인트: <span className="font-bold">{remainingPoints.toLocaleString()} P</span></p>
      
      <input
  type="number"
  placeholder="기부할 포인트를 입력하세요"
  className="w-full p-2 border rounded-lg mb-4"
  value={donatePoints === 0 ? '' : donatePoints} 
  onChange={(e) => {
    const value = Number(e.target.value);
    setDonatePoints(value);
  }}
  max={remainingPoints}
/>

    <div className='flex flex-row gap-4 mb-4'>
      <button
        onClick={handleDonate}
        disabled={donatePoints <= 0 || donatePoints > remainingPoints}
        className={`w-full mt-2 py-2 rounded-full text-white ${
          donatePoints > 0 && donatePoints <= remainingPoints ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        기부하기
      </button>
      
      <button
        onClick={handleClose}
        className="w-full mt-2 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
      >
        닫기
      </button>
    </div>
    </Modal>
  );
};

export default CampaignPopup;
