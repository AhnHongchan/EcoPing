package com.f1veguys.sel.domain.spendinghistory.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MonthlySpendingDto {
    private int year;
    private int month;
    private int totalSpending;
    private int ecoSpending;


}
