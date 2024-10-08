package com.f1veguys.sel.domain.consumptionhistory.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "consumption_history")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Getter
public class ConsumptionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "consumption_history_id")
    private int id;

    @Column(name = "name", nullable = false)
    String name;

    @Column(name = "price")
    int price;

    @Column(name = "is_eco")
    boolean isEco;

    @Column(name = "spent_date")
    LocalDateTime date;

}
