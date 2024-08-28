package com.f1veguys.sel.campaign.repository;

import com.f1veguys.sel.campaign.domain.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CampaignRepository extends JpaRepository<Campaign, Integer> {

    List<Campaign> findByCompletedFalse();

    List<Campaign> findByCompletedTrue();

}
