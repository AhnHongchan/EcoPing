package com.f1veguys.sel.domain.spendinghistory.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PeriodStatisticsResponse {
    int totalSpend;
    int ecoSpend;
}
