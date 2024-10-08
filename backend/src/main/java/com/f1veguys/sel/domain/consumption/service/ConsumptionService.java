package com.f1veguys.sel.domain.consumption.service;

import com.f1veguys.sel.domain.consumption.dto.ConsumptionResponse;

import java.util.List;

public interface ConsumptionService {

    List<ConsumptionResponse> findAll();

    List<ConsumptionResponse> findRecentConsumption();
}
