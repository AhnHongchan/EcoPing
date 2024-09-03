package com.f1veguys.sel.domain.account.service;

public interface AccountService {
    public void depositBalance(int userId, int amount);
    public void withdrawBalance(int userId, int amount, String description);
    public void checkAccount(int userId);
}
