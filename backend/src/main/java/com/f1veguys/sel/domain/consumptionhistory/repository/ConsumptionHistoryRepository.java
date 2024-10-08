package com.f1veguys.sel.domain.consumptionhistory.repository;

import com.f1veguys.sel.domain.consumptionhistory.domain.ConsumptionHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsumptionHistoryRepository extends JpaRepository<ConsumptionHistory, Integer> {

    List<ConsumptionHistory> findAllByIsEcoTrue();
}
