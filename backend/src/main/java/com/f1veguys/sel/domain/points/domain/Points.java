package com.f1veguys.sel.domain.points.domain;

import com.f1veguys.sel.domain.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "points")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Getter
@Setter
public class Points {
    @Id
    @Column(name = "users_id")
    private int userId;

    private Integer balance=0;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", insertable = false, updatable = false)
    private User user;

    public Points(int userId) {
        this.userId = userId;
    }
}