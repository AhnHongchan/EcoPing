package com.f1veguys.sel.domain.spendinghistory.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PreviousMonthSummaryDto {
    private int totalPreviousMonth;
    private int ecoPreviousMonth;

}