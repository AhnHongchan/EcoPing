package com.f1veguys.sel.domain.user.domain;

import com.f1veguys.sel.domain.badge.domain.Badge;
import com.f1veguys.sel.domain.campaignhistory.domain.CampaignHistory;
import com.f1veguys.sel.domain.tree.domain.Tree;
import com.f1veguys.sel.dto.AgeGroup;
import com.f1veguys.sel.dto.Gender;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "user")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "users_id")
    private int id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "admin", nullable = false)
    private boolean admin;

    @Column(name = "api_id")
    private String apiId;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @CreationTimestamp
    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @Column(name = "account_num", nullable = false, unique = true)
    private String accountNum ="";

    @Column(name = "campaign_point", nullable = false)
    private int campaignPoint = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "age_group", nullable = false)
    private AgeGroup ageGroup;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "user-campaign-history")
    private List<CampaignHistory> campaignHistories;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "user-tree")
    private List<Tree> trees;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "user-badge")
    private List<Badge> badges;
}
