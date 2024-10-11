// app/components/CampaignCarousel.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import moment from "moment";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CampaignCarouselProps from "@/app/types/campaign-carousel-props";
import ProgressLine from "./ProgressLine";
import { BiChevronRight } from "react-icons/bi";

const CampaignCarousel = ({
  campaigns,
  currentSlide,
  setCurrentSlide,
  imagesLoaded,
}: CampaignCarouselProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (oldIndex: number, newIndex: number) => setCurrentSlide(newIndex),
  };

  return (
    <div className="mx-auto max-w-screen-lg py-8">
      <p className="text-2xl font-semibold mb-4">캠페인 모아보기</p>

      {imagesLoaded ? (
        <div>
          <div className="flex justify-end mb-4 text-loginDarkGreen ">
            <Link href="/campaignList" className="flex items-end">
              <div>
              캠페인 전체보기 
              </div>
               <BiChevronRight className="size-5" />
            </Link>
          </div>
          <Slider {...settings} className="carouselContainer">
            {campaigns.map((campaign) => {
              const endDate = moment(campaign.endDate);
              const today = moment();
              const dDay = endDate.diff(today, "days");

              const donationPercent = Math.floor(
                (campaign.nowAmount / campaign.goalAmount) * 100
              );

              return (
                <div
                  key={campaign.id}
                  className="bg-slate-50 p-4 rounded-lg shadow-md mb-4"
                >
                  <Link href={`/campaign/${campaign.id}`}>
                    <div className="block">
                      <img
                        className="w-full h-96 object-cover mb-4"
                        // src={`/assets/${campaign.id}.png`}
                        src={`${campaign.thumbnailUrl}`}
                        alt="Campaign Image"
                      />
                      <p className="text-xl font-semibold mt-6">{campaign.title}</p>
                      <div className="text-loginDarkGreen flex items-end justify-end">
                        바로가기  <BiChevronRight className="size-5" />
                      </div>
                    </div>
                  </Link>
                  <div className="mt-6 flex gap-2 items-center">
                    <p className="text-sm text-gray-600 bg-loginLightGreen rounded-lg pt-1 pb-1 pr-2 pl-2">D-{dDay}</p>
                    <p className="text-sm text-gray-600">
                      {campaign.nowAmount.toLocaleString()}원
                    </p>
                  </div>
                  <div className="ml-1 flex items-center gap-2 ">
                    <p className="text-lg text-loginDarkGreen">{donationPercent}%</p>
        

                    <ProgressLine
                          visualParts={[
                            {
                              percentage: `${donationPercent}%`,
                              color: "rgb(64,116,77)",
                            },
                          ]}
                        />


                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-40">
          <div className="spinner border-t-4 border-loginDarkGreen w-8 h-8 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default CampaignCarousel;
