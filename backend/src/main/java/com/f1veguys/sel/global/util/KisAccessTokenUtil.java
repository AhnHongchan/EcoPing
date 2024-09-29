package com.f1veguys.sel.global.util;

import com.f1veguys.sel.dto.KisTokenCreateReq;
import com.f1veguys.sel.dto.KisTokenCreateRes;
import com.f1veguys.sel.global.error.exception.KisTokenRequestException;
import com.f1veguys.sel.global.config.KisConfig;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class KisAccessTokenUtil {

    private final WebClient kisWebClient;
    private final KisConfig kisConfig;

    private String accessToken;

    // KisConfig를 의존성으로 주입받는 생성자
    public KisAccessTokenUtil(KisConfig kisConfig) {
        this.kisConfig = kisConfig;
        this.kisWebClient = WebClient.builder()
                .baseUrl(kisConfig.getApiUrl()) // kisConfig에서 API URL 가져오기
                .build();
    }

    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    public void init() {
        KisTokenCreateReq kisTokenCreateReq = new KisTokenCreateReq(kisConfig);

        try {
            KisTokenCreateRes kisTokenCreateRes = kisWebClient
                    .post()
                    .uri("/oauth2/tokenP")
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(kisTokenCreateReq)
                    .retrieve()
                    .bodyToMono(KisTokenCreateRes.class)
                    .block();

            accessToken = kisTokenCreateRes.getAccessToken();
        } catch (Exception e) {
            throw new KisTokenRequestException("KIS Token Request Failed");
        }
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getAppKey() {
        return kisConfig.getAppKey();
    }

    public String getAppSecret() {
        return kisConfig.getAppSecret();
    }

    // getApiUrl 메서드 추가
    public String getApiUrl() {
        return kisConfig.getApiUrl();
    }
}
