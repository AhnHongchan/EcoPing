package com.f1veguys.sel.domain.consumption.repository;

import com.f1veguys.sel.domain.consumption.domain.Consumption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ConsumptionRepository extends JpaRepository<Consumption, Integer> {
    List<Consumption> findAllByDateAfter(LocalDateTime thirtyDaysAgo);
}
