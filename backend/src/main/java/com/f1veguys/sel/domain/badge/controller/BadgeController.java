package com.f1veguys.sel.domain.badge.controller;

import com.f1veguys.sel.domain.badge.domain.Badge;
import com.f1veguys.sel.domain.badge.service.BadgeService;
import com.f1veguys.sel.domain.customuser.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/badge")
@Tag(name = "BadgeController", description = "나무 뱃지 API")
public class BadgeController {

    private final BadgeService badgeService;

    @GetMapping("/info")
    @Operation(summary = "모든 뱃지 조회", description = "사용자가 보유한 모든 나무 뱃지를 조회합니다.")
    public ResponseEntity<List<Badge>> getAllBadges(@AuthenticationPrincipal CustomUserDetails userDetails) {
        int id = userDetails.getId();
        List<Badge> badges = badgeService.getAllBadges(id);
        return ResponseEntity.ok(badges);
    }

    @PostMapping("/{userId}/{type}")
    @Operation(summary = "뱃지 추가", description = "랜덤으로 뱃지를 추가합니다.")
    public ResponseEntity<List<Badge>> addBadge(@PathVariable("userId") int id, @PathVariable("type") int type) {
        List<Badge> badges = badgeService.addBadge(id, type);
        return ResponseEntity.status(HttpStatus.CREATED).body(badges);
    }

}
