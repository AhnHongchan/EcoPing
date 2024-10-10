package com.f1veguys.sel.domain.stock.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class StockChartDataDto {
    private String stckBsopDate; // 거래 날짜
    private String stckClpr; // 종가
    private String stckOprc; // 시가
    private String stckHgpr; // 고가
    private String stckLwpr; // 저가
    private String acmlVol; // 거래량
    private String acmlTrPbmn; // 거래대금
}
