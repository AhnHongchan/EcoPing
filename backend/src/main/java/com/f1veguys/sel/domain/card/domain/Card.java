package com.f1veguys.sel.domain.card.domain;

import com.f1veguys.sel.domain.user.domain.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "card")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "number_1")
    private String number1;

    @Column(name = "number_2")
    private String number2;

    @Column(name = "number_3")
    private String number3;

    @Column(name = "number_4")
    private String number4;

    @Column(name = "cvc")
    private String cvc;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference(value = "user-card")
    private User user;

}