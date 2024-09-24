package com.silvertown.ecoping.domain.quiz.service;

import com.silvertown.ecoping.domain.quiz.domain.Quiz;

public interface QuizService {
    public boolean canUserSolveQuiz(int userId);
    public Quiz getRandomQuiz();
    public boolean isCorrectAnswer(int quizId, boolean answer);
}
