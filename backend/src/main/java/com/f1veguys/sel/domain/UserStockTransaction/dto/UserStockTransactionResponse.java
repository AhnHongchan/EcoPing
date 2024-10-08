package com.f1veguys.sel.domain.UserStockTransaction.dto;

import com.f1veguys.sel.domain.UserStockTransaction.domain.UserStockTransaction;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserStockTransactionResponse {
    private Long transactionId;
    private int userId;
    private String companyNumber;
    private int quantity;
    private double priceAtTransaction;
    private boolean isBuy;

    public UserStockTransactionResponse(UserStockTransaction transaction) {
        this.transactionId = transaction.getId();
        this.userId = transaction.getUser().getId();
        this.companyNumber = transaction.getCompany().getCompanyNumber();
        this.quantity = transaction.getQuantity();
        this.priceAtTransaction = transaction.getPriceAtTransaction();
        this.isBuy = transaction.isBuy();
    }
}
