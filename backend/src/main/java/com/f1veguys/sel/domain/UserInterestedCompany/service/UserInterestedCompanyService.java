package com.f1veguys.sel.domain.UserInterestedCompany.service;

import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.company.dto.CompanyDto;
import com.f1veguys.sel.domain.user.domain.User;

import java.util.List;

public interface UserInterestedCompanyService {
    void addInterestedCompany(User user, String companyNumber);
    void removeInterestedCompany(User user, String companyNumber);
    List<CompanyDto> getInterestedCompanies(User user);
    boolean isInterested(User user, Company company);  // 흥미 여부 확인 메서드 추가
}
