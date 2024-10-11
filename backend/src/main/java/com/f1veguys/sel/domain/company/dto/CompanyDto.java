package com.f1veguys.sel.domain.company.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompanyDto {
    private String companyName;
    private String companyNumber;
    private Double ecoScore;
    private Integer rank; // 순위를 나타내는 필드 추가

    public CompanyDto(String companyName, String companyNumber, Double ecoScore, Integer rank) {
        this.companyName = companyName;
        this.companyNumber = companyNumber;
        this.ecoScore = ecoScore;
        this.rank = rank;
    }
}
