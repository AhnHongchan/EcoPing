package com.f1veguys.sel.domain.card.repository;

import com.f1veguys.sel.domain.card.domain.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Integer> {
}
