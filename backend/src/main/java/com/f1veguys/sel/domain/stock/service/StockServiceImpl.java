package com.f1veguys.sel.domain.stock.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.f1veguys.sel.global.util.KisAccessTokenUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StockServiceImpl implements StockService {

    private final KisAccessTokenUtil kisAccessTokenUtil;
    private final WebClient webClient;

    public StockServiceImpl(KisAccessTokenUtil kisAccessTokenUtil, WebClient.Builder webClientBuilder) {
        this.kisAccessTokenUtil = kisAccessTokenUtil;
        this.webClient = webClientBuilder
                .baseUrl(kisAccessTokenUtil.getKisConfig().getApiUrl()) // API URL 설정
                .build();
    }

    @Override
    public JsonNode getRealTimeStockData(String stockCode) {
        String token = kisAccessTokenUtil.getAccessToken(); // Access Token 가져오기
        return getRealTimeStockData(stockCode, token); // 토큰을 인자로 넘겨서 데이터 가져오기
    }

    @Override
    public Map<String, Object> getStockListData() {
        List<String> stockCodes = List.of("005930", "000660", "035720"); // 주식 종목 코드 리스트
        List<Map<String, Object>> stockList = new ArrayList<>();

        String token = kisAccessTokenUtil.getAccessToken(); // 발급된 토큰 재사용

        stockCodes.parallelStream().forEach(stockCode -> {
            boolean success = false;
            int retryCount = 0;

            while (!success && retryCount < 3) {  // 최대 3회 재시도
                try {
                    JsonNode stockData = getRealTimeStockData(stockCode, token); // 토큰을 재사용하여 주식 데이터를 가져오기

                    // 데이터를 추출하여 Map 형태로 저장
                    Map<String, Object> stockDetails = new HashMap<>();
                    JsonNode outputData = stockData.get("output");

                    stockDetails.put("stockId", stockCode);
                    stockDetails.put("stockName", outputData.has("rprs_mrkt_kor_name") ? outputData.get("rprs_mrkt_kor_name").asText() : "Unknown");
                    stockDetails.put("currentPrice", outputData.has("stck_prpr") ? outputData.get("stck_prpr").asText() : "0");
                    stockDetails.put("priceDifference", outputData.has("prdy_vrss") ? outputData.get("prdy_vrss").asText() : "0");
                    stockDetails.put("rateDifference", outputData.has("prdy_ctrt") ? outputData.get("prdy_ctrt").asText() : "0");
                    stockDetails.put("isInterested", false); // 관심 여부는 나중에 추가 구현
                    stockList.add(stockDetails);

                    success = true;  // 성공적으로 데이터를 가져온 경우
                } catch (WebClientResponseException e) {
                    if (e.getStatusCode().is5xxServerError()) {
                        // 서버 오류일 경우 잠시 후 다시 시도
                        retryCount++;
                        try {
                            Thread.sleep(1000);  // 1초 대기 후 재시도
                        } catch (InterruptedException interruptedException) {
                            Thread.currentThread().interrupt();
                        }
                    } else {
                        break;
                    }
                } catch (Exception e) {
                    break;
                }
            }
        });

        // 최종적으로 클라이언트에게 반환할 데이터를 Map에 저장
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", stockList);
        response.put("message", "Stock list fetched successfully");

        return response;
    }


    // 토큰을 인자로 받아 실시간 주식 데이터를 가져오는 메서드
    public JsonNode getRealTimeStockData(String stockCode, String token) {
        String url = "/uapi/domestic-stock/v1/quotations/inquire-price";

        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(url)
                        .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                        .queryParam("FID_INPUT_ISCD", stockCode)
                        .build())
                .header("Authorization", "Bearer " + token)
                .header("appkey", kisAccessTokenUtil.getKisConfig().getAppKey())
                .header("appsecret", kisAccessTokenUtil.getKisConfig().getAppSecret())
                .header("tr_id", "FHKST01010100")
                .retrieve()
                .bodyToMono(JsonNode.class)
                .block();
    }
}
