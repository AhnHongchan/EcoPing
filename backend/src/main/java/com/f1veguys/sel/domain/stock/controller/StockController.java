package com.f1veguys.sel.domain.stock.controller;

import com.f1veguys.sel.domain.stock.service.StockService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stock")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getStockList() {
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> stockList = new ArrayList<>();

        // 모의 데이터: 실제 DB 쿼리로 회사 코드를 가져오는 부분 대체 가능
        List<String> stockCodes = List.of("005930", "000660");

        for (String stockCode : stockCodes) {
            try {
                JsonNode stockData = stockService.getRealTimeStockData(stockCode);
                JsonNode outputData = stockData.get("output");

                Map<String, Object> stockInfo = new HashMap<>();
                stockInfo.put("stockId", stockCode);
                stockInfo.put("stockName", outputData.has("rprs_mrkt_kor_name") ? outputData.get("rprs_mrkt_kor_name").asText() : "Unknown");
                stockInfo.put("currentPrice", outputData.has("stck_prpr") ? outputData.get("stck_prpr").asText() : "0");
                stockInfo.put("priceDifference", outputData.has("prdy_vrss") ? outputData.get("prdy_vrss").asText() : "0");
                stockInfo.put("rateDifference", outputData.has("prdy_ctrt") ? outputData.get("prdy_ctrt").asText() : "0");
                stockInfo.put("isInterested", false);  // 관심 여부는 나중에 구현
                stockList.add(stockInfo);
            } catch (WebClientResponseException.Forbidden e) {
                // 403 에러 처리: 문제가 발생한 종목의 에러 로그 기록
                System.out.println("403 Forbidden 에러 발생: 종목 코드 = " + stockCode);
            } catch (Exception e) {
                // 다른 예외 처리
                System.out.println("오류 발생: 종목 코드 = " + stockCode);
                e.printStackTrace();
            }
        }

        response.put("success", true);
        response.put("data", stockList);
        response.put("message", "Request successful");

        return ResponseEntity.ok(response);
    }


    @GetMapping("/{stockId}")
    public ResponseEntity<Map<String, Object>> getStockDetails(@PathVariable("stockId") String stockId) {
        JsonNode stockData = stockService.getRealTimeStockData(stockId);

        // output 필드 내부에서 데이터 추출
        JsonNode outputData = stockData.get("output");

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> stockDetails = new HashMap<>();

        // 각 필드가 존재하는지 확인 후 처리 (output 필드를 기준으로 가져옵니다)
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
        stockDetails.put("isInterested", false);  // 관심 여부는 나중에 구현
        stockDetails.put("hold", 100);  // 사용자가 보유한 주식 수, 나중에 구현

        response.put("success", true);
        response.put("data", stockDetails);
        response.put("message", "Request successful");

        return ResponseEntity.ok(response);
    }


}
