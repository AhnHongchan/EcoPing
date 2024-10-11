package com.f1veguys.sel.domain.company.service;

import com.f1veguys.sel.domain.company.domain.Company;

import java.util.List;
import java.util.Optional;

public interface CompanyService {
    Optional<Company> getCompanyByCompanyNumber(String companyNumber);  // 회사 고유번호로 회사 조회

    List<Company> getAllCompanies();
    List<String> getAllCompanyNumbers(); // 모든 회사의 고유번호 가져오기

}
