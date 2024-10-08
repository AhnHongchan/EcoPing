package com.f1veguys.sel.domain.consumption.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "consumption")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Getter
public class Consumption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "consumption_id")
    private int id;

    @Column(name = "name", nullable = false)
    String name;

    @Column(name = "price")
    int price;

    @Column(name = "quantity")
    int quantity;

    @Column(name = "spent_date")
    LocalDateTime date;

}
