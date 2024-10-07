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

    @PostMapping("/{companyNumber}/add")
    public ResponseEntity<?> addInterestedCompany(
        @PathVariable("companyNumber") String companyNumber,
        @AuthenticationPrincipal CustomUserDetails userDetails) {

        interestedCompanyService.addInterestedCompany(userDetails.getUser(), companyNumber);
        return ResponseEntity.ok("Company added to interests");
    }

    @PostMapping("/{companyNumber}/remove")
    public ResponseEntity<?> removeInterestedCompany(
        @PathVariable("companyNumber") String companyNumber,
        @AuthenticationPrincipal CustomUserDetails userDetails) {

        interestedCompanyService.removeInterestedCompany(userDetails.getUser(), companyNumber);
        return ResponseEntity.ok("Company removed from interests");
    }

    @GetMapping("/list")
    public ResponseEntity<?> getInterestedCompanies(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(interestedCompanyService.getInterestedCompanies(userDetails.getUser()));
    }
}
