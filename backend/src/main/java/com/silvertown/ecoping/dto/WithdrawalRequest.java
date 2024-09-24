package com.silvertown.ecoping.dto;

import lombok.Getter;

@Getter
public class WithdrawalRequest {
    int amount;
    String description;
}
