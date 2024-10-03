package com.f1veguys.sel.domain.company.service;

import com.f1veguys.sel.domain.company.domain.Company;

import java.util.Optional;

public interface CompanyService {
    Optional<Company> getCompanyByCompanyNumber(String companyNumber);  // 회사번호로 회사 조회
    Optional<Company> getCompanyById(Long stockId);  // ID로 회사 조회
}
