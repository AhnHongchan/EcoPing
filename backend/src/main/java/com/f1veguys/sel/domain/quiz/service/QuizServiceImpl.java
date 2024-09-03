package com.f1veguys.sel.domain.quiz.service;

import com.f1veguys.sel.domain.quiz.domain.Quiz;
import com.f1veguys.sel.domain.quiz.repository.QuizRepository;
import com.f1veguys.sel.domain.quizcount.domain.QuizCount;
import com.f1veguys.sel.domain.quizcount.repository.QuizCountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@RequiredArgsConstructor
@Service
public class QuizServiceImpl implements QuizService {
    private final QuizRepository quizRepository;
    private final QuizCountRepository QuizCountRepository;

    @Override
    @Transactional
    public boolean canUserSolveQuiz(int userId) {
        LocalDate today = LocalDate.now();
        QuizCount quizCount = QuizCountRepository.findByUserIdAndDate(userId, today);

        if (quizCount == null) {
            quizCount = new QuizCount();
            quizCount.setUserId(userId);
            quizCount.setDate(today);
            quizCount.setCount(0);
        }

        if (quizCount.getCount() < 10) {
            quizCount.setCount(quizCount.getCount() + 1);
            QuizCountRepository.save(quizCount);
            return true;
        }
        return false;
    }

    @Override
    public Quiz getRandomQuiz() {
        long count = quizRepository.count();
        int randomIndex = (int) (Math.random() * count);
        return quizRepository.findAll().get(randomIndex);
    }

    @Override
    public boolean isCorrectAnswer(int quizId, boolean answer) {
        Quiz quiz = quizRepository.findById(quizId).get();
        System.out.println("answer: " + answer);
        System.out.println("answer2: "+ quiz.isQuizAnswer());
        return quiz.isQuizAnswer()==answer;
    }
}
