package com.f1veguys.sel.domain.ecoratio.repository;

import com.f1veguys.sel.domain.ecoratio.domain.EcoRatio;
import com.f1veguys.sel.dto.AgeGroup;
import com.f1veguys.sel.dto.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

public interface EcoRatioRepository extends JpaRepository<EcoRatio, Integer> {
    @Query("SELECT e FROM EcoRatio e WHERE e.date = (SELECT MAX(er.date) FROM EcoRatio er)")
    Optional<EcoRatio> findMostRecent();

    @Query("Select e From EcoRatio e WHERE e.date BETWEEN :startDate AND :endDate AND e.userId = :userId")
    List<EcoRatio> findBetween(
            @Param("userId") int userId,
            @Param("startDate") LocalDate startDate,
                               @Param("endDate") LocalDate endDate);

    @Query("SELECT new com.f1veguys.sel.domain.ecoratio.domain.EcoRatio(" +
            "sh.userId, " +
            "SUM(CASE WHEN sh.isEco = true THEN sh.amount ELSE 0 END), " +
            "SUM(sh.amount)) " +
            "FROM SpendingHistory sh " +
            "WHERE sh.spendTime BETWEEN :startDate AND :endDate " +
            "GROUP BY sh.userId")
    List<EcoRatio> calculateEcoRatios(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
}
