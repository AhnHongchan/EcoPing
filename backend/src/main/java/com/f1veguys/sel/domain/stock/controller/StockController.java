package com.f1veguys.sel.domain.stock.controller;

import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.company.service.CompanyService;
import com.f1veguys.sel.domain.stock.dto.StockChartDataDto;
import com.f1veguys.sel.domain.stock.service.StockService;
import com.f1veguys.sel.domain.UserStockHoldings.service.UserStockHoldingsService;
import com.f1veguys.sel.domain.UserStockTransaction.service.UserStockTransactionService;
import com.f1veguys.sel.domain.customuser.CustomUserDetails;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/stock")
public class StockController {

    private final StockService stockService;
    private final CompanyService companyService;
    private final UserStockHoldingsService userStockHoldingsService;
    private final UserStockTransactionService transactionService;

    public StockController(StockService stockService, CompanyService companyService,
        UserStockHoldingsService userStockHoldingsService,
        UserStockTransactionService transactionService) {
        this.stockService = stockService;
        this.companyService = companyService;
        this.userStockHoldingsService = userStockHoldingsService;
        this.transactionService = transactionService;
    }

    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getStockList() {
        Map<String, Object> response = stockService.getStockListData();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/initial-data")
    public ResponseEntity<List<Map<String, Object>>> getInitialStockData() {
        List<String> companyNumbers = companyService.getAllCompanyNumbers();
        List<Map<String, Object>> stockDataList = new ArrayList<>();

        for (String companyCode : companyNumbers) {
            JsonNode stockData = stockService.getRealTimeStockData(companyCode);

            // 필요한 데이터만 추출
            Map<String, Object> filteredStockData = new HashMap<>();
            filteredStockData.put("companyNumber", stockData.get("output").get("stck_shrn_iscd").asText());
            filteredStockData.put("stockName", stockData.get("output").get("rprs_mrkt_kor_name").asText());
            filteredStockData.put("currentPrice", stockData.get("output").get("stck_prpr").asText());
            filteredStockData.put("priceDifference", stockData.get("output").get("prdy_vrss").asText());
            filteredStockData.put("rateDifference", stockData.get("output").get("prdy_ctrt").asText());

            stockDataList.add(filteredStockData);
        }

        return ResponseEntity.ok(stockDataList);
    }

    @GetMapping("/chart/{companyNumber}/{period}")
    public ResponseEntity<Map<String, Object>> getStockChartData(
        @PathVariable("companyNumber") String companyNumber,
        @PathVariable("period") String period,
        @RequestParam("startDate") String startDate,
        @RequestParam("endDate") String endDate) {

        List<StockChartDataDto> chartDataList = stockService.getStockChartData(companyNumber, period, startDate, endDate);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", chartDataList);
        response.put("message", "Chart data fetched successfully");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{companyNumber}")
    public ResponseEntity<Map<String, Object>> getStockDetails(@PathVariable("companyNumber") String companyNumber,
        @AuthenticationPrincipal CustomUserDetails userDetails) {
        JsonNode stockData = stockService.getRealTimeStockData(companyNumber);
        JsonNode outputData = stockData.get("output");

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> stockDetails = new HashMap<>();

        // 주식의 기본 정보를 API에서 받아온 데이터로 설정
        stockDetails.put("companyNumber", companyNumber);
        stockDetails.put("stockName", outputData.has("rprs_mrkt_kor_name") ? outputData.get("rprs_mrkt_kor_name").asText() : "Unknown");
        stockDetails.put("currentPrice", outputData.has("stck_prpr") ? outputData.get("stck_prpr").asText() : "0");
        stockDetails.put("totalPrice", outputData.has("hts_avls") ? outputData.get("hts_avls").asText() : "0");
        stockDetails.put("min52", outputData.has("d250_lwpr") ? outputData.get("d250_lwpr").asText() : "0");
        stockDetails.put("max52", outputData.has("d250_hgpr") ? outputData.get("d250_hgpr").asText() : "0");
        stockDetails.put("per", outputData.has("per") ? outputData.get("per").asText() : "0");
        stockDetails.put("pbr", outputData.has("pbr") ? outputData.get("pbr").asText() : "0");
        stockDetails.put("priceDifference", outputData.has("prdy_vrss") ? outputData.get("prdy_vrss").asText() : "0");
        stockDetails.put("rateDifference", outputData.has("prdy_ctrt") ? outputData.get("prdy_ctrt").asText() : "0");

        // DB에서 회사 정보 조회 및 추가
        Optional<Company> company = companyService.getCompanyByCompanyNumber(companyNumber);
        if (company.isPresent()) {
            Company companyData = company.get();

            // 보유 주식 정보 조회
            int holdAmount = userStockHoldingsService.getHoldings(userDetails.getUser(), companyData);
            stockDetails.put("hold", holdAmount);

            // 에코 점수 및 순위 추가
            stockDetails.put("ecoScore", companyData.getEcoScore());
            stockDetails.put("ranking", companyData.getRanking());

            response.put("success", true);
            response.put("data", stockDetails);
            response.put("message", "Request successful");
        } else {
            response.put("success", false);
            response.put("message", "Company not found");
        }

        return ResponseEntity.ok(response);
    }
}
