package com.f1veguys.sel.domain.quiz.repository;

import com.f1veguys.sel.domain.quiz.domain.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Integer> {
}
