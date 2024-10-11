package com.f1veguys.sel.domain.ecogroupratio.dto;

import com.f1veguys.sel.dto.AgeGroup;
import com.f1veguys.sel.dto.Gender;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EcoGroupRatioDto {
    private int id;
    private Gender gender;
    private AgeGroup ageGroup;
    private double ecoSum;
    private double totalSum;

    public EcoGroupRatioDto(Gender gender, String ageGroup, double ecoSum, double totalSum) {
        this.gender = gender;
        this.ageGroup = AgeGroup.valueOf(ageGroup);
        this.ecoSum = ecoSum;
        this.totalSum = totalSum;
    }


    // EcoRatio 계산 메소드
    public double calculateRatio() {
        return totalSum > 0 ? ecoSum / totalSum : 0;
    }
}