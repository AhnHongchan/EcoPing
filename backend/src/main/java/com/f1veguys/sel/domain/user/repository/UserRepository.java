package com.f1veguys.sel.domain.user.repository;

import com.f1veguys.sel.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email); // 이메일로 사용자 찾기


    //캠페인 참여시 캠페인 포인트 증가
    @Modifying
    @Query("UPDATE User u SET u.campaignPoint = u.campaignPoint + :amount WHERE u.id = :userId")
    int addCampaignPoint(@Param("userId") int userId, @Param("amount") int amount);

    @Query("SELECT u.campaignPoint FROM User u WHERE u.id = :id")
    int findCampaignPointById(@Param("id") int id);

}
