package com.f1veguys.sel.domain.company.service;

import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.company.repository.CompanyRepository;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public Optional<Company> getCompanyByCompanyNumber(String companyNumber) {
        return companyRepository.findByCompanyNumber(companyNumber);
    }

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    // 모든 회사의 고유번호 가져오기
    @Override
    public List<String> getAllCompanyNumbers() {
        return companyRepository.findAll().stream()
            .map(Company::getCompanyNumber)
            .collect(Collectors.toList());
    }
}
