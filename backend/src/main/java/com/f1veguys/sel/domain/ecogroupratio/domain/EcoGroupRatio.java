package com.f1veguys.sel.domain.ecogroupratio.domain;

import com.f1veguys.sel.domain.ecogroupratio.dto.EcoGroupRatioDto;
import com.f1veguys.sel.dto.AgeGroup;
import com.f1veguys.sel.dto.Gender;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "eco_group_ratio")
@NoArgsConstructor
public class EcoGroupRatio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "age_group")
    private AgeGroup ageGroup;
    @Column(nullable = false, name = "eco_sum")
    private double ecoSum;
    @Column(nullable = false, name = "total_sum")
    private double totalSum;
    @Column(nullable = false)
    private LocalDateTime date;
    public EcoGroupRatio(Gender gender, AgeGroup ageGroup, double ecoSum, double totalSum) {
        this.gender = gender;
        this.ageGroup = ageGroup;
        this.ecoSum = ecoSum;
        this.totalSum = totalSum;
        this.date = LocalDateTime.now();
    }

    public EcoGroupRatioDto toDto(){
        return new EcoGroupRatioDto(this.gender, this.ageGroup.toString(), this.ecoSum, this.totalSum);
    }

}
