package com.f1veguys.sel.domain.consumption.dto;

import com.f1veguys.sel.domain.consumption.domain.Consumption;

import java.time.LocalDateTime;

public record ConsumptionResponse(
//        String category,
//        String company,
        String name, int price, int quantity, LocalDateTime date) {
    public int getTotalAmount() {
        return price * quantity;
    }

    public ConsumptionResponse(Consumption consumption) {
        this(consumption.getName(), consumption.getPrice(), consumption.getQuantity(), consumption.getDate());
    }
}
