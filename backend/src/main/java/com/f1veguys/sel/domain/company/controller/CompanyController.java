package com.f1veguys.sel.domain.company.controller;

import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.company.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    // companyNumber로 회사 정보 조회
    @GetMapping("/number/{companyNumber}")
    public ResponseEntity<Company> getCompanyByNumber(@PathVariable("companyNumber") String companyNumber) {
        Optional<Company> company = companyService.getCompanyByCompanyNumber(companyNumber);
        if (company.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(company.get());
    }
}
