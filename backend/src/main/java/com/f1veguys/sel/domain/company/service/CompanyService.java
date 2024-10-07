package com.f1veguys.sel.domain.company.service;

import com.f1veguys.sel.domain.company.domain.Company;

import java.util.Optional;

public interface CompanyService {
    Optional<Company> getCompanyByCompanyNumber(String companyNumber);  // 회사 고유번호로 회사 조회
}
