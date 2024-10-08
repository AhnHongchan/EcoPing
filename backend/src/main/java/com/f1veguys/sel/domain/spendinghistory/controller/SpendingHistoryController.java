package com.f1veguys.sel.domain.spendinghistory.controller;

import com.f1veguys.sel.domain.spendinghistory.dto.PeriodStatisticsResponse;
import com.f1veguys.sel.domain.spendinghistory.service.SpendingHistoryService;
import com.f1veguys.sel.domain.spendinghistory.dto.StatisticsResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistics")
@Slf4j
@RequiredArgsConstructor
public class SpendingHistoryController {
    private final SpendingHistoryService spendingHistoryService;

    @GetMapping("")
    public ResponseEntity<?> getStatistics(HttpServletRequest request) {
        int userId = request.getIntHeader("userId");
        StatisticsResponse statisticsResponse = spendingHistoryService.getStatistics(userId);
        return ResponseEntity.status(HttpStatus.OK).body(statisticsResponse);
    }
    @GetMapping("/{period}")
    public ResponseEntity<?> getPeriodStatistics(@PathVariable(value = "period") int period, HttpServletRequest request) {
        int userId = request.getIntHeader("userId");
        PeriodStatisticsResponse periodStatistics = spendingHistoryService.getPeriodStatistics(userId, period);
        return ResponseEntity.status(HttpStatus.OK).body(periodStatistics);
    }
}