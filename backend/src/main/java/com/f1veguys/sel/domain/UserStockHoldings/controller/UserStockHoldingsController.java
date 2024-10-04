package com.f1veguys.sel.domain.UserStockHoldings.controller;

import com.f1veguys.sel.domain.UserStockHoldings.dto.UserStockHoldingsDto;
import com.f1veguys.sel.domain.UserStockHoldings.service.UserStockHoldingsService;
import com.f1veguys.sel.domain.customuser.CustomUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/holdings")
public class UserStockHoldingsController {

    private final UserStockHoldingsService holdingsService;

    public UserStockHoldingsController(UserStockHoldingsService holdingsService) {
        this.holdingsService = holdingsService;
    }

    // 사용자가 소유한 모든 주식 목록을 가져오는 API
    @GetMapping("/list")
    public ResponseEntity<List<UserStockHoldingsDto>> getHoldingsList(@AuthenticationPrincipal CustomUserDetails userDetails) {
        List<UserStockHoldingsDto> holdingsList = holdingsService.getUserStockHoldingsList(userDetails.getUser());
        return ResponseEntity.ok(holdingsList);
    }
}
