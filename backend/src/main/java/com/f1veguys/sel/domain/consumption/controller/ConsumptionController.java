package com.f1veguys.sel.domain.consumption.controller;

import com.f1veguys.sel.domain.consumption.dto.ConsumptionResponse;
import com.f1veguys.sel.domain.consumption.dto.ProductResponse;
import com.f1veguys.sel.domain.consumption.service.ConsumptionService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/consumption")
public class ConsumptionController {

    private final ConsumptionService consumptionService;
    private final RestTemplate restTemplate;

    @PostMapping("/")
    @Operation(summary = "최근 30일 구매목록 전송")
    public ResponseEntity<ProductResponse> findSimilarProducts() {
        List<ConsumptionResponse> consumptionResponseList = consumptionService.findRecentConsumption();

        String url = "https://j11a304.p.ssafy.io/py/find_similar_products";
        ResponseEntity<Map> response = restTemplate.postForEntity(url, consumptionResponseList, Map.class);

        // 외부 API의 응답 데이터 처리
        Map<String, Object> responseBody = response.getBody();

        if (responseBody != null) {
            String query = (String) responseBody.get("query");
            String similarProduct = (String) responseBody.get("similar_product");
            String manufacturer = (String) responseBody.get("manufacturer");
            double similarity = (Double) responseBody.get("similarity");

            ProductResponse similarProductResponse = new ProductResponse(
                    query, similarProduct, manufacturer, similarity
            );

            return ResponseEntity.ok(similarProductResponse);
        }

        return ResponseEntity.status(500).build();
    }
}
