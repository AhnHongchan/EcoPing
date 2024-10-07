package com.f1veguys.sel.domain.company.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "company")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String companyNumber;
    private double ecoScore;
    private int ranking; // 순위 필드 추가
}
