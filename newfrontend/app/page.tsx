"use client";

import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import moment from "moment";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel 스타일
import ProgressLine from "../components/progress-line"; // ProgressLine 컴포넌트 임포트
import Campaign from "./types/campaign";
import TreeGame from "@/components/tree-game";
import CampaignCarousel from "@/components/campaign-carousel";
import CampaignCarouselProps from "./types/campaign-carousel-props";

const Main: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchCampaigns = async (): Promise<void> => {
      try {
        const response: AxiosResponse<Campaign[]> = await axios.get(
          "/api/campaigns/ongoing"
        );
        setCampaigns(response.data);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
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
