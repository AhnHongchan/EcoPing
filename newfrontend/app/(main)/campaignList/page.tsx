"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import ProgressLine from './../../../components/ProgressLine';
import { BiSearch, BiUser, BiDotsVerticalRounded } from 'react-icons/bi';
import instance from "@/lib/axios";
import Campaign from "../../types/campaign";

// interface Campaign {
//   id: number;
//   title: string;
//   endDate: string;
//   nowAmount: number;
//   goalAmount: number;
// }

const CampaignList = () => {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [localCampaigns, setLocalCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLocalCampaigns = async () => {
    try {
      const response = await instance.get('/campaigns');
      // const data = await response.data;
      setLocalCampaigns( response.data);
      console.log( response.data);
    } catch (error) {
      console.error("Failed to fetch local campaigns:", error);
    }
  };

  useEffect(() => {
    fetchLocalCampaigns();
  }, []);

  const filteredCampaigns = [...campaigns, ...localCampaigns].filter((campaign) =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
        <p className="text-black text-lg font-semibold">
          캠페인 모아보기
        </p>
         <div className="relative flex items-center w-full h-10 bg-gray-100 rounded-full pl-4 pr-2 mt-4">
          <BiSearch className="text-loginDarkGreen w-4 h-4" />
          <input
            type="text"
            placeholder="캠페인을 검색하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow border-none outline-none bg-transparent pl-2 text-sm text-loginDarkGreen placeholder-loginDarkGreen"
          />
        </div>
        <div className="w-full h-[1px] bg-gray-300 mt-4 mb-4"></div>
        <p className="mt-8 font-bold text-gray-700">전체 {filteredCampaigns.length}건</p>
        {filteredCampaigns.length > 0 ? (
          <ul className="mt-5 space-y-4">
            {filteredCampaigns.map((campaign) => {
              const endDate = moment(campaign.endDate);
              const today = moment();
              const dDay = endDate.diff(today, 'days');
              const donationPercent = Math.floor((campaign.nowAmount / campaign.goalAmount) * 100);

              return (
                <li
                  key={campaign.id}
                  className="bg-slate-50 rounded-lg shadow-md p-4"
                >
                  <Link href={`/campaign/${campaign.id}`}>
                    <div className="flex flex-col items-center text-gray-800">
                      <img
                        className="w-full h-60 object-cover rounded-md"
                        // src={`/assets/${campaign.id}.png`}
                        src={`${campaign.thumbnailUrl}`}
                        alt={campaign.title}
                      />
                      <div className="w-full mt-2">
                      <p className="text-xl font-semibold mt-2 ml-1">{campaign.title}</p>
                      <div className="mt-6 flex gap-2 items-center">
                      <p className="text-sm text-gray-600 bg-loginLightGreen rounded-lg pt-1 pb-1 pr-2 pl-2">
    {dDay >= 0 ? `D-${dDay}` : "종료됨"}
  </p>
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
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-5 text-center text-gray-500">캠페인을 찾을 수 없습니다.</p>
        )}
    </div>


  );
};

export default CampaignList;
