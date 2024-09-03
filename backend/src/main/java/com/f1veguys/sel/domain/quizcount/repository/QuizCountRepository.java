package com.f1veguys.sel.domain.quizcount.repository;

import com.f1veguys.sel.domain.quizcount.domain.QuizCount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface QuizCountRepository extends JpaRepository<QuizCount, Integer> {
    QuizCount findByUserIdAndDate(int userId, LocalDate date);
}
