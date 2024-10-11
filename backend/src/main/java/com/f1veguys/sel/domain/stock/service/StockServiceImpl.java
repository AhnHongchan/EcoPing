package com.f1veguys.sel.domain.stock.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.f1veguys.sel.domain.stock.dto.StockChartDataDto;
import com.f1veguys.sel.global.config.KisConfig;
import com.f1veguys.sel.global.util.KisAccessTokenUtil;
import com.f1veguys.sel.domain.company.repository.CompanyRepository;
import com.f1veguys.sel.domain.company.domain.Company;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
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
    public JsonNode getRealTimeStockData(String companyNumber) {
        String token = kisAccessTokenUtil.getAccessToken();
        String url = "/uapi/domestic-stock/v1/quotations/inquire-price";

        return webClient.get()
            .uri(uriBuilder -> uriBuilder
                .path(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                .queryParam("FID_INPUT_ISCD", companyNumber)
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

    @Override
    public List<StockChartDataDto> getStockChartData(String companyNumber, String period, String startDate, String endDate) {
        String token = kisAccessTokenUtil.getAccessToken();
        String url = "/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice";

        JsonNode response = webClient.get()
            .uri(uriBuilder -> uriBuilder
                .path(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                .queryParam("FID_INPUT_ISCD", companyNumber)
                .queryParam("FID_PERIOD_DIV_CODE", period)
                .queryParam("FID_INPUT_DATE_1", startDate)
                .queryParam("FID_INPUT_DATE_2", endDate)
                .queryParam("FID_ORG_ADJ_PRC", "0")  // 수정주가 여부
                .build())
            .header("Authorization", "Bearer " + token)
            .header("appkey", kisConfig.getAppKey())
            .header("appsecret", kisConfig.getAppSecret())
            .header("tr_id", "FHKST03010100")
            .retrieve()
            .bodyToMono(JsonNode.class)
            .block();

        // JSON 응답을 DTO 리스트로 변환
        List<StockChartDataDto> chartDataList = new ArrayList<>();

        if (response != null && response.has("output2") && response.get("output2").isArray()) {
            JsonNode outputList = response.get("output2");
            for (JsonNode node : outputList) {
                StockChartDataDto dto = new StockChartDataDto(
                    node.has("stck_bsop_date") ? node.get("stck_bsop_date").asText() : "",
                    node.has("stck_clpr") ? node.get("stck_clpr").asText() : "",
                    node.has("stck_oprc") ? node.get("stck_oprc").asText() : "",
                    node.has("stck_hgpr") ? node.get("stck_hgpr").asText() : "",
                    node.has("stck_lwpr") ? node.get("stck_lwpr").asText() : "",
                    node.has("acml_vol") ? node.get("acml_vol").asText() : "",
                    node.has("acml_tr_pbmn") ? node.get("acml_tr_pbmn").asText() : ""
                );
                chartDataList.add(dto);
            }
        } else {
            // output2가 비어있거나 배열이 아닌 경우 로그 출력
        }

        return chartDataList;
    }

    @Override
    public List<String> getAllCompanyCodes() {
        // DB에서 모든 기업 코드를 가져와 리스트로 반환
        return companyRepository.findAll().stream()
            .map(Company::getCompanyNumber)
            .collect(Collectors.toList());
    }
}
