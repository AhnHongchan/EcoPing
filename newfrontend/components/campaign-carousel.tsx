// app/components/CampaignCarousel.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import moment from "moment";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CampaignCarouselProps from "@/app/types/campaign-carousel-props";

const CampaignCarousel = ({
  campaigns,
  currentSlide,
  setCurrentSlide,
  imagesLoaded,
}: CampaignCarouselProps) => {
  return (
    <div className="mx-auto max-w-screen-lg py-8">
      <p className="text-2xl font-semibold mb-4">캠페인 모아보기</p>

      {imagesLoaded ? (
        <div>
          <div className="flex justify-end mb-4">
            <Link href="/campaignList">
              <a className="text-blue-500">
                캠페인 목록보기 <i className="bi bi-chevron-right"></i>
              </a>
            </Link>
          </div>
          <Carousel
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={5000}
            className="carouselContainer"
            selectedItem={currentSlide}
            onChange={(index) => setCurrentSlide(index)}
          >
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
                  className="bg-white p-4 rounded-lg shadow-md mb-4"
                >
                  <Link href={`/campaign/${campaign.id}`}>
                    <a className="block">
                      <img
                        className="w-full h-48 object-cover mb-4"
                        src={`/assets/${campaign.id}.png`}
                        alt="Campaign Image"
                      />
                      <p className="text-xl font-semibold">{campaign.title}</p>
                      <div className="text-right text-green-300">
                        바로가기 <i className="bi bi-chevron-right"></i>
                      </div>
                    </a>
                  </Link>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">D-{dDay}</p>
                    <p className="text-sm text-gray-600">
                      {campaign.nowAmount.toLocaleString()}원
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm">{donationPercent}%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${donationPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="spinner border-t-4 border-blue-500 w-8 h-8 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default CampaignCarousel;
