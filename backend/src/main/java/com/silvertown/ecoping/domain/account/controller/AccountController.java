package com.silvertown.ecoping.domain.account.controller;

import com.silvertown.ecoping.domain.account.service.AccountService;
import com.silvertown.ecoping.dto.DepositRequest;
import com.silvertown.ecoping.dto.WithdrawalRequest;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/deposit")
public class AccountController {
    private final AccountService accountService;

    @PostMapping("/deposit")
    public ResponseEntity<?> depositBalance(HttpServletRequest request, @RequestBody DepositRequest depositRequest) {
        int userId = request.getIntHeader("userId");
        int amount = depositRequest.getAmount();
        accountService.depositBalance(userId, amount);
        return ResponseEntity.ok("success");
    }

    @PostMapping("/withdrawal")
    public ResponseEntity<?> withdrawalBalance(HttpServletRequest request, @RequestBody WithdrawalRequest withdrawalRequest) {
        int userId = request.getIntHeader("userId");
        int amount = withdrawalRequest.getAmount();
        String description = withdrawalRequest.getDescription();
        accountService.withdrawBalance(userId, amount, description);
        return ResponseEntity.ok("success");
    }

    @PostMapping("/check")
    public ResponseEntity<?> checkAccount(HttpServletRequest request) {
        int userId = request.getIntHeader("userId");
        accountService.checkAccount(userId);
        return ResponseEntity.ok("success");
    }
}
