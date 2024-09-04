package com.f1veguys.sel.domain.campaign.dto;


import java.time.LocalDateTime;

public record CampaignRequest(
        String title,
        int goalAmount,
        LocalDateTime startDate,
        LocalDateTime endDate,
        boolean completed
) {
}
