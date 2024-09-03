package com.f1veguys.sel.domain.campaign.dto;

import com.f1veguys.sel.domain.campaign.domain.Campaign;

import java.time.LocalDateTime;

public record CampaignResponse(
        int id,
        String title,
        int goalAmount,
        int nowAmount,
        boolean completed,
        LocalDateTime startDate,
        LocalDateTime endDate
) {
    public CampaignResponse(Campaign campaign) {
        this(
                campaign.getId(),
                campaign.getTitle(),
                campaign.getGoalAmount(),
                campaign.getNowAmount(),
                campaign.isCompleted(),
                campaign.getStartDate(),
                campaign.getEndDate()
        );
    }
}
