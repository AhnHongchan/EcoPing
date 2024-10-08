package com.f1veguys.sel.domain.spendinghistory.controller;

import com.f1veguys.sel.domain.customuser.CustomUserDetails;
import com.f1veguys.sel.domain.spendinghistory.dto.MonthlySpendingDto;
import com.f1veguys.sel.domain.spendinghistory.dto.PeriodStatisticsResponse;
import com.f1veguys.sel.domain.spendinghistory.service.SpendingHistoryService;
import com.f1veguys.sel.domain.spendinghistory.dto.StatisticsResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/statistics")
@Slf4j
@RequiredArgsConstructor
public class SpendingHistoryController {
    private final SpendingHistoryService spendingHistoryService;

    @GetMapping("/year")
    public ResponseEntity<?> getYearStatistics(@AuthenticationPrincipal CustomUserDetails userDetails) {
        int userId = userDetails.getId();
        List<PeriodStatisticsResponse> statisticsResponse = spendingHistoryService.getYearlySpendingSummary(userId);
        return ResponseEntity.status(HttpStatus.OK).body(statisticsResponse);
    }
    @GetMapping("/ratio")
    public ResponseEntity<?> getYearRatioStatistics(@AuthenticationPrincipal CustomUserDetails userDetails) {
        int userId = userDetails.getId();
        List<Double> statisticsResponse = spendingHistoryService.getYearlySpendingRates(userId);
        return ResponseEntity.status(HttpStatus.OK).body(statisticsResponse);
    }
    @GetMapping("/{period}")
    public ResponseEntity<?> getPeriodStatistics(@PathVariable(value = "period") int period,
                                                 @AuthenticationPrincipal CustomUserDetails userDetails) {
        int userId = userDetails.getId();
        PeriodStatisticsResponse periodStatistics = spendingHistoryService.getPeriodStatistics(userId, period);
        return ResponseEntity.status(HttpStatus.OK).body(periodStatistics);
    }
}