package com.f1veguys.sel.domain.campaignhistory.service;

import com.f1veguys.sel.domain.campaign.domain.Campaign;
import com.f1veguys.sel.domain.campaignhistory.domain.CampaignHistory;
import com.f1veguys.sel.domain.campaignhistory.dto.CampaignHistoryResponse;
import com.f1veguys.sel.domain.campaignhistory.repository.CampaignHistoryRepository;
import com.f1veguys.sel.domain.campaign.repository.CampaignRepository;
import com.f1veguys.sel.domain.pointshistory.service.PointsHistoryService;
import com.f1veguys.sel.dto.Operation;
import com.f1veguys.sel.global.error.exception.CampaignNotFoundException;
import com.f1veguys.sel.global.error.exception.InsufficientPointsException;
import com.f1veguys.sel.global.error.exception.PointsNotFoundException;
import com.f1veguys.sel.global.error.exception.UserNotFoundException;
import com.f1veguys.sel.domain.points.domain.Points;
import com.f1veguys.sel.domain.points.repository.PointsRepository;
import com.f1veguys.sel.domain.user.domain.User;
import com.f1veguys.sel.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CampaignHistoryServiceImpl implements CampaignHistoryService {

    private final CampaignHistoryRepository campaignHistoryRepository;
    private final CampaignRepository campaignRepository;
    private final UserRepository userRepository;
    private final PointsRepository pointsRepository;
    private final PointsHistoryService pointsHistoryService;

    @Override
    public CampaignHistory participateInCampaign(int campaignId, int userId, int pay) {

        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(CampaignNotFoundException::new);

        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        Points userPoints = pointsRepository.findByUserId(userId)
                .orElseThrow(PointsNotFoundException::new);

        if (pay > userPoints.getBalance()) {
            throw new InsufficientPointsException();
        }

        CampaignHistory.CampaignHistoryId historyId = new CampaignHistory.CampaignHistoryId(campaignId, userId);

        CampaignHistory history = campaignHistoryRepository.findById(historyId).orElse(null);

        if (history == null) {
            history = CampaignHistory.builder()
                    .campaignId(campaignId)
                    .userId(userId)
                    .campaign(campaign)
                    .user(user)
                    .amount(pay)
                    .build();
        } else {
            history = history.toBuilder()
                    .amount(history.getAmount() + pay)
                    .build();
        }

        campaign = campaign.toBuilder()
                .nowAmount(campaign.getNowAmount() + pay)
                .build();
        campaignRepository.save(campaign);

        userPoints.setBalance(userPoints.getBalance() - pay);
        pointsRepository.save(userPoints);
        
        //내역 저장
        pointsHistoryService.savePointsHistory(userId, Operation.SPEND, pay, "캠페인 참여");
        userRepository.addCampaignPoint(userId, pay);

        return campaignHistoryRepository.save(history);
    }

    @Override
    public List<CampaignHistoryResponse> getAllCampaigns(int userId) {
        List<CampaignHistory> campaignHistories = campaignHistoryRepository.findAllByUser_Id(userId);

        return campaignHistories.stream().map(campaignHistory -> {
            Campaign campaign = campaignRepository.findById(campaignHistory.getCampaignId())
                    .orElseThrow(CampaignNotFoundException::new);
            LocalDateTime startDate = campaign.getStartDate();
            LocalDateTime endDate = campaign.getEndDate();
            return new CampaignHistoryResponse(campaignHistory, startDate, endDate,
                    campaign.getThumbnailUrl(), campaign.getContentUrl());
        }).collect(Collectors.toList());
    }
}
