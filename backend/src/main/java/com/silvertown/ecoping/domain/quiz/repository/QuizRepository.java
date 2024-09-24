package com.silvertown.ecoping.domain.quiz.repository;

import com.silvertown.ecoping.domain.quiz.domain.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Integer> {
}
