package com.f1veguys.sel.dto;

import com.f1veguys.sel.global.config.KisConfig;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class KisTokenCreateReq {

    private final String grant_type = "client_credentials"; // 고정된 값
    private final String appkey;
    private final String appsecret;

    // KisConfig로부터 appkey, appsecret 값을 설정
    public KisTokenCreateReq(KisConfig kisConfig) {
        this.appkey = kisConfig.getAppKey();
        this.appsecret = kisConfig.getAppSecret();
    }
}
