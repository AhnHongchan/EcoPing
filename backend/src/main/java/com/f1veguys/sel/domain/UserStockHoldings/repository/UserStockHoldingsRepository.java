package com.f1veguys.sel.domain.UserStockHoldings.repository;

import com.f1veguys.sel.domain.UserStockHoldings.domain.UserStockHoldings;
import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserStockHoldingsRepository extends JpaRepository<UserStockHoldings, Long> {

    // 사용자와 회사로 보유 주식 조회
    Optional<UserStockHoldings> findByUserAndCompany(User user, Company company);

    // 회사와 사용자로 보유 주식 조회
    Optional<UserStockHoldings> findByCompanyAndUser(Company company, User user);

    // 사용자로 모든 보유 주식 목록 조회 (추가된 메서드)
    List<UserStockHoldings> findAllByUser(User user);
}
