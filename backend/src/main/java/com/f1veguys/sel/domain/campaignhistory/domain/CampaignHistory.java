package com.f1veguys.sel.domain.campaignhistory.domain;

import com.f1veguys.sel.domain.campaign.domain.Campaign;
import com.f1veguys.sel.domain.user.domain.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "campaign_history")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Getter
@Setter
@IdClass(CampaignHistory.CampaignHistoryId.class)
public class CampaignHistory {

    @Id
    @Column(name = "campaign_id", insertable = false, updatable = false)
    private int campaignId;

    @Id
    @Column(name = "user_id", insertable = false, updatable = false)
    private int userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id", nullable = false)
    @MapsId("campaignId")
    @JsonBackReference(value = "campaign-history")
    private Campaign campaign;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @MapsId("userId")
    @JsonBackReference(value = "user-campaign-history")
    private User user;

    @Column(name = "amount")
    private int amount;

    @CreationTimestamp
    private LocalDateTime attendedDate;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @EqualsAndHashCode
    public static class CampaignHistoryId implements Serializable {
        private int campaignId;
        private int userId;
    }
}
