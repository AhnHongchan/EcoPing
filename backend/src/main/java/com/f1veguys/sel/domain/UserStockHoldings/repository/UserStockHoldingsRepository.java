package com.f1veguys.sel.domain.UserStockHoldings.repository;

import com.f1veguys.sel.domain.UserStockHoldings.domain.UserStockHoldings;
import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserStockHoldingsRepository extends JpaRepository<UserStockHoldings, Long> {
    Optional<UserStockHoldings> findByUserAndCompany(User user, Company company);

    Optional<UserStockHoldings> findByCompanyAndUser(Company company, User user);
}
