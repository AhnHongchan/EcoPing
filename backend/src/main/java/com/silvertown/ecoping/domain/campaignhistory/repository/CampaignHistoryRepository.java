package com.silvertown.ecoping.domain.campaignhistory.repository;

import com.silvertown.ecoping.domain.campaignhistory.domain.CampaignHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampaignHistoryRepository extends JpaRepository<CampaignHistory, CampaignHistory.CampaignHistoryId> {
    List<CampaignHistory> findAllByUser_Id(int userId);

}
