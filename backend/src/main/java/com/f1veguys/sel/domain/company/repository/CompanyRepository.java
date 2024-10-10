package com.f1veguys.sel.domain.company.repository;

import com.f1veguys.sel.domain.company.domain.Company;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByCompanyNumber(String companyNumber);
    List<Company> findAll();
}
