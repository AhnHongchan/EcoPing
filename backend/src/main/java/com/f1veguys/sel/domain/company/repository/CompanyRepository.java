package com.f1veguys.sel.domain.company.repository;

import com.f1veguys.sel.domain.company.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    // companyNumber로 회사 조회하는 메서드 추가
    Optional<Company> findByCompanyNumber(String companyNumber);
}
