package com.f1veguys.sel.domain.consumption.dto;

public record ProductResponse(
        String query,
        String similarProduct,
        String manufacturer,
        Double similarity
) {
}
