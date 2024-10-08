package com.f1veguys.sel.domain.points.controller;

import com.f1veguys.sel.domain.points.domain.Points;
import com.f1veguys.sel.domain.points.repository.PointsRepository;
import com.f1veguys.sel.domain.points.service.PointsService;
import com.f1veguys.sel.domain.pointshistory.service.PointsHistoryService;
import com.f1veguys.sel.dto.Operation;
import com.f1veguys.sel.dto.PointsCollectRequest;
import com.f1veguys.sel.global.util.HeaderUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

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
