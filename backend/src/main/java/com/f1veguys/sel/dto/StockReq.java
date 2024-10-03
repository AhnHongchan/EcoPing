package com.f1veguys.sel.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StockReq {
    private String stockCode;  // 주식 코드 (예: "005930" 삼성전자)
}
