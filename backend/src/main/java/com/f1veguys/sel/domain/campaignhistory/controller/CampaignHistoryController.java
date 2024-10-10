package com.f1veguys.sel.domain.campaignhistory.controller;

import com.f1veguys.sel.domain.campaignhistory.domain.CampaignHistory;
import com.f1veguys.sel.domain.campaignhistory.dto.CampaignHistoryResponse;
import com.f1veguys.sel.domain.campaignhistory.service.CampaignHistoryService;
import com.f1veguys.sel.domain.customuser.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/campaignhistory")
@Tag(name = "CampaignHistoryController", description = "캠페인 참여 API")
public class CampaignHistoryController {

    private final CampaignHistoryService campaignHistoryService;

    @PostMapping("/participate")
    @Operation(summary = "캠페인 참여", description = "사용자가 특정 캠페인에 참여합니다.")
    public ResponseEntity<CampaignHistory> participateInCampaign(
            @RequestBody Map<String, Object> request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        int userId = userDetails.getId();
        int campaignId = Integer.parseInt(request.get("campaignId").toString());
        int donatePoints = Integer.parseInt(request.get("donatePoints").toString());
        CampaignHistory campaignHistory = campaignHistoryService.participateInCampaign(campaignId, userId, donatePoints);
        return ResponseEntity.ok(campaignHistory);
    }

    @GetMapping("/info")
    @Operation(summary = "유저가 참여한 캠페인 조회", description = "사용자가 참여한 캠페인을 모두 조회합니다")
    public ResponseEntity<List<CampaignHistoryResponse>> getAllCampaigns(@AuthenticationPrincipal CustomUserDetails userDetails) {
        int id = userDetails.getId();
        List<CampaignHistoryResponse> campaignHistories = campaignHistoryService.getAllCampaigns(id);
        if (campaignHistories.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(campaignHistories);
    }
}
