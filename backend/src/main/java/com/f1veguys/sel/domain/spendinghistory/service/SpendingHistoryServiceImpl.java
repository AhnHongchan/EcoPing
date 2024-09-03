package com.f1veguys.sel.domain.spendinghistory.service;

import com.f1veguys.sel.domain.ecocompany.repository.EcoCompanyRepository;
import com.f1veguys.sel.domain.ecoratio.domain.EcoRatio;
import com.f1veguys.sel.domain.ecoratio.repository.EcoRatioRepository;
import com.f1veguys.sel.domain.points.service.PointsService;
import com.f1veguys.sel.domain.pointshistory.service.PointsHistoryService;
import com.f1veguys.sel.domain.spendinghistory.domain.SpendingHistory;
import com.f1veguys.sel.domain.spendinghistory.dto.PeriodStatisticsResponse;
import com.f1veguys.sel.domain.spendinghistory.dto.PreviousMonthSummaryDto;
import com.f1veguys.sel.domain.user.repository.UserRepository;
import com.f1veguys.sel.dto.Operation;
import com.f1veguys.sel.domain.spendinghistory.dto.StatisticsResponse;
import com.f1veguys.sel.domain.spendinghistory.repository.SpendingHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SpendingHistoryServiceImpl implements SpendingHistoryService{
    private final SpendingHistoryRepository spendingHistoryRepository;
    private final EcoCompanyRepository ecoCompanyRepository;
    private final PointsService pointsService;
    private final PointsHistoryService pointsHistoryService;
    private final EcoRatioRepository ecoRatioRepository;
    private final UserRepository userRepository;
    @Override
    public StatisticsResponse getStatistics(int userId) {
        int period = 30;
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusDays(period);
        int totalAmount = spendingHistoryRepository.getTotalAmount(userId, startDate, endDate);
        int ecoAmount = spendingHistoryRepository.getEcoAmount(userId, startDate, endDate);
        LocalDateTime yesterday = LocalDate.now().minusDays(1).atTime(LocalTime.MAX);
        LocalDateTime oneMonthAgo = yesterday.minusMonths(1);
        LocalDateTime twoMonthsAgo = yesterday.minusMonths(2);
        PreviousMonthSummaryDto summaryDto = spendingHistoryRepository.getSpendingSummary(userId, oneMonthAgo, twoMonthsAgo);
        double previousMonth ;
        if(summaryDto.getTotalPreviousMonth()!=0) {
            previousMonth = (double) summaryDto.getEcoPreviousMonth() / summaryDto.getTotalPreviousMonth();
        }else{
            previousMonth = 0;
        }
        Optional<EcoRatio> ratio = ecoRatioRepository.findMostRecent();
        double eco;
        if(ratio.isPresent()) {
            EcoRatio ecoRatio = ratio.get();
            eco = ecoRatio.getAverageRatio();
        }else{
            eco = 0;
        }
        double lastMonth = (double) ecoAmount / totalAmount;
        return new StatisticsResponse(totalAmount, ecoAmount, (lastMonth-previousMonth)*100,
                (lastMonth-eco)*100, userRepository.findCampaignPointById(userId));
    }

    @Override
    public PeriodStatisticsResponse getPeriodStatistics(int userId, int period) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusDays(period);
        int totalAmount = spendingHistoryRepository.getTotalAmount(userId, startDate, endDate);
        int ecoAmount = spendingHistoryRepository.getEcoAmount(userId, startDate, endDate);
        return new PeriodStatisticsResponse(totalAmount, ecoAmount);

    }

    @Override
    public void saveSpendingHistory(int userId, int amount, String description) {
        SpendingHistory spendingHistory = new SpendingHistory(userId, amount, description);
        if(ecoCompanyRepository.existsByName(description)){
            spendingHistory.setIsEco(true);
            pointsService.addPoints(userId, (int)(amount*0.005d));
            pointsHistoryService.savePointsHistory(userId, Operation.EARN, (int)(amount*0.005d), "친환경 소비 : "+description);
        }
        spendingHistoryRepository.save(spendingHistory);
    }

    @Override
    public double getSpendingSummary(int userId) {
        LocalDateTime yesterday = LocalDate.now().minusDays(1).atTime(LocalTime.MAX);
        LocalDateTime oneMonthAgo = yesterday.minusMonths(1);
        LocalDateTime twoMonthsAgo = yesterday.minusMonths(2);
        PreviousMonthSummaryDto summaryDto = spendingHistoryRepository.getSpendingSummary
                (userId, oneMonthAgo, twoMonthsAgo);
        double previousMonth;
        if(summaryDto.getTotalPreviousMonth()==0){
            previousMonth = 0;
        }else {
            previousMonth = (double) summaryDto.getEcoPreviousMonth() / summaryDto.getTotalPreviousMonth();
        }
        return previousMonth;
    }
}
