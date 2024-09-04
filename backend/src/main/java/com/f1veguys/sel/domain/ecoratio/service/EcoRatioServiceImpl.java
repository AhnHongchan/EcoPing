package com.f1veguys.sel.domain.ecoratio.service;

import com.f1veguys.sel.domain.ecoratio.domain.EcoRatio;
import com.f1veguys.sel.domain.ecocompany.repository.EcoCompanyRepository;
import com.f1veguys.sel.domain.ecoratio.repository.EcoRatioRepository;
import com.f1veguys.sel.domain.spendinghistory.repository.SpendingHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EcoRatioServiceImpl implements EcoRatioService {
    public final EcoRatioRepository ecoRatioRepository;
    public final SpendingHistoryRepository spendingHistoryRepository;

    @Override
    @Scheduled(cron = "0 0 9 * * ?")
    public void calculateEcoRatio() {
        LocalDateTime endDate = LocalDate.now().minusDays(1).atTime(LocalTime.MAX); // 어제의 끝
        LocalDateTime startDate = endDate.minusMonths(1).plusDays(1); // 한 달 전 다음날
        List<Integer[]> results = spendingHistoryRepository.calculateAvgEco(startDate, endDate);
        double totalRatio = 0;
        int validUserCount = 0;

        for (Integer[] result : results) {
            int ecoSum = result[0];
            int totalSum = result[1];

            if (totalSum > 0) {
                double ratio = (double) ecoSum / totalSum;
                totalRatio += ratio;
                validUserCount++;
            }
        }
        double averageRatio = validUserCount > 0 ? totalRatio / validUserCount : 0;

        EcoRatio ecoRatio = new EcoRatio();
        ecoRatio.setDate(LocalDate.now());
        ecoRatio.setAverageRatio(averageRatio);
        ecoRatioRepository.save(ecoRatio);
    }
}
