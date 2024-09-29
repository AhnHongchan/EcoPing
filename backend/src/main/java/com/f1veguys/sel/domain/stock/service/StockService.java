package com.f1veguys.sel.domain.stock.service;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.Map;

public interface StockService {
    JsonNode getRealTimeStockData(String stockCode);
    Map<String, Object> getStockListData();
}
