package com.f1veguys.sel.domain.stock.service;

import com.f1veguys.sel.global.util.KisAccessTokenUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class StockServiceImpl implements StockService {

    private final KisAccessTokenUtil tokenUtil;
    private final WebClient webClient;

    public StockServiceImpl(KisAccessTokenUtil tokenUtil) {
        this.tokenUtil = tokenUtil;
        this.webClient = WebClient.builder()
                .baseUrl(tokenUtil.getApiUrl()) // KisConfig에서 가져온 API URL 사용
                .build();
    }

    @Override
    public String getRealTimeStockData() {
        String accessToken = tokenUtil.getAccessToken();
        return callKisApiWithToken(accessToken);
    }

    private String callKisApiWithToken(String token) {
        String url = "/uapi/domestic-stock/v1/quotations/inquire-price?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=005930"; // 주식 코드 예시
        return webClient.get()
                .uri(url)
                .header("Authorization", "Bearer " + token)
                .header("appKey", tokenUtil.getAppKey())
                .header("appSecret", tokenUtil.getAppSecret())
                .retrieve()
                .bodyToMono(String.class)
                .block(); // 동기 처리
    }
}
