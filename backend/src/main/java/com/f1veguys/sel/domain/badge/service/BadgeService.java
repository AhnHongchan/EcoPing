package com.f1veguys.sel.domain.badge.service;

import com.f1veguys.sel.domain.badge.domain.Badge;

import java.util.List;

public interface BadgeService {

    List<Badge> getAllBadges(int userId);

    List<Badge> addBadge(int userId, int type);

    boolean isNewBadge(int userId, int badgeId);


}
