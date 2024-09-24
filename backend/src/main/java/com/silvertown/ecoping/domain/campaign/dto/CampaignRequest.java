package com.silvertown.ecoping.domain.campaign.dto;


import java.time.LocalDateTime;

public record CampaignRequest(
        String title,
        int goalAmount,
        LocalDateTime startDate,
        LocalDateTime endDate,
        boolean completed
) {
}
