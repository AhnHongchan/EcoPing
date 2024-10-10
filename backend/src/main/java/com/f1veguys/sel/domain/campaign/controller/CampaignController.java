package com.f1veguys.sel.domain.campaign.controller;

import com.f1veguys.sel.domain.campaign.dto.CampaignRequest;
import com.f1veguys.sel.domain.campaign.dto.CampaignResponse;
import com.f1veguys.sel.domain.campaign.service.CampaignService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
public class CampaignController {

    private final CampaignService campaignService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "캠페인 생성", description = "관리자가 캠페인을 생성합니다")
    public ResponseEntity<CampaignResponse> createCampaign(
            @RequestPart("campaign") CampaignRequest campaignRequest,
            @RequestPart("files") List<MultipartFile> files) throws IOException {
        CampaignResponse campaignResponse = campaignService.createCampaign(campaignRequest, files);
        return ResponseEntity.ok(campaignResponse);
    }

//    @PutMapping(value = "/{campaignId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    @Operation(summary = "캠페인 수정", description = "관리자가 캠페인을 수정합니다")
//    public ResponseEntity<CampaignResponse> updateCampaign(
//            @PathVariable("campaignId") int id,
//            @RequestPart("campaign") CampaignRequest campaignRequest,
//            @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
//        CampaignResponse updatedCampaign = campaignService.updateCampaign(id, campaignRequest, files);
//        return ResponseEntity.ok(updatedCampaign);
//    }

    @DeleteMapping("/{campaignId}")
    @Operation(summary = "캠페인 삭제", description = "관리자가 캠페인을 삭제합니다")
    public ResponseEntity<Void> deleteCampaign(@PathVariable("campaignId") int id) {
        campaignService.deleteCampaign(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{campaignId}")
    @Operation(summary = "캠페인 상세조회", description = "캠페인을 상세조회 합니다.")
    public ResponseEntity<CampaignResponse> getCampaign(@PathVariable("campaignId") int id) {
        CampaignResponse campaign = campaignService.getCampaign(id);
        return ResponseEntity.ok(campaign);
    }

    @PostMapping("/{campaignId}/complete")
    @Operation(summary = "캠페인 만료처리", description = "진행 기간이 만료된 캠페인을 만료 처리합니다.")
    public ResponseEntity<Void> completeCampaign(@PathVariable("campaignId") int id) {
        campaignService.completeCampaign(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @Operation(summary = "전체 캠페인 조회", description = "전체 캠페인을 조회합니다.")
    public ResponseEntity<List<CampaignResponse>> getAllCampaigns() {
        List<CampaignResponse> campaigns = campaignService.getAllCampaigns();
        return ResponseEntity.ok(campaigns);
    }

    @GetMapping("/ongoing")
    @Operation(summary = "진행중인 캠페인 조회", description = "진행중인 캠페인을 조회합니다.")
    public ResponseEntity<List<CampaignResponse>> getOngoingCampaigns() {
        List<CampaignResponse> campaigns = campaignService.getOngoingCampaigns();
        return ResponseEntity.ok(campaigns);
    }

    @GetMapping("/completed")
    @Operation(summary = "만료 캠페인 조회", description = "진행 기간이 만료된 캠페인을 조회합니다.")
    public ResponseEntity<List<CampaignResponse>> getCompletedCampaigns() {
        List<CampaignResponse> campaigns = campaignService.getCompletedCampaigns();
        return ResponseEntity.ok(campaigns);
    }
}
