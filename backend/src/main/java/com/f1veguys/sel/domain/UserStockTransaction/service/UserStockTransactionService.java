package com.f1veguys.sel.domain.UserStockTransaction.service;

import com.f1veguys.sel.domain.UserStockTransaction.domain.UserStockTransaction;
import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.user.domain.User;

import java.util.List;

public interface UserStockTransactionService {
    List<UserStockTransaction> getUserTransactions(User user);
    UserStockTransaction buyStock(User user, Company company, int quantity, double currentPrice);
    UserStockTransaction sellStock(User user, Company company, int quantity, double currentPrice);
}
