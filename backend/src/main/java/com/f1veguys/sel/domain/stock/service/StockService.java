package com.f1veguys.sel.domain.stock.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.f1veguys.sel.domain.stock.dto.StockChartDataDto;

import java.util.List;
import java.util.Map;

public interface StockService {
    JsonNode getRealTimeStockData(String companyNumber);  // 특정 종목 실시간 주식 데이터 조회
    Map<String, Object> getStockListData();  // 여러 종목의 주식 리스트 데이터 조회
    List<StockChartDataDto> getStockChartData(String companyNumber, String period, String startDate, String endDate); // 차트 데이터 조회
    List<String> getAllCompanyCodes();  // DB에서 모든 기업 코드를 가져옴
}
