package com.f1veguys.sel.domain.stock.service;

import com.fasterxml.jackson.databind.JsonNode;

public interface StockService {
    JsonNode getRealTimeStockData(String stockCode);
}
