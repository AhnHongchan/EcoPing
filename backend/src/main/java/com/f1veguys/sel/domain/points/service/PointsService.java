package com.f1veguys.sel.domain.points.service;

import com.f1veguys.sel.domain.points.domain.Points;

public interface PointsService {
    public Points addPoints(int userId, int amount, String description);
    public Points getPoints(int userId);
    public Points removePoints(int userId, int amount, String description);
    public Points makePoints(int userId);
}
