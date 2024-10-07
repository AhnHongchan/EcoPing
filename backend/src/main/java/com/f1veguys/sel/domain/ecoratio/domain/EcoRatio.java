package com.f1veguys.sel.domain.ecoratio.domain;

import com.f1veguys.sel.domain.ecoratio.dto.EcoRatioDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "eco_ratio")
@NoArgsConstructor
public class EcoRatio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false, name = "eco_amount")
    private long ecoAmount;

    @Column(nullable = false, name = "total_amount")
    private long totalAmount;

    @Column(name = "user_id", insertable = false, updatable = false)
    private int userId;
    public EcoRatio(int userId, long ecoAmount, long totalAmount) {
        this.userId = userId;
        this.ecoAmount = ecoAmount;
        this.totalAmount = totalAmount;
        this.date = LocalDate.now();
    }

    public EcoRatioDto toDto() {
        return new EcoRatioDto(this.getEcoAmount(), this.getTotalAmount());
    }
}