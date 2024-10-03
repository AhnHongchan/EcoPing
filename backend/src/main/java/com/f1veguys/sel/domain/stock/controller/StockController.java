package com.f1veguys.sel.domain.stock.controller;

import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.company.service.CompanyService;
import com.f1veguys.sel.domain.stock.service.StockService;
import com.f1veguys.sel.domain.UserStockHoldings.service.UserStockHoldingsService;
import com.f1veguys.sel.domain.UserStockHoldings.domain.UserStockHoldings;
import com.f1veguys.sel.domain.UserStockTransaction.service.UserStockTransactionService;
import com.f1veguys.sel.domain.UserStockTransaction.domain.UserStockTransaction;
import com.f1veguys.sel.domain.customuser.CustomUserDetails;
import com.f1veguys.sel.domain.user.domain.User;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
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

    @GetMapping("/{stockId}")
    public ResponseEntity<Map<String, Object>> getStockDetails(@PathVariable("stockId") String stockId,
                                                               @AuthenticationPrincipal CustomUserDetails userDetails) {
        JsonNode stockData = stockService.getRealTimeStockData(stockId);
        JsonNode outputData = stockData.get("output");

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> stockDetails = new HashMap<>();

        // 주식의 기본 정보를 API에서 받아온 데이터로 설정
        stockDetails.put("stockId", stockId);
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
        Optional<Company> company = companyService.getCompanyByCompanyNumber(stockId);
        if (company.isPresent()) {
            Company companyData = company.get();

            // 보유 주식 정보 조회
            Optional<UserStockHoldings> holdings = userStockHoldingsService.getUserStockHoldings(companyData, userDetails.getUser());
            if (holdings.isPresent()) {
                int holdAmount = holdings.get().getQuantity();
                stockDetails.put("hold", holdAmount);

                if (holdAmount > 0) {
                    stockDetails.put("averagePurchasePrice", holdings.get().getAveragePurchasePrice());
                }
            } else {
                stockDetails.put("hold", 0);
            }

            stockDetails.put("isInterested", companyData.isInterested());
        } else {
            stockDetails.put("isInterested", false);
            stockDetails.put("hold", 0);
        }

        response.put("success", true);
        response.put("data", stockDetails);
        response.put("message", "Request successful");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/chart/{stockId}/{period}")
    public ResponseEntity<Map<String, Object>> getStockChartData(
            @PathVariable("stockId") String stockId,
            @PathVariable("period") String period,
            @RequestParam("startDate") String startDate,   // 파라미터 이름 명시
            @RequestParam("endDate") String endDate) {     // 파라미터 이름 명시

        JsonNode chartData = stockService.getStockChartData(stockId, period, startDate, endDate); // 시작일 및 종료일 추가

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", chartData);
        response.put("message", "Chart data fetched successfully");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/my-transactions")
    public ResponseEntity<List<UserStockTransaction>> getUserTransactions(@AuthenticationPrincipal CustomUserDetails userDetails) {
        User user = userDetails.getUser();
        List<UserStockTransaction> transactions = transactionService.getUserTransactions(user);
        return ResponseEntity.ok(transactions);
    }
}
