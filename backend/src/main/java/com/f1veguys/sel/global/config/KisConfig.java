package com.f1veguys.sel.global.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
public class KisConfig {

    @Value("${kis.api.appkey}")
    private String appKey;

    @Value("${kis.api.appsecret}")
    private String appSecret;

    @Value("${kis.api.api-url}")
    private String apiUrl;

    @Value("${kis.api.websocket-url}")
    private String websocketUrl;
}
