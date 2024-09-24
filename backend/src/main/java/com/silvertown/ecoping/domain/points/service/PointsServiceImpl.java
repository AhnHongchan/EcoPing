package com.silvertown.ecoping.domain.points.service;

import com.silvertown.ecoping.domain.points.domain.Points;
import com.silvertown.ecoping.domain.points.repository.PointsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PointsServiceImpl implements PointsService{

    private final PointsRepository pointsRepository;
    @Override
    @Transactional
    public int addPoints(int userId, int amount) {
        return pointsRepository.addBalance(userId, amount);
    }

    @Override
    public Points getPoints(int userId) {
        return pointsRepository.findByUserId(userId).get();
    }

    @Override
    @Transactional
    public int removePoints(int userId, int amount) {
        return pointsRepository.removeBalance(userId, amount);
    }

    @Override
    public Points makePoints(int userId) {
        return new Points(userId);
    }
}
