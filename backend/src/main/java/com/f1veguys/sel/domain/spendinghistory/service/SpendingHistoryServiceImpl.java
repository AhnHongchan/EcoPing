package com.f1veguys.sel.domain.spendinghistory.service;

import com.f1veguys.sel.domain.ecocompany.repository.EcoCompanyRepository;
import com.f1veguys.sel.domain.ecogroupratio.domain.EcoGroupRatio;
import com.f1veguys.sel.domain.ecogroupratio.repository.EcoGroupRatioRepository;
import com.f1veguys.sel.domain.ecoratio.domain.EcoRatio;
import com.f1veguys.sel.domain.ecoratio.repository.EcoRatioRepository;
import com.f1veguys.sel.domain.points.service.PointsService;
import com.f1veguys.sel.domain.pointshistory.service.PointsHistoryService;
import com.f1veguys.sel.domain.spendinghistory.domain.SpendingHistory;
import com.f1veguys.sel.domain.spendinghistory.dto.*;
import com.f1veguys.sel.domain.user.repository.UserRepository;
import com.f1veguys.sel.dto.Operation;
import com.f1veguys.sel.domain.spendinghistory.repository.SpendingHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SpendingHistoryServiceImpl implements SpendingHistoryService{
    private final SpendingHistoryRepository spendingHistoryRepository;
    private final EcoCompanyRepository ecoCompanyRepository;
    private final PointsService pointsService;
    private final PointsHistoryService pointsHistoryService;
    private final EcoRatioRepository ecoRatioRepository;
    private final UserRepository userRepository;
    private final EcoGroupRatioRepository ecoGroupRatioRepository;
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
        Optional<EcoGroupRatio> ratio = ecoGroupRatioRepository.findMostRecentUnknownGenderAndAllAgeGroup();
        double eco;
        if(ratio.isPresent()) {
            EcoGroupRatio ecoRatio = ratio.get();
            eco = ecoRatio.getEcoSum() / ecoRatio.getTotalSum();
        }else{
            eco = 0;
        }
        double lastMonth = (double) ecoAmount / totalAmount;
        return new StatisticsResponse(totalAmount, ecoAmount, (lastMonth-previousMonth)*100,
                (lastMonth-eco)*100, userRepository.findCampaignPointById(userId));
    }

    @Override
    public PeriodCompareResponse getPeriodStatistics(int userId, int period) {
        LocalDate today = LocalDate.now();
        LocalDate startDate = today.minusDays(period);
        LocalDate previousDate = startDate.minusDays(period);

        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = today.atStartOfDay();
        LocalDateTime previousDateTime = previousDate.atStartOfDay();

        int totalAmount = spendingHistoryRepository.getTotalAmount(userId, startDateTime, endDateTime);
        int ecoAmount = spendingHistoryRepository.getEcoAmount(userId, startDateTime, endDateTime);
        int previousEco = spendingHistoryRepository.getEcoAmount(userId, previousDateTime, startDateTime);
        int previousTotal = spendingHistoryRepository.getTotalAmount(userId, previousDateTime, startDateTime);
        double previousRatio;
        if(previousTotal!=0) {
            previousRatio = (double) previousEco / previousTotal;
            previousRatio = (double) Math.round(previousRatio * 100) /100;
        }else{
            previousRatio = 0d;
        }
        return new PeriodCompareResponse(totalAmount, ecoAmount, previousRatio);
    }

    @Override
    public void saveSpendingHistory(int userId, int amount, String description) {
        SpendingHistory spendingHistory = new SpendingHistory(userId, amount, description);
        if(ecoCompanyRepository.existsByName(description)){
            spendingHistory.setIsEco(true);
            pointsService.addPoints(userId, (int)(amount*0.005d), "친환경 소비 : "+description);
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

    @Override
    public List<PeriodStatisticsResponse> getYearlySpendingSummary(int userId) {
        LocalDateTime endDate = LocalDateTime.now().withDayOfMonth(1);
        LocalDateTime startDate = endDate.minusYears(1);
        List<Object[]> results = spendingHistoryRepository.getMonthlySpendingData(userId, startDate, endDate);
        List<MonthlySpendingDto> list = results.stream()
                .map(result -> new MonthlySpendingDto(
                        ((Number) result[0]).intValue(),
                        ((Number) result[1]).intValue(),
                        ((Number) result[2]).longValue(),
                        ((Number) result[3]).longValue()
                ))
                .toList();
        List<PeriodStatisticsResponse> responses = new ArrayList<>();
        for(MonthlySpendingDto monthlySpendingDto : list){
            PeriodStatisticsResponse monthly = new PeriodStatisticsResponse((int)monthlySpendingDto.getTotalSpending(),
                    (int)monthlySpendingDto.getEcoSpending());
            responses.add(monthly);
        }
        return responses;
    }

    @Override
    public List<Double> getYearlySpendingRates(int userId) {
        List<Double> result = new ArrayList<>();
        List<PeriodStatisticsResponse> spendingSummary = getYearlySpendingSummary(userId);
        for(int i=0; i<spendingSummary.size(); i++){
            PeriodStatisticsResponse periodSummary = spendingSummary.get(i);
            if(periodSummary.getTotalSpend()==0){
                result.add(0d);
                continue;
            }
            double ratio = (double) periodSummary.getEcoSpend()/periodSummary.getTotalSpend();
            ratio = ratio*100;
            ratio = Math.round(ratio*10)/10.0;
            result.add(ratio);
        }
        return result;
    }
}
