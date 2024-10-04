package com.f1veguys.sel.domain.stock.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.f1veguys.sel.global.config.KisConfig;
import com.f1veguys.sel.global.util.KisAccessTokenUtil;
import com.f1veguys.sel.domain.company.repository.CompanyRepository;
import com.f1veguys.sel.domain.company.domain.Company;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StockServiceImpl implements StockService {

    private final KisConfig kisConfig;
    private final KisAccessTokenUtil kisAccessTokenUtil;
    private final WebClient webClient;
    private final CompanyRepository companyRepository;

    public StockServiceImpl(KisConfig kisConfig, KisAccessTokenUtil kisAccessTokenUtil, WebClient.Builder webClientBuilder, CompanyRepository companyRepository) {
        this.kisConfig = kisConfig;
        this.kisAccessTokenUtil = kisAccessTokenUtil;
        this.webClient = webClientBuilder.baseUrl(kisConfig.getApiUrl()).build();
        this.companyRepository = companyRepository;
    }

    @Override
    public JsonNode getRealTimeStockData(String stockCode) {
        String token = kisAccessTokenUtil.getAccessToken();
        String url = "/uapi/domestic-stock/v1/quotations/inquire-price";

        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(url)
                        .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                        .queryParam("FID_INPUT_ISCD", stockCode)
                        .build())
                .header("Authorization", "Bearer " + token)
                .header("appkey", kisConfig.getAppKey())
                .header("appsecret", kisConfig.getAppSecret())
                .header("tr_id", "FHKST01010100")
                .retrieve()
                .bodyToMono(JsonNode.class)
                .block();
    }

    @Override
    public Map<String, Object> getStockListData() {
        return Map.of(
                "success", true,
                "message", "Stock list fetched from DB",
                "data", companyRepository.findAll()  // DB에서 회사 목록을 불러옴
        );
    }

    public JsonNode getStockChartData(String stockId, String period, String startDate, String endDate) {
        String token = kisAccessTokenUtil.getAccessToken();
        String url = "/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice";

        return webClient.get()
            .uri(uriBuilder -> uriBuilder
                .path(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")  // 주식, ETF, ETN을 나타냄
                .queryParam("FID_INPUT_ISCD", stockId)      // 종목코드 6자리
                .queryParam("FID_PERIOD_DIV_CODE", period)  // D: 일봉, W: 주봉, M: 월봉, Y: 년봉
                .queryParam("FID_INPUT_DATE_1", startDate)  // 시작일
                .queryParam("FID_INPUT_DATE_2", endDate)    // 종료일
                .queryParam("FID_ORG_ADJ_PRC", "0")         // 수정주가 여부 (0: 수정주가, 1: 원주가)
                .build())
            .header("Authorization", "Bearer " + token)
            .header("appkey", kisConfig.getAppKey())
            .header("appsecret", kisConfig.getAppSecret())
            .header("tr_id", "FHKST03010100")
            .retrieve()
            .bodyToMono(JsonNode.class)
            .block();
    }


    @Override
    public List<String> getAllCompanyCodes() {
        // DB에서 모든 기업 코드를 가져와 리스트로 반환
        return companyRepository.findAll().stream()
                .map(Company::getCompanyNumber)
                .collect(Collectors.toList());
    }
}
