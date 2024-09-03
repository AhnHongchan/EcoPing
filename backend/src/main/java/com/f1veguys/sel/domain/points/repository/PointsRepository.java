package com.f1veguys.sel.domain.points.repository;

import com.f1veguys.sel.domain.points.domain.Points;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PointsRepository extends JpaRepository<Points, Integer> {
    Optional<Points> findByUserId(int userId);

    @Modifying
    @Query("UPDATE Points p SET p.balance = p.balance + :amount WHERE p.userId = :userId")
    int addBalance(@Param("userId") int userId, @Param("amount") int amount);

    @Modifying
    @Query("UPDATE Points p SET p.balance = p.balance - :amount WHERE p.userId = :userId")
    int removeBalance(@Param("userId") int userId, @Param("amount") int amount);
}
