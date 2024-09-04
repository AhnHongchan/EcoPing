package com.f1veguys.sel.domain.campaignhistory.repository;

import com.f1veguys.sel.domain.campaignhistory.domain.CampaignHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampaignHistoryRepository extends JpaRepository<CampaignHistory, CampaignHistory.CampaignHistoryId> {
    List<CampaignHistory> findAllByUser_Id(int userId);

}
