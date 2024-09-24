package com.silvertown.ecoping.domain.pointshistory.service;

import com.silvertown.ecoping.dto.Operation;
import com.silvertown.ecoping.domain.pointshistory.domain.PointsHistory;
import com.silvertown.ecoping.domain.pointshistory.repository.PointsHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PointsHistoryServiceImpl implements PointsHistoryService {
    private final PointsHistoryRepository pointsHistoryRepository;
    @Override
    public void savePointsHistory(int userId, Operation action, int amount, String description) {
        PointsHistory pointsHistory = new PointsHistory(userId, action, amount, description);
        pointsHistoryRepository.save(pointsHistory);
    }

    @Override
    public List<PointsHistory> getPointsHistory(int userId) {
        List<PointsHistory> response = new ArrayList<>();
        LocalDateTime from = LocalDateTime.now().minusMonths(1L);
        response = pointsHistoryRepository.findLastMonthHistoryByUserId(userId, from);
        return response;
    }
}
