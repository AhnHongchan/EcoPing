package com.f1veguys.sel.domain.consumption.dto;

import java.util.Map;

public record Statistics(
        int totalCount,
        int totalAmount,
        Map<String, Integer> statistics // 최근 30일간 가장 많이 구매한 1개
) {
}
