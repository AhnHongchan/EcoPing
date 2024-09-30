package com.f1veguys.sel.domain.ecoratio.repository;

import com.f1veguys.sel.domain.ecoratio.domain.EcoRatio;
import com.f1veguys.sel.dto.AgeGroup;
import com.f1veguys.sel.dto.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EcoRatioRepository extends JpaRepository<EcoRatio, Integer> {
    @Query("SELECT e FROM EcoRatio e WHERE e.date = (SELECT MAX(er.date) FROM EcoRatio er)")
    Optional<EcoRatio> findMostRecent();

}
