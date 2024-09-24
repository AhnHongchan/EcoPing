package com.silvertown.ecoping.domain.pointshistory.service;

import com.silvertown.ecoping.domain.pointshistory.domain.PointsHistory;
import com.silvertown.ecoping.dto.Operation;

import java.util.List;

public interface PointsHistoryService {
    public void savePointsHistory(int userId, Operation action, int amount, String description);
    public List<PointsHistory> getPointsHistory(int userId);
}
