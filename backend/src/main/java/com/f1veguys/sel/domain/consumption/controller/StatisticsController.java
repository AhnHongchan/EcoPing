package com.f1veguys.sel.domain.consumption.controller;

import com.f1veguys.sel.domain.consumption.dto.Consumption;
import com.f1veguys.sel.domain.consumption.dto.Statistics;
import com.f1veguys.sel.domain.consumption.service.CsvService;
import com.f1veguys.sel.domain.consumption.service.StatisticsService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/csv")
public class StatisticsController {

    private final CsvService csvService;
    private final StatisticsService statisticsService;

    @PostMapping(value = "/statistics", consumes = "multipart/form-data")
    @Operation(summary = "30일 통계를 제공합니다.", description = "csv파일을 입력받아 최근 30일 최다 구매 상품을 응답합니다.")
    public ResponseEntity<?> uploadCSVFile(@RequestPart("file") MultipartFile file) {
        try {
            // 1. CSV 파일을 파싱하여 Consumption 객체 리스트로 변환
            List<Consumption> consumptionList = csvService.parseCSVFile(file);

            // 2. 통계 계산
            Statistics statistics = statisticsService.calculateStatistics(consumptionList);

            // 3. 통계 결과를 응답으로 반환
            return ResponseEntity.ok(statistics);
        } catch (Exception e) {
            // 오류가 발생하면 500 상태와 오류 메시지를 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("파일 처리 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}
