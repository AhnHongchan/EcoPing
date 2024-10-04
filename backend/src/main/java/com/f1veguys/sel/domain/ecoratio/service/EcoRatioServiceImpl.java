package com.f1veguys.sel.domain.ecoratio.service;

import com.f1veguys.sel.domain.ecogroupratio.repository.EcoGroupRatioRepository;
import com.f1veguys.sel.domain.ecoratio.domain.EcoRatio;
import com.f1veguys.sel.domain.ecoratio.dto.EcoRatioDto;
import com.f1veguys.sel.domain.ecoratio.repository.EcoRatioRepository;
import com.f1veguys.sel.domain.spendinghistory.repository.SpendingHistoryRepository;
import com.f1veguys.sel.dto.AgeGroup;
import com.f1veguys.sel.dto.Gender;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EcoRatioServiceImpl implements EcoRatioService {
    private final EcoRatioRepository ecoRatioRepository;
    private final SpendingHistoryRepository spendingHistoryRepository;
    private final EcoGroupRatioRepository ecoGroupRatioRepository;

    @Override
    @Scheduled(cron = "0 0 1 1 * ?")
    public void calculateEcoRatio() {
        LocalDateTime endDate = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime startDate = endDate.minusMonths(1);
        List<EcoRatio> ecoRatios = ecoRatioRepository.calculateEcoRatios(startDate, endDate);
        ecoRatioRepository.saveAll(ecoRatios);
    }

    @Override
    public List<EcoRatioDto> getEcoRatio(int userId) {
        LocalDate endDate = LocalDateTime.now().withDayOfMonth(1).toLocalDate();
        LocalDate startDate = endDate.minusYears(1);
        List<EcoRatio> ecoRatios = ecoRatioRepository.findBetween(userId, startDate, endDate);
        List<EcoRatioDto> ecoRatioDtos = new ArrayList<>();
        System.out.println(ecoRatios.size());
        for(EcoRatio ecoRatio : ecoRatios) {
            System.out.println(ecoRatio.getUserId()+" "+ecoRatio.getDate()+" "+ecoRatio.getEcoAmount());
            ecoRatioDtos.add(ecoRatio.toDto());
        }
        return ecoRatioDtos;
    }
}
