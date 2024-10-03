package com.f1veguys.sel.domain.company.service;

import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.company.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    // 회사 ID로 회사 조회
    @Override
    public Optional<Company> getCompanyById(Long stockId) {
        return companyRepository.findById(stockId);
    }

    // 회사번호로 회사 조회
    @Override
    public Optional<Company> getCompanyByCompanyNumber(String companyNumber) {
        return companyRepository.findByCompanyNumber(companyNumber);
    }
}
