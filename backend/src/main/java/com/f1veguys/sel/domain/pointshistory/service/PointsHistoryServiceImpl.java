package com.f1veguys.sel.domain.pointshistory.service;

import com.f1veguys.sel.dto.Operation;
import com.f1veguys.sel.domain.pointshistory.domain.PointsHistory;
import com.f1veguys.sel.domain.pointshistory.repository.PointsHistoryRepository;
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
        return pointsHistoryRepository.findHistoryByUserId(userId);
    }
}
