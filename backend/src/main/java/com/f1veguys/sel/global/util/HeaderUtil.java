package com.f1veguys.sel.global.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Component
public class HeaderUtil {
    private final String apiKey;

    public HeaderUtil(@Value("${api.key}") String apiKey) {
        this.apiKey = apiKey;
    }

    public Map<String, String> createHeader(String apiName, String apiCode) {
        Map<String, String> header = new HashMap<>();

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmmss");

        header.put("apiName", apiName);
        header.put("transmissionDate", now.format(dateFormatter));
        header.put("transmissionTime", now.format(timeFormatter));
        header.put("apiKey", apiKey);
        header.put("apiServiceCode", apiCode);
        header.put("institutionCode", "00100");
        header.put("fintechAppNo", "001");
        header.put("institutionTransactionUniqueNo", UniqueNoGenerator.generateUniqueNo());

        return header;
    }

    public Map<String, String> createHeaderUser(String apiName, String apiCode, String userKey) {
        Map<String, String> header = createHeader(apiName, apiCode);
        header.put("userKey", userKey);

        return header;
    }
}