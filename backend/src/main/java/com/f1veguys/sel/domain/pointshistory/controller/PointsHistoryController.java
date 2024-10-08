package com.f1veguys.sel.domain.pointshistory.controller;

import com.f1veguys.sel.domain.pointshistory.domain.PointsHistory;
import com.f1veguys.sel.domain.pointshistory.service.PointsHistoryService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/points-history")
@RequiredArgsConstructor
public class PointsHistoryController {
    private final PointsHistoryService pointsHistoryService;

    @GetMapping("/info")
    public ResponseEntity<?> getHistoryInfo(HttpServletRequest request) {
        int userId = request.getIntHeader("userId");
        List<PointsHistory> list = new ArrayList<>();
        list = pointsHistoryService.getPointsHistory(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("PointHistory", list);
        return ResponseEntity.ok(response);
    }
}
