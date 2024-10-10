package com.f1veguys.sel.domain.campaign.service;

import com.f1veguys.sel.domain.campaign.domain.Campaign;
import com.f1veguys.sel.domain.campaign.dto.CampaignRequest;
import com.f1veguys.sel.domain.campaign.dto.CampaignResponse;
import com.f1veguys.sel.domain.campaign.repository.CampaignRepository;
import com.f1veguys.sel.domain.file.domain.File;
import com.f1veguys.sel.domain.file.service.FileService;
import com.f1veguys.sel.global.error.exception.CampaignNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CampaignServiceImpl implements CampaignService {

    private final CampaignRepository campaignRepository;
    private final FileService fileService;

    @Override
    public CampaignResponse createCampaign(CampaignRequest request, List<MultipartFile> files) throws IOException {
        Campaign campaign = Campaign.builder()
                .title(request.title())
                .goalAmount(request.goalAmount())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .completed(request.completed())
                .nowAmount(0)
                .build();

        Campaign savedCampaign = campaignRepository.save(campaign);

        if (files != null && !files.isEmpty()) {
            List<File> savedFiles = files.stream()
                    .map(file -> {
                        try {
                            return fileService.saveFile(file, savedCampaign);
                        } catch (IOException e) {
                            throw new RuntimeException("Failed to save file", e);
                        }
                    })
                    .collect(Collectors.toList());

        }

        return new CampaignResponse(savedCampaign);
    }

    @Override
    public CampaignResponse updateCampaign(int id, CampaignRequest request) {
        Campaign existingCampaign = campaignRepository.findById(id)
                .orElseThrow(CampaignNotFoundException::new);

        existingCampaign = existingCampaign.toBuilder()
                .title(request.title())
                .goalAmount(request.goalAmount())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .completed(request.completed())
                .build();

        Campaign savedCampaign = campaignRepository.save(existingCampaign);
        return new CampaignResponse(savedCampaign);
    }

    @Override
    public void deleteCampaign(int id) {
        Campaign existingCampaign = campaignRepository.findById(id)
                .orElseThrow(CampaignNotFoundException::new);
        campaignRepository.delete(existingCampaign);
    }

    @Override
    public CampaignResponse getCampaign(int id) {
        Campaign campaign = campaignRepository.findById(id).orElseThrow(CampaignNotFoundException::new);
        return new CampaignResponse(campaign);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CampaignResponse> getAllCampaigns() {
        return campaignRepository.findAll().stream()
                .map(CampaignResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CampaignResponse> getOngoingCampaigns() {
        return campaignRepository.findByCompletedFalse().stream()
                .map(CampaignResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CampaignResponse> getCompletedCampaigns() {
        return campaignRepository.findByCompletedTrue().stream()
                .map(CampaignResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public void completeCampaign(int id) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(CampaignNotFoundException::new);

        if (campaign.getEndDate() != null && campaign.getEndDate().isAfter(LocalDateTime.now())) {
            campaign = campaign.toBuilder()
                    .completed(true)
                    .build();
            campaignRepository.save(campaign);
        }
    }
}
