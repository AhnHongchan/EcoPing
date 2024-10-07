package com.f1veguys.sel.domain.company.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompanyDto {
    private String companyName;
    private String companyNumber;
    private Double ecoScore;

    public CompanyDto(String companyName, String companyNumber, Double ecoScore) {
        this.companyName = companyName;
        this.companyNumber = companyNumber;
        this.ecoScore = ecoScore;
    }

}