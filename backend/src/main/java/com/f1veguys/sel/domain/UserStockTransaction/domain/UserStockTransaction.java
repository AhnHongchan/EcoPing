package com.f1veguys.sel.domain.UserStockTransaction.domain;

import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_stock_transaction")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserStockTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    private int quantity;
    private double priceAtTransaction;
    private boolean isBuy;

    @Column(name = "transaction_date")
    private LocalDateTime transactionDate;

    @PrePersist
    public void setTransactionDate() {
        this.transactionDate = LocalDateTime.now();
    }
}
