package com.f1veguys.sel.domain.consumption.controller;

import com.f1veguys.sel.domain.consumption.dto.ConsumptionResponse;
import com.f1veguys.sel.domain.consumption.dto.ProductResponse;
import com.f1veguys.sel.domain.consumption.service.ConsumptionService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/consumption")
public class ConsumptionController {

    private final ConsumptionService consumptionService;
    private final RestTemplate restTemplate;

    @GetMapping("/")
    @Operation(summary = "최근 30일 구매목록 전송")
    public ResponseEntity<List<ProductResponse>> findSimilarProducts() {
        List<ConsumptionResponse> consumptionResponseList = consumptionService.findRecentConsumption();

        String url = "https://j11a304.p.ssafy.io/py/find_similar_products";
        ResponseEntity<Map> response = restTemplate.postForEntity(url, consumptionResponseList, Map.class);

        Map<String, Object> responseBody = response.getBody();

        if (responseBody != null) {
            List<Map<String, Object>> similarProducts = (List<Map<String, Object>>) responseBody.get("similar_products");

            List<ProductResponse> productResponseList = new ArrayList<>();

            for (Map<String, Object> productData : similarProducts) {
                String query = (String) productData.get("query");
                String similarProduct = (String) productData.get("similar_product");
                String manufacturer = (String) productData.get("manufacturer");

                Double similarity = productData.get("similarity") != null ? ((Double) productData.get("similarity")) : 0.0;

                ProductResponse productResponse = new ProductResponse(
                        query, similarProduct, manufacturer, similarity
                );
                productResponseList.add(productResponse);
            }

            return ResponseEntity.ok(productResponseList);
        }

        return ResponseEntity.status(500).build();
    }
}
