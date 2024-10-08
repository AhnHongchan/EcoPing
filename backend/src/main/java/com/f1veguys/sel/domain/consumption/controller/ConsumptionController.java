package com.f1veguys.sel.domain.consumption.controller;

import com.f1veguys.sel.domain.consumption.dto.ConsumptionResponse;
import com.f1veguys.sel.domain.consumption.service.ConsumptionService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/consumption")
public class ConsumptionController {

    private final ConsumptionService consumptionService;
    private final RestTemplate restTemplate;

    @PostMapping("/")
    @Operation(summary = "최근 30일 구매목록 전송")
    public ResponseEntity<List<ConsumptionResponse>> findSimilarProducts() {
        List<ConsumptionResponse> consumptionResponseList = consumptionService.findRecentConsumption();

        String url = "https://j11a304.p.ssafy.io/py/find_similar_products";
        restTemplate.postForEntity(url, consumptionResponseList, Void.class);

        return ResponseEntity.ok(consumptionResponseList);
    }
}
