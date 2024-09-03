import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import styles from './CampaignList.module.css';
import axios from 'axios';
import moment from 'moment';
import ProgressLine from './ProgressLine';
import { BiSearch, BiUser, BiDotsVerticalRounded } from 'react-icons/bi'; // Importing icons from react-icons

const CampaignList = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [localCampaigns, setLocalCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   const fetchCampaigns = async () => {
  //     try {
  //       const response = await axios.get('/api/campaigns/ongoing');
  //       setCampaigns(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch campaigns:", error);
  //     }
  //   };

  //   fetchCampaigns();
  // }, []);

  const fetchLocalCampaigns = async () => {
    try {
      const response = await fetch('/assets/camData.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLocalCampaigns(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch local campaigns:", error);
    }
  };

  useEffect(() => {
    fetchLocalCampaigns();
  }, []);

  const filteredCampaigns = [...campaigns, ...localCampaigns].filter(campaign =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.mainstyle}>
      {/* 파란색 배경만 존재 */}
      <div className={styles.bluebg}></div>

      {/* 캠페인 검색 및 리스트 */}
      <div className={styles.campaignContainer}>
        <p className={styles.campaignTitle}>캠페인 모아보기</p>
        <div className={styles.searchBarContainer}>
          <BiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="캠페인을 검색하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchBar}
          />
        </div>

        {/* Total Campaigns Count */}
        <p className={styles.campaignCount}>
          전체 {filteredCampaigns.length}건
        </p>

        {filteredCampaigns.length > 0 ? (
          <ul className={styles.campaignList}>
            {filteredCampaigns.map((campaign) => {
              const endDate = moment(campaign.endDate);
              const today = moment();
              const dDay = endDate.diff(today, 'days');

              const donationPercent = Math.floor((campaign.nowAmount / campaign.goalAmount) * 100);

              return (
                <li key={campaign.id} className={styles.campaignItem}>
                  <Link to={`/campaign/${campaign.id}`} className={styles.campaignLink}>
                    <img
                      className={styles.campaignImage}
                      src={`/assets/${campaign.id}.png`}
                      alt={campaign.title}
                    />
                    <div className={styles.campaignDetails}>
                      <p className={styles.campaignText}>{campaign.title}</p>
                      <div className={styles.campaignInfo}>
                        <p className={styles.campaignDays}>D-{dDay}</p>
                        <p className={styles.campaignAmount}>{campaign.nowAmount.toLocaleString()}원</p>
                      </div>
                      <p className={styles.campaignProgress}>{donationPercent}%</p>
                      <ProgressLine
                        visualParts={[
                          {
                            percentage: `${donationPercent}%`,
                            color: "#008DFF"
                          }
                        ]}
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>캠페인을 찾을 수 없습니다.</p> // 검색 결과가 없을 때 표시할 텍스트
        )}
        <div 
        style={{
          height:"80px",
        }}>
          {/* 안보이는 하단의 처리를 위하여 */}
        </div>
      </div>
    </div>
  );
};

export default CampaignList;
