package com.f1veguys.sel.domain.ecogroupratio.repository;

import com.f1veguys.sel.domain.ecogroupratio.domain.EcoGroupRatio;
import com.f1veguys.sel.dto.AgeGroup;
import com.f1veguys.sel.dto.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EcoGroupRatioRepository extends JpaRepository<EcoGroupRatio, Integer> {
    @Query("SELECT new com.f1veguys.sel.domain.ecogroupratio.domain.EcoGroupRatio(u.gender, u.ageGroup, " +
            "SUM(CASE WHEN sh.isEco = true THEN sh.amount ELSE 0 END), " +
            "SUM(sh.amount))" +
            "FROM SpendingHistory sh " +
            "JOIN sh.user u " +
            "WHERE sh.spendTime BETWEEN :startDate AND :endDate " +
            "GROUP BY u.gender, u.ageGroup")

    List<EcoGroupRatio> getEcoRatiosByPeriod(@Param("startDate") LocalDateTime startDate,
                                             @Param("endDate") LocalDateTime endDate);

    @Query("SELECT egr FROM EcoGroupRatio egr " +
            "WHERE (egr.gender, egr.ageGroup, egr.id) IN " +
            "(SELECT e.gender, e.ageGroup, MAX(e.id) " +
            "FROM EcoGroupRatio e " +
            "GROUP BY e.gender, e.ageGroup)")
    List<EcoGroupRatio> findMostRecentByGenderAndAgeGroup();

    @Query("SELECT egr FROM EcoGroupRatio egr " +
            "WHERE egr.gender = :gender " +
            "AND egr.ageGroup = :ageGroup " +
            "ORDER BY egr.id DESC " +
            "LIMIT 1")
    Optional<EcoGroupRatio> findMostRecentByGenderAndAgeGroup(
            @Param("gender") Gender gender,
            @Param("ageGroup") AgeGroup ageGroup
    );

    @Query("SELECT egr FROM EcoGroupRatio egr " +
            "WHERE egr.gender = com.f1veguys.sel.dto.Gender.unknown " +
            "AND egr.ageGroup = com.f1veguys.sel.dto.AgeGroup.ALL " +
            "ORDER BY egr.id DESC " +
            "LIMIT 1")
    Optional<EcoGroupRatio> findMostRecentUnknownGenderAndAllAgeGroup();

//    @Query("SELECT new com.f1veguys.sel.dto.EcoGroupRatio(u.gender, " +
//            "CASE " +
//            "  WHEN YEAR(CURRENT_DATE) - YEAR(u.birthDate) < 20 THEN com.f1veguys.sel.dto.AgeGroup.UNDER_20 " +
//            "  WHEN YEAR(CURRENT_DATE) - YEAR(u.birthDate) BETWEEN 20 AND 29 THEN com.f1veguys.sel.dto.AgeGroup.TWENTIES " +
//            "  WHEN YEAR(CURRENT_DATE) - YEAR(u.birthDate) BETWEEN 30 AND 39 THEN com.f1veguys.sel.dto.AgeGroup.THIRTIES " +
//            "  WHEN YEAR(CURRENT_DATE) - YEAR(u.birthDate) BETWEEN 40 AND 49 THEN com.f1veguys.sel.dto.AgeGroup.FORTIES " +
//            "  WHEN YEAR(CURRENT_DATE) - YEAR(u.birthDate) BETWEEN 50 AND 59 THEN com.f1veguys.sel.dto.AgeGroup.FIFTIES " +
//            "  WHEN YEAR(CURRENT_DATE) - YEAR(u.birthDate) BETWEEN 60 AND 69 THEN com.f1veguys.sel.dto.AgeGroup.SIXTIES " +
//            "  WHEN YEAR(CURRENT_DATE) - YEAR(u.birthDate) BETWEEN 70 AND 79 THEN com.f1veguys.sel.dto.AgeGroup.SEVENTIES " +
//            "  ELSE com.f1veguys.sel.dto.AgeGroup.OVER_80 " +
//            "END AS ageGroup, " +
//            "SUM(CASE WHEN sh.isEco = true THEN sh.amount ELSE 0 END) AS ecoSum, " +
//            "SUM(sh.amount) AS totalSum) " +
//            "FROM SpendingHistory sh " +
//            "JOIN sh.user u " +
//            "WHERE sh.spendTime BETWEEN :startDate AND :endDate " +
//            "GROUP BY u.gender, ageGroup")
//    List<EcoGroupRatio> getEcoRatiosByPeriod(@Param("startDate") LocalDateTime startDate,
//                                                @Param("endDate") LocalDateTime endDate);




//@Query("SELECT u.gender as gender, " +
//        "CASE " +
//        "  WHEN :currentYear - FUNCTION('YEAR', u.birthDate) < 20 THEN 'UNDER_20' " +
//        "  WHEN :currentYear - FUNCTION('YEAR', u.birthDate) BETWEEN 20 AND 29 THEN 'TWENTIES' " +
//        "  WHEN :currentYear - FUNCTION('YEAR', u.birthDate) BETWEEN 30 AND 39 THEN 'THIRTIES' " +
//        "  WHEN :currentYear - FUNCTION('YEAR', u.birthDate) BETWEEN 40 AND 49 THEN 'FORTIES' " +
//        "  WHEN :currentYear - FUNCTION('YEAR', u.birthDate) BETWEEN 50 AND 59 THEN 'FIFTIES' " +
//        "  WHEN :currentYear - FUNCTION('YEAR', u.birthDate) BETWEEN 60 AND 69 THEN 'SIXTIES' " +
//        "  WHEN :currentYear - FUNCTION('YEAR', u.birthDate) BETWEEN 70 AND 79 THEN 'SEVENTIES' " +
//        "  ELSE 'OVER_80' " +
//        "END as ageGroup, " +
//        "SUM(CASE WHEN sh.isEco = true THEN sh.amount ELSE 0 END) as ecoSum, " +
//        "SUM(sh.amount) as totalSum " +
//        "FROM SpendingHistory sh " +
//        "JOIN sh.user u " +
//        "WHERE sh.spendTime BETWEEN :startDate AND :endDate " +
//        "GROUP BY u.gender, " +
//        "CASE " +
//        "  WHEN :currentYear - FUNCTION('YEAR', u.birthDate) < 20 THEN 'UNDER_20' " +
//        "  WHEN :currentYear - FUNCTION('YEAR', u.birthDate) BETWEEN 20 AND 29 THEN 'TWENTIES' " +
//        "  WHEN :currentYear - FUNCTION('YEAR', u.birthDate) BETWEEN 30 AND 39 THEN 'THIRTIES' " +
//        "  WHEN :currentYear - FUNCTION('YEAR', u.birthDate) BETWEEN 40 AND 49 THEN 'FORTIES' " +
//        "  WHEN :currentYear - FUNCTION('YEAR', u.birthDate) BETWEEN 50 AND 59 THEN 'FIFTIES' " +
//        "  WHEN :currentYear - FUNCTION('YEAR', u.birthDate) BETWEEN 60 AND 69 THEN 'SIXTIES' " +
//        "  WHEN :currentYear - FUNCTION('YEAR', u.birthDate) BETWEEN 70 AND 79 THEN 'SEVENTIES' " +
//        "  ELSE 'OVER_80' " +
//        "END")
//List<Object[]> getEcoRatiosRawData(@Param("startDate") LocalDateTime startDate,
//                                   @Param("endDate") LocalDateTime endDate,
//                                   @Param("currentYear") int currentYear);

//    @Query("SELECT new com.f1veguys.sel.domain.ecogroupratio.domain.EcoGroupRatio(u.gender, " +
//            "com.f1veguys.sel.dto.AgeGroup.OVER_80, " +
//            "SUM(CASE WHEN sh.isEco = true THEN sh.amount ELSE 0 END), " +
//            "SUM(sh.amount)) " +
//            "FROM SpendingHistory sh " +
//            "JOIN sh.user u " +
//            "WHERE sh.spendTime BETWEEN :startDate AND :endDate " +
//            "GROUP BY u.gender")
//    List<EcoGroupRatio> getEcoRatiosByPeriod(@Param("startDate") LocalDateTime startDate,
//                                                @Param("endDate") LocalDateTime endDate);


}
