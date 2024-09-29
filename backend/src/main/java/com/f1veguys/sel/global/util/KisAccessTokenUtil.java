package com.f1veguys.sel.global.util;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.f1veguys.sel.global.config.KisConfig;
import jakarta.annotation.PostConstruct;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class KisAccessTokenUtil {

    private final KisConfig kisConfig;
    private final WebClient webClient;
    private String accessToken;

    public KisAccessTokenUtil(KisConfig kisConfig, WebClient.Builder webClientBuilder) {
        this.kisConfig = kisConfig;
        this.webClient = webClientBuilder
                .baseUrl(kisConfig.getApiUrl())  // kisConfig에서 API URL을 가져옴
                .build();
    }

    @PostConstruct
    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul") // 매일 자정에 토큰을 갱신
    public void initializeToken() {
        getNewAccessToken();  // 토큰 초기화 및 갱신
    }

    // 새로운 Access Token을 발급받는 메소드
    public void getNewAccessToken() {
        String url = "/oauth2/tokenP";
        try {
            JsonNode response = webClient.post()
                    .uri(url)
                    .header("Content-Type", "application/json; charset=UTF-8") // Content-Type을 명시적으로 설정
                    .body(BodyInserters.fromValue(getTokenRequestBody()))
                    .retrieve()
                    .bodyToMono(JsonNode.class)
                    .block();

            if (response.has("access_token")) {
                accessToken = response.get("access_token").asText();
                log.info("KIS 접근 토큰 발급 완료: {}", accessToken);
            } else {
                log.error("Access token not found in response");
                throw new RuntimeException("Access token not found in response");
            }
        } catch (WebClientResponseException e) {
            log.error("토큰 발급 중 오류 발생: {}", e.getResponseBodyAsString());
            throw new RuntimeException("토큰 발급 실패");
        } catch (Exception e) {
            log.error("알 수 없는 오류 발생: {}", e.getMessage());
            throw new RuntimeException("알 수 없는 오류로 토큰 발급 실패");
        }
    }

    // 필요 시 accessToken을 반환하는 메소드
    public String getAccessToken() {
        if (accessToken == null) {
            getNewAccessToken();  // 만약 accessToken이 null이라면 새로운 토큰 발급
        }
        return accessToken;
    }

    private TokenRequestBody getTokenRequestBody() {
        return new TokenRequestBody("client_credentials", kisConfig.getAppKey(), kisConfig.getAppSecret());
    }

    public KisConfig getKisConfig() {
        return kisConfig;
    }

    private static class TokenRequestBody {
        private String grant_type;
        private String appkey;
        private String appsecret;

        public TokenRequestBody(String grant_type, String appkey, String appsecret) {
            this.grant_type = grant_type;
            this.appkey = appkey;
            this.appsecret = appsecret;
        }

        public String getGrant_type() {
            return grant_type;
        }

        public String getAppkey() {
            return appkey;
        }

        public String getAppsecret() {
            return appsecret;
        }
    }
}
