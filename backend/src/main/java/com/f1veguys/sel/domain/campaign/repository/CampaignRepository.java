package com.f1veguys.sel.domain.campaign.repository;

import com.f1veguys.sel.domain.campaign.domain.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Integer> {

    List<Campaign> findByCompletedFalse();

    List<Campaign> findByCompletedTrue();

}
