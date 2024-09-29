package com.f1veguys.sel.domain.stock.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.f1veguys.sel.global.util.KisAccessTokenUtil;

@Service
public class StockServiceImpl implements StockService {

    private final KisAccessTokenUtil kisAccessTokenUtil;
    private final WebClient webClient;

    public StockServiceImpl(KisAccessTokenUtil kisAccessTokenUtil, WebClient.Builder webClientBuilder) {
        this.kisAccessTokenUtil = kisAccessTokenUtil;
        this.webClient = webClientBuilder
                .baseUrl(kisAccessTokenUtil.getKisConfig().getApiUrl())
                .build();
    }


    @Override
    public JsonNode getRealTimeStockData(String stockCode) {
        String token = kisAccessTokenUtil.getAccessToken(); // Access Token 가져오기
        String url = "/uapi/domestic-stock/v1/quotations/inquire-price";
        System.out.println(token);
        System.out.println(url);

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
