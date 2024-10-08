package com.f1veguys.sel.domain.consumptionhistory.dto;

import com.f1veguys.sel.domain.consumptionhistory.domain.ConsumptionHistory;

import java.time.LocalDateTime;

public record ConsumptionHistoryResponse(
        String name,
        int price,
        LocalDateTime date
) {
    public ConsumptionHistoryResponse(ConsumptionHistory consumptionHistory) {
        this(consumptionHistory.getName(), consumptionHistory.getPrice(), consumptionHistory.getDate());
    }
}
