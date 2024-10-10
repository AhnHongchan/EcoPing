'use client'

import React, { useRef } from 'react';
import Link from 'next/link';
import { BiChevronLeft } from "react-icons/bi";
import { useParams } from 'next/navigation';
import CampaignSlide from '@/components/campaign/campaign-slide'

// Define types for props and refs
interface CampaignSlideProps {
  className?: string;
  donateDirectly: () => void;
}

interface CampaignUrls {
  [key: number]: string;
}

const Campaign = () => {
  const params = useParams();
  const campaignId = params?.id as string;
  const campaignSlideRef = useRef<{ donateDirectly: () => void }>(null);

  // Campaign URLs 타입 지정
  const campaignUrls: CampaignUrls = {
    1: "https://slowalk.co.kr/archives/portfolio/%EC%BA%A0%ED%8E%98%EC%9D%B8-i-%EA%B7%B8%EB%A6%B0%ED%94%BC%EC%8A%A4-%EB%93%9C%EB%9D%BC%EC%9D%B4%EB%B9%99%EC%B2%B4%EC%9D%B8%EC%A7%80-%EA%B7%B8%EB%9E%98-%EA%B2%B0%EC%8B%AC%ED%96%88%EC%96%B4",
    2: "https://www.gihoo.or.kr/menu.es?mid=a20300000000",
    3: "https://earthplogging.com/",
    4: "https://www.greenpeace.org/korea/update/23066/blog-plastic-5tips-to-save-money-and-environment/",
    5: "https://www.greenpeace.org/korea/make-a-change/",
    6: "https://partners.noplasticsunday.com/?https://partners.noplasticsunday.com/?utm_source=googleads&utm_medium=cpc&utm_campaign=paid_service&gad_source=1&gclid=Cj0KCQjw05i4BhDiARIsAB_2wfCRFD1P6_gGNVanMT70We4ItBlH1I4BXlJAr7Lp-1vHgPjEhhJKDI8aAidxEALw_wcB",
    7: "https://www.hyundai.com/worldwide/ko/brand-journal/sustainable-vision/earth-day-2023-with-healthy-seas?cmpid=SEA|ACCOUNT:HyundaiWorldwide|CAMPAIGN:2024KRCompany|ADGROUP:Sustainabillity|ENGINE:GOOGLE|NETWORK:SEARCH|REGION:KR|KEYWORD:%ED%99%98%EA%B2%BD%EB%B3%B4%ED%98%B8|MATCHTYPE:b&gad_source=1&gclid=Cj0KCQjw05i4BhDiARIsAB_2wfBqg2q3L6lQBUsSBrQrS4E1ZRKdCcznvsOrVJa6-6b4y-Gu4O7ULegaAuSuEALw_wcB",
    8: "https://www.shinhancard.com/pconts/html/benefit/event/1227874_2239.html",
  };

  const iframeUrl = campaignUrls[Number(campaignId)] || 
    "https://www.shinhancard.com/pconts/html/benefit/event/1227874_2239.html";

  const handleParticipateClick = () => {
    console.log(campaignSlideRef.current)
    if (campaignSlideRef.current) {
      campaignSlideRef.current.donateDirectly();
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link href="/campaignList" className="flex items-center text-gray-700">
          <BiChevronLeft className="w-6 h-6" />
          <span className="ml-2 text-lg font-semibold">뒤로가기</span>
        </Link>
      </div>

      <div className="relative">
        <iframe
          src={iframeUrl}
          title=""
          className="w-full h-[calc(100vh-200px)] border-none "
        />  

        <button 
          onClick={handleParticipateClick}
          className="relative bottom-36 left-1/2 transform -translate-x-1/2 w-11/12
                     bg-loginDarkGreen text-white px-6 py-3 rounded-full 
                     shadow-lg hover:bg-hoverloginDarkGreen transition-colors"
        >
          바로 참여하기
        </button>

        {/* CampaignSlide 컴포넌트는 별도로 TypeScript로 변환이 필요합니다 */}
        <CampaignSlide ref={campaignSlideRef} className="fixed bottom-0 left-0 right-0" />
      </div>
    </div>
  );
};

export default Campaign;