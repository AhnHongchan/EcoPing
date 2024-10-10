package com.f1veguys.sel.domain.pointshistory.repository;

import com.f1veguys.sel.domain.pointshistory.domain.PointsHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface PointsHistoryRepository extends JpaRepository<PointsHistory, Integer> {

    @Query("SELECT ph FROM PointsHistory ph WHERE ph.userId = :userId ORDER BY ph.createdTime DESC")
    List<PointsHistory> findHistoryByUserId(@Param("userId") int userId);
}
