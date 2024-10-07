package com.f1veguys.sel.domain.UserStockTransaction.controller;

import com.f1veguys.sel.domain.UserStockTransaction.domain.UserStockTransaction;
import com.f1veguys.sel.domain.UserStockTransaction.dto.StockTransactionRequest;
import com.f1veguys.sel.domain.UserStockTransaction.service.UserStockTransactionService;
import com.f1veguys.sel.domain.UserStockHoldings.service.UserStockHoldingsService;
import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.company.service.CompanyService;
import com.f1veguys.sel.domain.customuser.CustomUserDetails;
import com.f1veguys.sel.domain.user.domain.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transaction/stock")
public class UserStockTransactionController {

    private final UserStockTransactionService transactionService;
    private final CompanyService companyService;
    private final UserStockHoldingsService holdingsService;

    public UserStockTransactionController(UserStockTransactionService transactionService,
        CompanyService companyService,
        UserStockHoldingsService holdingsService) {
        this.transactionService = transactionService;
        this.companyService = companyService;
        this.holdingsService = holdingsService;
    }

    // 매수
    @PostMapping("/{companyNumber}/buy")
    public ResponseEntity<UserStockTransaction> buyStock(
        @PathVariable("companyNumber") String companyNumber,
        @AuthenticationPrincipal CustomUserDetails userDetails,
        @RequestBody StockTransactionRequest request) {

        Optional<Company> company = companyService.getCompanyByCompanyNumber(companyNumber);
        if (company.isEmpty()) {
            throw new RuntimeException("Company not found");
        }

        UserStockTransaction transaction = transactionService.buyStock(userDetails.getUser(), company.get(), request.getQuantity(), request.getCurrentPrice());

        holdingsService.updateHoldings(userDetails.getUser(), company.get(), request.getQuantity(), true, request.getCurrentPrice());

        return ResponseEntity.ok(transaction);
    }

    // 매도
    @PostMapping("/{companyNumber}/sell")
    public ResponseEntity<UserStockTransaction> sellStock(
        @PathVariable("companyNumber") String companyNumber,
        @AuthenticationPrincipal CustomUserDetails userDetails,
        @RequestBody StockTransactionRequest request) {

        Optional<Company> company = companyService.getCompanyByCompanyNumber(companyNumber);
        if (company.isEmpty()) {
            throw new RuntimeException("Company not found");
        }

        UserStockTransaction transaction = transactionService.sellStock(userDetails.getUser(), company.get(), request.getQuantity(), request.getCurrentPrice());

        holdingsService.updateHoldings(userDetails.getUser(), company.get(), request.getQuantity(), false, request.getCurrentPrice());

        return ResponseEntity.ok(transaction);
    }

    // 주식 보유량 조회
    @GetMapping("/{companyNumber}/holdings")
    public ResponseEntity<Integer> getHoldings(
        @PathVariable("companyNumber") String companyNumber,
        @AuthenticationPrincipal CustomUserDetails userDetails) {

        Optional<Company> company = companyService.getCompanyByCompanyNumber(companyNumber);
        if (company.isEmpty()) {
            throw new RuntimeException("Company not found");
        }

        int holdings = holdingsService.getHoldings(userDetails.getUser(), company.get());
        return ResponseEntity.ok(holdings);
    }

    // 사용자 트랜잭션 조회
    @GetMapping("/my-transactions")
    public ResponseEntity<List<UserStockTransaction>> getUserTransactions(@AuthenticationPrincipal CustomUserDetails userDetails) {
        User user = userDetails.getUser();
        List<UserStockTransaction> transactions = transactionService.getUserTransactions(user);
        return ResponseEntity.ok(transactions);
    }
}
