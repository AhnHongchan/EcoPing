package com.f1veguys.sel.domain.pointshistory.service;

import com.f1veguys.sel.domain.pointshistory.domain.PointsHistory;
import com.f1veguys.sel.dto.Operation;

import java.time.LocalDateTime;
import java.util.List;

public interface PointsHistoryService {
    public void savePointsHistory(int userId, Operation action, int amount, String description);
    public List<PointsHistory> getPointsHistory(int userId);
}
