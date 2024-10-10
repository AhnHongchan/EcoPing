package com.f1veguys.sel.domain.ecogroupratio.service;

import com.f1veguys.sel.domain.ecogroupratio.domain.EcoGroupRatio;
import com.f1veguys.sel.domain.ecogroupratio.dto.EcoGroupRatioDto;
import com.f1veguys.sel.domain.ecogroupratio.repository.EcoGroupRatioRepository;
import com.f1veguys.sel.dto.AgeGroup;
import com.f1veguys.sel.dto.Gender;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class EcoGroupRatioServiceImpl implements EcoGroupRatioService {

    private final EcoGroupRatioRepository ecoGroupRatioRepository;

    @Override
    @Scheduled(cron = "1 0 0 1 * ?")
    public void calculateMonthlyEcoRatios() {
        LocalDateTime endDate = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime startDate = endDate.minusMonths(1);

        List<EcoGroupRatio> ecoGroupRatios = ecoGroupRatioRepository.getEcoRatiosByPeriod(startDate, endDate);

        ecoGroupRatioRepository.saveAll(ecoGroupRatios);

        double totalEcoSum = ecoGroupRatios.stream().mapToDouble(EcoGroupRatio::getEcoSum).sum();
        double totalSum = ecoGroupRatios.stream().mapToDouble(EcoGroupRatio::getTotalSum).sum();
        ecoGroupRatioRepository.save(new EcoGroupRatio(Gender.unknown, AgeGroup.ALL, totalEcoSum, totalSum));
    }

    @Override
    public EcoGroupRatioDto getAllGroupRatio() {
        return ecoGroupRatioRepository.findMostRecentUnknownGenderAndAllAgeGroup().get().toDto();
    }

    @Override
    public EcoGroupRatioDto getAgeGroupRatio(Gender gender, AgeGroup ageGroup) {
        return ecoGroupRatioRepository.findMostRecentByGenderAndAgeGroup(gender, ageGroup).get().toDto();
    }

}
