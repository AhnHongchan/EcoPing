package com.silvertown.ecoping.domain.quiz.controller;


import com.silvertown.ecoping.domain.points.service.PointsService;
import com.silvertown.ecoping.domain.pointshistory.service.PointsHistoryService;
import com.silvertown.ecoping.domain.quiz.domain.Quiz;
import com.silvertown.ecoping.domain.quiz.dto.QuizDto;
import com.silvertown.ecoping.domain.quiz.service.QuizService;
import com.silvertown.ecoping.dto.Operation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/quiz")
public class QuizController {
    private final QuizService quizService;
    private final PointsService pointsService;
    private final PointsHistoryService pointsHistoryService;

    @GetMapping("/start")
    public ResponseEntity<?> startQuiz() {
        Quiz quiz = quizService.getRandomQuiz();
        Map<String, Object> response = new HashMap<>();
        response.put("quiz", quiz.getQuizQuestion());
        response.put("quizId", quiz.getQuizId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/continue")
    public ResponseEntity<?> continueQuiz(HttpServletRequest request,
                                          @RequestBody QuizDto quizDto) {
        int userId = request.getIntHeader("userId");
        int quizId = quizDto.getQuizId();
        boolean quizAnswer = quizDto.isAnswer();
        Map<String, Object> response = new HashMap<>();
        boolean isCorrect = quizService.isCorrectAnswer(quizId, quizAnswer);
        response.put("isCorrect", isCorrect);
        if (isCorrect) {
            if(quizService.canUserSolveQuiz(userId)){
                pointsService.addPoints(userId, 10);
                pointsHistoryService.savePointsHistory(userId, Operation.EARN,
                        10, "퀴즈 풀기");
            }
        }
        Quiz quiz = quizService.getRandomQuiz();
        response.put("quiz", quiz.getQuizQuestion());
        response.put("quizId", quiz.getQuizId());
        return ResponseEntity.ok(response);
    }
}
