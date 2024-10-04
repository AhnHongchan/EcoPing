package com.f1veguys.sel.global.util;

import com.f1veguys.sel.global.config.KisConfig;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Component
public class KisAccessTokenUtil {

    private final KisConfig kisConfig;
    private final WebClient webClient;
    private String accessToken;
    private String approvalKey;

    public KisAccessTokenUtil(KisConfig kisConfig, WebClient.Builder webClientBuilder) {
        this.kisConfig = kisConfig;
        this.webClient = webClientBuilder.baseUrl(kisConfig.getApiUrl()).build();
    }

    // Approval Key를 반환하는 메소드 (없을 경우 발급)
    public String getApprovalKey() {
        if (approvalKey == null) {
            log.info("Approval Key가 없으므로 새로 발급받습니다.");
            fetchApprovalKey();  // 첫 요청 시 발급
        }
        return approvalKey;
    }

    // Approval Key 발급 메소드
    public void fetchApprovalKey() {
        String url = "/oauth2/Approval";
        try {
            JsonNode response = webClient.post()
                    .uri(url)
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(BodyInserters.fromValue(new ApprovalRequestBody("client_credentials", kisConfig.getAppKey(), kisConfig.getAppSecret())))
                    .retrieve()
                    .bodyToMono(JsonNode.class)
                    .block();

            if (response != null && response.has("approval_key")) {
                approvalKey = response.get("approval_key").asText();
                log.info("Approval Key 발급 완료: {}", approvalKey);
            } else {
                log.error("Approval key not found in response");
                throw new RuntimeException("Approval key not found in response");
            }
        } catch (Exception e) {
            log.error("Approval Key 발급 중 오류 발생: {}", e.getMessage());
            throw new RuntimeException("Approval Key 발급 실패", e);
        }
    }

    // Access Token을 반환하는 메소드 (없을 경우 발급)
    public String getAccessToken() {
        if (accessToken == null) {
            log.info("Access Token이 없으므로 새로 발급받습니다.");
            getNewAccessToken();  // 첫 요청 시 발급
        }
        return accessToken;
    }

    // Access Token 발급 메소드
    public void getNewAccessToken() {
        String url = "/oauth2/tokenP";
        try {
            JsonNode response = webClient.post()
                    .uri(url)
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(BodyInserters.fromValue(new TokenRequestBody("client_credentials", kisConfig.getAppKey(), kisConfig.getAppSecret())))
                    .retrieve()
                    .bodyToMono(JsonNode.class)
                    .block();

            if (response != null && response.has("access_token")) {
                accessToken = response.get("access_token").asText();
                log.info("Access Token 발급 완료: {}", accessToken);
            } else {
                log.error("Access token not found in response");
                throw new RuntimeException("Access token not found in response");
            }
        } catch (Exception e) {
            log.error("Access Token 발급 중 오류 발생: {}", e.getMessage());
            throw new RuntimeException("Access Token 발급 실패", e);
        }
    }

    // Approval 요청의 Body 클래스
    @Getter
    @Setter
    @AllArgsConstructor
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private static class ApprovalRequestBody {
        private String grant_type;
        private String appkey;
        private String secretkey;
    }

    // Token 요청의 Body 클래스
    @Getter
    @Setter
    @AllArgsConstructor
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private static class TokenRequestBody {
        private String grant_type;
        private String appkey;
        private String appsecret;
    }
}
