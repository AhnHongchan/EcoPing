package com.f1veguys.sel.domain.spendinghistory.domain;

import com.f1veguys.sel.domain.user.domain.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "SpendingHistory")
@Table(name = "spending_history")
public class SpendingHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "spend_id")
    private int spendId;

    @Column(name = "users_id")
    private int userId;

    @Column(name = "spend_time")
    private LocalDateTime spendTime;

    private Integer amount;

    @Column(name = "is_eco")
    private Boolean isEco;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", insertable = false, updatable = false)
    private User user;

    public SpendingHistory(int userId, int amount, String description) {
        this.userId = userId;
        this.amount = amount;
        this.description = description;
        this.spendTime = LocalDateTime.now();
        this.isEco = false;
    }
}