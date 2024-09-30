package com.f1veguys.sel.domain.ecogroupratio.domain;

import com.f1veguys.sel.dto.AgeGroup;
import com.f1veguys.sel.dto.Gender;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @Column(nullable = false)
    private AgeGroup ageGroup;
    @Column(nullable = false)
    private double ecoSum;
    @Column(nullable = false)
    private double totalSum;
    public EcoGroupRatio(Gender gender, AgeGroup ageGroup, double ecoSum, double totalSum) {
        this.gender = gender;
        this.ageGroup = ageGroup;
        this.ecoSum = ecoSum;
        this.totalSum = totalSum;
    }

}
