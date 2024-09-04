package com.f1veguys.sel.domain.badge.repository;

import com.f1veguys.sel.domain.badge.domain.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, Integer> {
    List<Badge> findAllByUser_Id(int userId);
}
