import Campaign from "./campaign";

interface CampaignCarouselProps {
  campaigns: Campaign[];
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>; // 상태 업데이트 함수를 사용하여 명시적으로 정의
  imagesLoaded: boolean;
}

export default CampaignCarouselProps;