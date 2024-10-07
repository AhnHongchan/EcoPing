package com.f1veguys.sel.domain.UserStockHoldings.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserStockHoldingsDto {
    private String companyNumber;  // 회사 코드
    private String companyName;    // 회사 이름
    private int quantity;          // 보유 개수
    private double averagePurchasePrice;  // 평단가
}
