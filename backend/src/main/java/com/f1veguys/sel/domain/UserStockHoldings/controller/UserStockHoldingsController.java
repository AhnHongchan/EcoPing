package com.f1veguys.sel.domain.UserStockHoldings.controller;

import com.f1veguys.sel.domain.UserStockHoldings.service.UserStockHoldingsService;
import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.company.repository.CompanyRepository;
import com.f1veguys.sel.domain.customuser.CustomUserDetails;
import com.f1veguys.sel.domain.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/holdings")
@RequiredArgsConstructor
public class UserStockHoldingsController {

    private final UserStockHoldingsService holdingsService;
    private final CompanyRepository companyRepository;

    @GetMapping("/{companyNumber}")
    public ResponseEntity<?> getHoldings(@AuthenticationPrincipal CustomUserDetails userDetails,
                                         @PathVariable String companyNumber) {
        User user = userDetails.getUser();

        // companyNumber로 Company 찾기
        Company company = companyRepository.findByCompanyNumber(companyNumber)
                .orElseThrow(() -> new RuntimeException("해당 기업을 찾을 수 없습니다."));

        // 해당 사용자의 보유 주식 정보 조회
        int quantity = holdingsService.getHoldings(user, company);

        return ResponseEntity.ok(quantity);
    }

    @PostMapping("/{companyNumber}/update")
    public ResponseEntity<?> updateHoldings(@AuthenticationPrincipal CustomUserDetails userDetails,
                                            @PathVariable String companyNumber,
                                            @RequestParam int quantity,
                                            @RequestParam double purchasePrice,  // 주식 가격 추가
                                            @RequestParam boolean isBuy) {
        User user = userDetails.getUser();

        // companyNumber로 Company 찾기
        Company company = companyRepository.findByCompanyNumber(companyNumber)
                .orElseThrow(() -> new RuntimeException("해당 기업을 찾을 수 없습니다."));

        // 보유 주식 업데이트 (매수/매도)
        holdingsService.updateHoldings(user, company, quantity, isBuy, purchasePrice);

        return ResponseEntity.ok("보유 주식 업데이트 성공");
    }
}
