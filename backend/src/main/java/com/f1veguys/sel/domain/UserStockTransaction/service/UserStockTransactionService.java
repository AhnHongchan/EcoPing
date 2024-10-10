package com.f1veguys.sel.domain.UserStockTransaction.service;

import com.f1veguys.sel.domain.UserStockTransaction.dto.UserStockTransactionResponse;
import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.user.domain.User;

import java.util.List;

public interface UserStockTransactionService {

    UserStockTransactionResponse buyStock(User user, Company company, int quantity, double currentPrice);

    UserStockTransactionResponse sellStock(User user, Company company, int quantity, double currentPrice);

    List<UserStockTransactionResponse> getUserTransactions(User user);
}
