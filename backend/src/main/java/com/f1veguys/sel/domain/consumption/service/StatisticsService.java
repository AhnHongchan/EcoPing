package com.f1veguys.sel.domain.consumption.service;

import com.f1veguys.sel.domain.consumption.dto.ConsumptionResponse;
import com.f1veguys.sel.domain.consumption.dto.Statistics;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StatisticsService {

    public Statistics calculateStatistics(List<ConsumptionResponse> consumptionDtoList) {
        // 총 항목 수 계산
        int totalCount = consumptionDtoList.size();

        // 총 소비 금액 계산
        int totalAmount = consumptionDtoList.stream()
                .mapToInt(ConsumptionResponse::getTotalAmount)
                .sum();

        // 최근 30일 내에 가장 많이 구매한 3개 항목을 찾기 위한 로직
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime thirtyDaysAgo = now.minusDays(30);

        // 30일 이내의 소비 내역 필터링
        Map<String, Integer> itemPurchaseCount = consumptionDtoList.stream()
                .filter(consumptionDto -> consumptionDto.date().isAfter(thirtyDaysAgo))
                .collect(Collectors.groupingBy(ConsumptionResponse::name, Collectors.summingInt(ConsumptionResponse::quantity)));

        Map<String, Integer> top3Items = itemPurchaseCount.entrySet()
                .stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(1) // 1개 추출
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));

        // 항목이 없을 경우 빈 맵을 반환
        if (top3Items.isEmpty()) {
            top3Items = Collections.emptyMap();
        }

        // 결과로 Statistics 객체 반환
        return new Statistics(totalCount, totalAmount, top3Items);
    }
}
