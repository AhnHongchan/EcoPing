package com.f1veguys.sel.domain.spendinghistory.controller;

import com.f1veguys.sel.domain.customuser.CustomUserDetails;
import com.f1veguys.sel.domain.ecogroupratio.dto.EcoGroupRatioDto;
import com.f1veguys.sel.domain.ecogroupratio.service.EcoGroupRatioService;
import com.f1veguys.sel.domain.ecoratio.service.EcoRatioService;
import com.f1veguys.sel.domain.file.service.FileService;
import com.f1veguys.sel.domain.spendinghistory.dto.PeriodCompareResponse;
import com.f1veguys.sel.domain.spendinghistory.dto.PeriodStatisticsResponse;
import com.f1veguys.sel.domain.spendinghistory.service.SpendingHistoryService;
import com.f1veguys.sel.dto.AgeGroup;
import com.f1veguys.sel.dto.Gender;
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
    private final EcoRatioService ecoRatioService;
    private final EcoGroupRatioService ecoGroupRatioService;


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
    @GetMapping("/byuser")
    public ResponseEntity<?> getStatisticsByUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
        int userId = userDetails.getId();
        return ResponseEntity.status(HttpStatus.OK).body(ecoRatioService.getEcoRatio(userId));
    }

    @GetMapping("/groupuser")
    public ResponseEntity<?> getStatisticsByGroup(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Gender gender = userDetails.getGender();
        AgeGroup ageGroup = userDetails.getAgeGroup();
        EcoGroupRatioDto ecoGroupRatioDto= ecoGroupRatioService.getAgeGroupRatio(gender, ageGroup);
        double response;
        if(ecoGroupRatioDto.getTotalSum()==0){
            response = 0;
        }else{
            response = ecoGroupRatioDto.getEcoSum()/ecoGroupRatioDto.getTotalSum();
            response = Math.round(response*100)/100.0;
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/alluser")
    public ResponseEntity<?> getYearStatisticsByUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
        EcoGroupRatioDto ecoGroupRatioDto = ecoGroupRatioService.getAllGroupRatio();
        double response;
        if(ecoGroupRatioDto.getTotalSum()==0){
            response = 0;
        }else{
            response = ecoGroupRatioDto.getEcoSum()/ecoGroupRatioDto.getTotalSum();
            response = Math.round(response*100)/100.0;
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{period}")
    public ResponseEntity<?> getPeriodStatistics(@PathVariable(value = "period") int period,
                                                 @AuthenticationPrincipal CustomUserDetails userDetails) {
        int userId = userDetails.getId();
        PeriodCompareResponse periodStatistics = spendingHistoryService.getPeriodStatistics(userId, period);
        return ResponseEntity.status(HttpStatus.OK).body(periodStatistics);
    }

}