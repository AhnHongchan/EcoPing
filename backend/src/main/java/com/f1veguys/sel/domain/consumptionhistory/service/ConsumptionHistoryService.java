package com.f1veguys.sel.domain.consumptionhistory.service;

import com.f1veguys.sel.domain.consumptionhistory.dto.ConsumptionHistoryResponse;

import java.util.List;

public interface ConsumptionHistoryService {
    List<ConsumptionHistoryResponse> getEcoConsumptionHistories();

    void SaveCsvFiles();
}
