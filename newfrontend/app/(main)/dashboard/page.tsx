"use client";

import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel 스타일
import ProgressLine from "../../../components/progress-line"; // ProgressLine 컴포넌트 임포트
import Campaign from "../../types/campaign";
import TreeGame from "@/components/tree-game";
import CampaignCarousel from "@/components/campaign-carousel";
import CampaignCarouselProps from "../../types/campaign-carousel-props";
import instance from "@/lib/axios";


// 제네릭을 사용하여 컴포넌트 props 타입 정의 (현재 props가 없으므로 빈 객체 타입을 사용)
interface MainProps<T = {}> {
  // 필요한 props가 있다면 여기 추가
}



const Main = <T extends {}>({}: MainProps<T>): JSX.Element => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchCampaigns = async (): Promise<void> => {
      try {
        const response : AxiosResponse<Campaign[]> = await instance.get("/campaigns/ongoing")
        setCampaigns(response.data);
        console.log(response.data)
      } catch (error) {

      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    if (campaigns.length > 0) {
      const imagePromises: Promise<void>[] = campaigns.map((campaign) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = `/assets/${campaign.id}.png`;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      });

      Promise.all(imagePromises).then(() => {
        setImagesLoaded(true);
      });
    }
  }, [campaigns]);

  return (
    <div>
      <div>
        <TreeGame />
        <CampaignCarousel
          campaigns={campaigns}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          imagesLoaded={imagesLoaded}
        />
      </div>
    </div>
  );
};

export default Main;
