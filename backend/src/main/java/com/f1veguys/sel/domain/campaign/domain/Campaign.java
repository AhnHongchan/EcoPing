package com.f1veguys.sel.domain.campaign.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "campaign")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Getter
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "campaign_id")
    private int id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "goal_amount", nullable = false)
    private int goalAmount;

    @Column(name = "now_amount", nullable = false)
    private int nowAmount;

    @Column(name = "completed", nullable = false)
    private boolean completed;

//    @OneToOne
//    @JoinColumn(name = "thumbnail_file_id")
//    private File thumbnailFile;

//    @OneToOne(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true)
//    private File file;

    @Column(name = "thumbnail_url", length = 512)
    private String thumbnailUrl;

    @Column(name = "content_url", length = 512)
    private String contentUrl;

    @CreationTimestamp
    private LocalDateTime uploadDate;
}
