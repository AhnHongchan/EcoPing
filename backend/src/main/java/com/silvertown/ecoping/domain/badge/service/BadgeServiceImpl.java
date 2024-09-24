package com.silvertown.ecoping.domain.badge.service;

import com.silvertown.ecoping.domain.badge.domain.Badge;
import com.silvertown.ecoping.domain.badge.repository.BadgeRepository;
import com.silvertown.ecoping.domain.user.repository.UserRepository;
import com.silvertown.ecoping.global.error.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BadgeServiceImpl implements BadgeService {

    private final BadgeRepository badgeRepository;
    private final UserRepository userRepository;

    @Override
    public List<Badge> getAllBadges(int userId) {
        return badgeRepository.findAllByUser_Id(userId);
    }

    @Override
    public List<Badge> addBadge(int userId, int type) {
        List<Badge> badges = badgeRepository.findAllByUser_Id(userId);

        boolean alreadyHave = false;
        for (Badge b : badges) {
            if (b.getType() == type) {
                alreadyHave = true;
                break;
            }
        }

        if (!alreadyHave) {
            Badge badge = Badge.builder()
                    .user(userRepository.findById(userId).orElseThrow(UserNotFoundException::new))
                    .type(type)
                    .build();
            badgeRepository.save(badge);
        }

        return badgeRepository.findAllByUser_Id(userId);
    }
}
