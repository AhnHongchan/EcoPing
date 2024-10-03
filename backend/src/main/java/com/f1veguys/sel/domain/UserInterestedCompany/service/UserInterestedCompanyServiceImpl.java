package com.f1veguys.sel.domain.UserInterestedCompany.service.impl;

import com.f1veguys.sel.domain.UserInterestedCompany.domain.UserInterestedCompany;
import com.f1veguys.sel.domain.UserInterestedCompany.repository.UserInterestedCompanyRepository;
import com.f1veguys.sel.domain.UserInterestedCompany.service.UserInterestedCompanyService;
import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.company.dto.CompanyDto;
import com.f1veguys.sel.domain.company.repository.CompanyRepository;
import com.f1veguys.sel.domain.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserInterestedCompanyServiceImpl implements UserInterestedCompanyService {

    private final UserInterestedCompanyRepository interestedCompanyRepository;
    private final CompanyRepository companyRepository;

    @Override
    @Transactional
    public void addInterestedCompany(User user, String companyNumber) {
        Company company = companyRepository.findByCompanyNumber(companyNumber)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        if (!interestedCompanyRepository.existsByUserAndCompany(user, company)) {
            UserInterestedCompany interestedCompany = UserInterestedCompany.builder()
                    .user(user)
                    .company(company)
                    .build();
            interestedCompanyRepository.save(interestedCompany);
        }
    }

    @Override
    @Transactional
    public void removeInterestedCompany(User user, String companyNumber) {
        Company company = companyRepository.findByCompanyNumber(companyNumber)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        interestedCompanyRepository.deleteByUserAndCompany(user, company);
    }

    @Override
    public List<CompanyDto> getInterestedCompanies(User user) {
        return interestedCompanyRepository.findAllByUser(user).stream()
                .map(ic -> new CompanyDto(
                        ic.getCompany().getCompanyName(),
                        ic.getCompany().getCompanyNumber(),
                        ic.getCompany().getEcoScore()))
                .collect(Collectors.toList());
    }

}
