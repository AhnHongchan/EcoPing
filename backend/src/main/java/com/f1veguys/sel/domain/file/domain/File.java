package com.f1veguys.sel.domain.file.domain;

import com.f1veguys.sel.domain.campaign.domain.Campaign;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "files")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Getter
@Setter
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "files_id")
    private int fileId;

    @Column(name = "files_path", nullable = false)
    private String path;

    @Column(name = "files_name", length = 100, nullable = false)
    private String name;

    @Column(name = "files_type", length = 25, nullable = false)
    private String type;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id", nullable = false)
    private Campaign campaign;

    @CreationTimestamp
    @Column(name = "uploaded_date")
    private LocalDateTime uploadedDate;
}
