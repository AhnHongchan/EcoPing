package com.f1veguys.sel.domain.consumption.dto;

import java.time.LocalDateTime;

public record Consumption(
//        String category,
//        String company,
        String name,
        int price,
        int quantity,
        LocalDateTime date
) {
    public int getTotalAmount() {
        return price * quantity;
    }
}
