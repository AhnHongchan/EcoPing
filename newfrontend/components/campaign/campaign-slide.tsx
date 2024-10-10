import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useRouter } from 'next/navigation';
import instance from "@/lib/axios";

interface CampaignSlideProps {
  className?: string;
}

interface CampaignSlideRef {
  donateDirectly: () => void;
}

const CampaignSlide = forwardRef<CampaignSlideRef, CampaignSlideProps>(({ className }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [points, setPoints] = useState("");
  const [remainingPoints, setRemainingPoints] = useState(0);
  const router = useRouter();
  const userId = 1;
  const campaignId = typeof window !== 'undefined' ? window.location.pathname.split("/").pop() : '';

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await instance.get("/points/mypoint", {
        });
        setRemainingPoints(response.data);
      } catch (error) {
        console.error("Failed to fetch points:", error);
      }
    };

    fetchPoints();
  }, []);

  const toggleModal = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleDonate = async () => {
    const donatePoints = Number(points);
    if (donatePoints <= remainingPoints) {
      try {
        await instance.post(
          `/api/campaignhistory/participate?userId=${userId}&campaignId=${campaignId}&pay=${donatePoints}`
        );
        toggleModal();
        setPoints("");
        router.refresh();
      } catch (error) {
        console.error("Donation request failed:", error);
      }
    } else {
      alert("Insufficient points.");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === 'modal-overlay') {
      toggleModal();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 0 && Number(value) <= remainingPoints)) {
      setPoints(value);
    }
  };

  const handleAllDonate = () => {
    setPoints(remainingPoints.toString());
  };

  useImperativeHandle(ref, () => ({
    donateDirectly() {
      if (!isOpen) {
        toggleModal();
      }
      setTimeout(() => {
        handleDonate();
      }, 300);
    },
  }));

  return (
    <div className={``}>
      {isOpen && (
        <div
          id="modal-overlay"
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black/50 flex justify-center items-end z-50"
        >
          <div className="bg-white p-5 rounded-t-3xl w-full max-w-lg animate-slideUp">
            <h2 className="text-center mb-2.5">얼만큼 기부하시나요?</h2>
            <p className="text-center mb-5">포인트를 입력하세요</p>
            <input
              type="number"
              value={points}
              onChange={handleInputChange}
              placeholder="포인트를 입력하세요"
              className="w-full px-2.5 py-2.5 mb-2.5 border border-gray-300 rounded"
            />
            <p className="text-center mb-5">남은 포인트: {remainingPoints}</p>
            <button
              onClick={handleAllDonate}
              className="w-full px-2.5 py-2.5 mb-2.5 bg-gray-100 text-gray-800 rounded"
            >
              전체 기부
            </button>
            <button
              onClick={handleDonate}
              className="w-full px-2.5 py-2.5 bg-blue-500 text-white rounded"
            >
              기부하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

CampaignSlide.displayName = 'CampaignSlide';

export default CampaignSlide;