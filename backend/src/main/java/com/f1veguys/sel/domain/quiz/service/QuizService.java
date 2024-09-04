package com.f1veguys.sel.domain.quiz.service;

import com.f1veguys.sel.domain.quiz.domain.Quiz;

public interface QuizService {
    public boolean canUserSolveQuiz(int userId);
    public Quiz getRandomQuiz();
    public boolean isCorrectAnswer(int quizId, boolean answer);
}
