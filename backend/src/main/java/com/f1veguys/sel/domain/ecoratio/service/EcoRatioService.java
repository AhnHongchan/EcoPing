package com.f1veguys.sel.domain.ecoratio.service;


import com.f1veguys.sel.domain.ecoratio.dto.EcoRatioDto;

import java.util.List;

public interface EcoRatioService {
    public void calculateEcoRatio();
    public List<EcoRatioDto> getEcoRatio(int userId);
}
