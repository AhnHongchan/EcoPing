package com.silvertown.ecoping.domain.points.controller;

import com.silvertown.ecoping.domain.points.domain.Points;
import com.silvertown.ecoping.domain.points.repository.PointsRepository;
import com.silvertown.ecoping.domain.points.service.PointsService;
import com.silvertown.ecoping.domain.pointshistory.service.PointsHistoryService;
import com.silvertown.ecoping.dto.Operation;
import com.silvertown.ecoping.dto.PointsCollectRequest;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/points")
@Slf4j
@RequiredArgsConstructor
public class PointsController {
    private final PointsService pointsService;
    private final PointsHistoryService pointsHistoryService;
    private final PointsRepository pointsRepository;

    @PostMapping("/collect")
    public ResponseEntity<?> collectPoints(HttpServletRequest request, @RequestBody PointsCollectRequest pointsCollectRequest) {
        int userId = request.getIntHeader("userId");
        int amount = pointsCollectRequest.getAmount();
        String description = pointsCollectRequest.getDescription();
        pointsService.addPoints(userId, amount);
        pointsHistoryService.savePointsHistory(userId, Operation.EARN, amount, description);
        return ResponseEntity.status(200).body("success");
    }

    @GetMapping("/mypoint")
    public ResponseEntity<?> getPoints(HttpServletRequest request) {
        int userId = request.getIntHeader("userId");
        Points points = pointsService.getPoints(userId);
        return ResponseEntity.status(200).body(points.getBalance());
    }
}
