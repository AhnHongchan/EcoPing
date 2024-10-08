package com.f1veguys.sel.domain.consumption.controller;

import com.f1veguys.sel.domain.consumption.service.CsvService;
import com.f1veguys.sel.domain.consumption.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/csv")
public class StatisticsController {

    private final CsvService csvService;
    private final StatisticsService statisticsService;

//    @PostMapping(value = "/statistics", consumes = "multipart/form-data")
//    @Operation(summary = "30일 통계를 제공합니다.", description = "csv파일을 입력받아 최근 30일 최다 구매 상품을 응답합니다.")
//    public ResponseEntity<?> uploadCSVFile(@RequestPart("file") MultipartFile file) {
//        try {
//            List<Consumption> consumptionList = csvService.parseCSVFile(file);
//
//            Statistics statistics = statisticsService.calculateStatistics(consumptionList);
//
//            return ResponseEntity.ok(statistics);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("파일 처리 중 오류가 발생했습니다: " + e.getMessage());
//        }
//    }
}
