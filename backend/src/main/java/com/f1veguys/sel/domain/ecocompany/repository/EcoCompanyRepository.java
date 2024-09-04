package com.f1veguys.sel.domain.ecocompany.repository;

import com.f1veguys.sel.domain.ecocompany.domain.EcoCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EcoCompanyRepository extends JpaRepository<EcoCompany, Integer> {
    @Query("SELECT CASE WHEN COUNT(e) > 0 THEN true ELSE false END FROM EcoCompany e WHERE e.name = :companyName OR e.name LIKE %:companyName%")
    boolean existsByName(@Param("companyName") String companyName);

}
