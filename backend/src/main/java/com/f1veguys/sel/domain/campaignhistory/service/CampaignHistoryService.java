package com.f1veguys.sel.domain.campaignhistory.service;

import com.f1veguys.sel.domain.campaignhistory.domain.CampaignHistory;
import com.f1veguys.sel.domain.campaignhistory.dto.CampaignHistoryResponse;

import java.util.List;

public interface CampaignHistoryService {
    CampaignHistory participateInCampaign(int campaignId, int userId, int contributionAmount);

    List<CampaignHistoryResponse> getAllCampaigns(int userId);

}
