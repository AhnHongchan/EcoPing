package com.f1veguys.sel.domain.points.service;

import com.f1veguys.sel.domain.points.domain.Points;
import com.f1veguys.sel.domain.points.repository.PointsRepository;
import com.f1veguys.sel.domain.pointshistory.service.PointsHistoryService;
import com.f1veguys.sel.dto.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PointsServiceImpl implements PointsService{

    private final PointsRepository pointsRepository;
    private final PointsHistoryService pointsHistoryService;

    @Override
    @Transactional
    public Points addPoints(int userId, int amount, String description) {
        Points points = pointsRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User points not found"));

        int nowPoint = points.increaseBalance(amount);
        pointsHistoryService.savePointsHistory(userId, Operation.EARN, amount, description, nowPoint);
        return points;
    }

    @Override
    public Points getPoints(int userId) {
        return pointsRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User points not found"));
    }

    @Override
    @Transactional
    public Points removePoints(int userId, int amount, String description) {
        Points points = pointsRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User points not found"));

        if (points.getBalance() < amount) {
            throw new RuntimeException("보유 포인트가 부족합니다.");
        }

        int nowPoint = points.decreaseBalance(amount);
        pointsHistoryService.savePointsHistory(userId, Operation.SPEND, amount, description, nowPoint);
        return points;
    }

    @Override
    public Points makePoints(int userId) {
        return new Points(userId);
    }
}
