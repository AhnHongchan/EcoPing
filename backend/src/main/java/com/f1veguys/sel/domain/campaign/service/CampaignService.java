package com.f1veguys.sel.domain.campaign.service;

import com.f1veguys.sel.domain.campaign.dto.CampaignRequest;
import com.f1veguys.sel.domain.campaign.dto.CampaignResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CampaignService {
    CampaignResponse createCampaign(CampaignRequest request, List<MultipartFile> files) throws IOException;

    CampaignResponse updateCampaign(int id, CampaignRequest request);

    void deleteCampaign(int id);

    CampaignResponse getCampaign(int campaignId);

    List<CampaignResponse> getAllCampaigns();

    List<CampaignResponse> getOngoingCampaigns();

    List<CampaignResponse> getCompletedCampaigns();

    void completeCampaign(int id);
}
