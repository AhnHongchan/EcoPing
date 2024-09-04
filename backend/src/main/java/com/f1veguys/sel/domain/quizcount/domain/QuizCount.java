package com.f1veguys.sel.domain.quizcount.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "quiz_count")
@Getter
@Setter
public class QuizCount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private int userId;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private int count;

}