package com.f1veguys.sel.domain.points.service;

import com.f1veguys.sel.domain.points.domain.Points;

public interface PointsService {
    public int addPoints(int userId, int amount);
    public Points getPoints(int userId);
    public int removePoints(int userId, int amount);
    public Points makePoints(int userId);
}
