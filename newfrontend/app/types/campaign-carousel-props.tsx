import Campaign from "./campaign";

interface CampaignCarouselProps {
  campaigns: Campaign[];
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  imagesLoaded: boolean;
}

export default CampaignCarouselProps;