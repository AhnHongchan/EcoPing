package com.f1veguys.sel.domain.UserInterestedCompany.controller;

import com.f1veguys.sel.domain.UserInterestedCompany.service.UserInterestedCompanyService;
import com.f1veguys.sel.domain.customuser.CustomUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/interested-companies")
public class UserInterestedCompanyController {

    private final UserInterestedCompanyService interestedCompanyService;

    public UserInterestedCompanyController(UserInterestedCompanyService interestedCompanyService) {
        this.interestedCompanyService = interestedCompanyService;
    }

    // 흥미있는 기업 추가
    @PostMapping("/{companyNumber}/add")
    public ResponseEntity<?> addInterestedCompany(
            @PathVariable("companyNumber") String companyNumber,  // 여기에 명시적으로 이름을 지정
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        interestedCompanyService.addInterestedCompany(userDetails.getUser(), companyNumber);
        return ResponseEntity.ok("Company added to interests");
    }

    // 흥미있는 기업 제거
    @PostMapping("/{companyNumber}/remove")
    public ResponseEntity<?> removeInterestedCompany(
            @PathVariable("companyNumber") String companyNumber,  // 여기에 명시적으로 이름을 지정
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        interestedCompanyService.removeInterestedCompany(userDetails.getUser(), companyNumber);
        return ResponseEntity.ok("Company removed from interests");
    }

    // 흥미있는 기업 목록 조회
    @GetMapping("/list")
    public ResponseEntity<?> getInterestedCompanies(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(interestedCompanyService.getInterestedCompanies(userDetails.getUser()));
    }
}
