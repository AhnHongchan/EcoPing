package com.f1veguys.sel.domain.UserStockHoldings.service;

import com.f1veguys.sel.domain.UserStockHoldings.domain.UserStockHoldings;
import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.user.domain.User;

import java.util.Optional;

public interface UserStockHoldingsService {
    UserStockHoldings updateHoldings(User user, Company company, int quantity, boolean isBuy, double purchasePrice);
    int getHoldings(User user, Company company);
    double getAveragePurchasePrice(User user, Company company);
    Optional<UserStockHoldings> getUserStockHoldings(Company company, User user);
}
