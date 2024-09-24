package com.silvertown.ecoping.domain.campaignhistory.service;

import com.silvertown.ecoping.domain.campaignhistory.domain.CampaignHistory;
import com.silvertown.ecoping.domain.campaignhistory.dto.CampaignHistoryResponse;

import java.util.List;

public interface CampaignHistoryService {
    CampaignHistory participateInCampaign(int campaignId, int userId, int contributionAmount);

    List<CampaignHistoryResponse> getAllCampaigns(int userId);

}
