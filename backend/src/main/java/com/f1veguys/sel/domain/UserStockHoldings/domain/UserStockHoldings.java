package com.f1veguys.sel.domain.UserStockHoldings.domain;

import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_stock_holdings")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class UserStockHoldings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private double averagePurchasePrice; // 평단가 추가

    public void increaseQuantity(int amount, double purchasePrice) {
        double totalCost = this.quantity * this.averagePurchasePrice;
        totalCost += amount * purchasePrice;
        this.quantity += amount;
        this.averagePurchasePrice = totalCost / this.quantity; // 새로운 평단가 계산
    }

    public void decreaseQuantity(int amount) {
        if (this.quantity - amount < 0) {
            throw new RuntimeException("보유한 주식 수가 부족합니다.");
        }
        this.quantity -= amount;
    }
}
