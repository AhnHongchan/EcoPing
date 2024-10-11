package com.f1veguys.sel.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StockPriceRes {

    @JsonProperty("stck_prpr")
    private String stockPrice;  // 현재 주식 가격

    @JsonProperty("stck_oprc")
    private String openingPrice;  // 시가

    @JsonProperty("stck_hgpr")
    private String highestPrice;  // 고가

    @JsonProperty("stck_lwpr")
    private String lowestPrice;   // 저가

    // 추가적인 주식 정보는 필요에 따라 필드 추가
}
