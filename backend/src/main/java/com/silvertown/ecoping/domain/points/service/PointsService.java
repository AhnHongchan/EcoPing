package com.silvertown.ecoping.domain.points.service;

import com.silvertown.ecoping.domain.points.domain.Points;

public interface PointsService {
    public int addPoints(int userId, int amount);
    public Points getPoints(int userId);
    public int removePoints(int userId, int amount);
    public Points makePoints(int userId);
}
