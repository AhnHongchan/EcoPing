package com.f1veguys.sel.domain.UserInterestedCompany.repository;

import com.f1veguys.sel.domain.UserInterestedCompany.domain.UserInterestedCompany;
import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserInterestedCompanyRepository extends JpaRepository<UserInterestedCompany, Long> {
    Optional<UserInterestedCompany> findByUserAndCompany(User user, Company company);
    boolean existsByUserAndCompany(User user, Company company);
    void deleteByUserAndCompany(User user, Company company);
    List<UserInterestedCompany> findAllByUser(User user);
}
