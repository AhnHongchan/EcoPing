import React, { useRef } from 'react';
import CampaignSlide from './CampaignSlide';
import { useParams } from 'react-router-dom';
import styles from './Campaign.module.css';

const Campaign = () => {
  const { campaignId } = useParams();
  const campaignSlideRef = useRef();

  // Mapping of campaign IDs to URLs
  const campaignUrls = {
    2: "https://www.shinhancard.com/pconts/html/benefit/event/1227117_2239.html",
    3: "https://www.shinhancard.com/pconts/html/benefit/event/1227874_2239.html",
    4: "https://m.shinhan.com/rib/mnew/index.jsp#220011320000",
    5: "https://www.shinhancard.com/evt/MOBEVENTN/MOBEVT036R10.shc",
  };

  // Determine the URL based on the campaignId
  const iframeUrl = campaignUrls[campaignId] || "https://www.shinhancard.com/pconts/html/benefit/event/1227874_2239.html"; // Default URL if id is not in the list

  const handleParticipateClick = () => {
    if (campaignSlideRef.current) {
      campaignSlideRef.current.donateDirectly();
    }
  };

  return (
    <div className={styles.campaignContainer}>
      <iframe
        src={iframeUrl}
        title="Shinhan Card Event"
        className={styles.iframe}
      >
      </iframe>

      {/* Button to directly trigger the donate action */}
      <button onClick={handleParticipateClick} className={styles.openModalButton}>
        바로 참여하기
      </button>

      {/* CampaignSlide component */}
      <CampaignSlide ref={campaignSlideRef} className={styles.openModalButton} />

    </div>
  );
};

export default Campaign;
