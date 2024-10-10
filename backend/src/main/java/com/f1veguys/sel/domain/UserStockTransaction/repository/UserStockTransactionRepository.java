package com.f1veguys.sel.domain.UserStockTransaction.repository;

import com.f1veguys.sel.domain.UserStockTransaction.domain.UserStockTransaction;
import com.f1veguys.sel.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserStockTransactionRepository extends JpaRepository<UserStockTransaction, Long> {
    List<UserStockTransaction> findByUser(User user);
}
