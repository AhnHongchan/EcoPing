package com.f1veguys.sel.domain.spendinghistory.service;

import com.f1veguys.sel.domain.spendinghistory.dto.MonthlySpendingDto;
import com.f1veguys.sel.domain.spendinghistory.dto.PeriodStatisticsResponse;
import com.f1veguys.sel.domain.spendinghistory.dto.StatisticsResponse;

import java.util.List;

public interface SpendingHistoryService {
    public StatisticsResponse getStatistics(int userId);
    public PeriodStatisticsResponse getPeriodStatistics(int userId, int period);
    public void saveSpendingHistory(int userId, int amount, String description);
    public double getSpendingSummary(int userId);
    public List<PeriodStatisticsResponse> getYearlySpendingSummary(int userId);
    public List<Double> getYearlySpendingRates(int userId);
}
