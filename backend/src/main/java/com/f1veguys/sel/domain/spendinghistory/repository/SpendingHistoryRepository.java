package com.f1veguys.sel.domain.spendinghistory.repository;


import com.f1veguys.sel.domain.spendinghistory.domain.SpendingHistory;
import com.f1veguys.sel.domain.spendinghistory.dto.PreviousMonthSummaryDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface SpendingHistoryRepository extends JpaRepository<SpendingHistory, Integer> {
    @Query("SELECT COALESCE(SUM(sh.amount), 0) " +
            "FROM SpendingHistory sh " +
            "WHERE sh.userId = :userId AND sh.spendTime >= :startDate AND sh.spendTime < :endDate")
    int getTotalAmount(@Param("userId") int userId,
                       @Param("startDate") LocalDateTime startDate,
                       @Param("endDate") LocalDateTime endDate);

    @Query("SELECT COALESCE(SUM(CASE WHEN sh.isEco = true THEN sh.amount ELSE 0 END), 0) " +
            "FROM SpendingHistory sh " +
            "WHERE sh.userId = :userId AND sh.spendTime >= :startDate AND sh.spendTime < :endDate")
    int getEcoAmount(@Param("userId") int userId,
                     @Param("startDate") LocalDateTime startDate,
                     @Param("endDate") LocalDateTime endDate);

    @Query("SELECT NEW com.f1veguys.sel.domain.spendinghistory.dto.PreviousMonthSummaryDto(" +
            "COALESCE(CAST(SUM(CASE WHEN sh.spendTime >= :twoMonthsAgo AND sh.spendTime < :oneMonthAgo THEN sh.amount ELSE 0 END) AS int), 0), " +
            "COALESCE(CAST(SUM(CASE WHEN sh.spendTime >= :twoMonthsAgo AND sh.spendTime < :oneMonthAgo AND sh.isEco = true THEN sh.amount ELSE 0 END) AS int), 0)) " +
            "FROM SpendingHistory sh " +
            "WHERE sh.userId = :userId AND sh.spendTime >= :twoMonthsAgo AND sh.spendTime < :oneMonthAgo")
    PreviousMonthSummaryDto getSpendingSummary(@Param("userId") int userId,
                                               @Param("oneMonthAgo") LocalDateTime oneMonthAgo,
                                               @Param("twoMonthsAgo") LocalDateTime twoMonthsAgo);

    @Query("SELECT SUM(CASE WHEN sh.isEco = true THEN sh.amount ELSE 0 END) as ecoSum, " +
            "SUM(sh.amount) as totalSum " +
            "FROM SpendingHistory sh " +
            "WHERE sh.spendTime >= :startDate AND sh.spendTime < :endDate")
    List<Integer[]> calculateAvgEco(@Param("startDate") LocalDateTime startDate,
                                         @Param("endDate") LocalDateTime endDate);


    @Query(value = "SELECT " +
            "YEAR(sh.spend_time) AS year, " +
            "MONTH(sh.spend_time) AS month, " +
            "COALESCE(SUM(sh.amount), 0) AS totalAmount, " +
            "COALESCE(SUM(CASE WHEN sh.is_eco = true THEN sh.amount ELSE 0 END), 0) AS ecoAmount " +
            "FROM spending_history sh " +
            "WHERE sh.users_id = :userId " +
            "AND sh.spend_time >= :startDate AND sh.spend_time < :endDate " +
            "GROUP BY YEAR(sh.spend_time), MONTH(sh.spend_time) " +
            "ORDER BY YEAR(sh.spend_time), MONTH(sh.spend_time)", nativeQuery = true)
    List<Object[]> getMonthlySpendingData(@Param("userId") int userId,
                                                    @Param("startDate") LocalDateTime startDate,
                                                    @Param("endDate") LocalDateTime endDate);
}
