package com.f1veguys.sel.domain.consumption.service;

import com.f1veguys.sel.domain.consumption.dto.ConsumptionResponse;
import com.f1veguys.sel.domain.consumption.repository.ConsumptionRepository;
import com.f1veguys.sel.global.error.exception.ConsumptionNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConsumptionServiceImpl implements ConsumptionService {

    private final ConsumptionRepository consumptionRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ConsumptionResponse> findAll() {
        List<ConsumptionResponse> consumptions = consumptionRepository.findAll()
                .stream()
                .map(consumption -> new ConsumptionResponse(consumption))
                .collect(Collectors.toList());

        if (consumptions.isEmpty()) {
            throw new ConsumptionNotFoundException();
        }

        return consumptions;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ConsumptionResponse> findRecentConsumption() {
        LocalDateTime dateAgo = LocalDateTime.now().minusDays(30);
        List<ConsumptionResponse> consumptions = consumptionRepository.findAllByDateAfter(dateAgo)
                .stream()
                .map(consumption -> new ConsumptionResponse(consumption))
                .collect(Collectors.toList());

        if (consumptions.isEmpty()) {
            throw new ConsumptionNotFoundException();
        }

        return consumptions;
    }
}
