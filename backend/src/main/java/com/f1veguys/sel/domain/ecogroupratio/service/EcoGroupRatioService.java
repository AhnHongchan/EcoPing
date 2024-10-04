package com.f1veguys.sel.domain.ecogroupratio.service;

import com.f1veguys.sel.domain.ecogroupratio.domain.EcoGroupRatio;
import com.f1veguys.sel.domain.ecogroupratio.dto.EcoGroupRatioDto;
import com.f1veguys.sel.dto.AgeGroup;
import com.f1veguys.sel.dto.Gender;

public interface EcoGroupRatioService {
    public void calculateMonthlyEcoRatios();
    public EcoGroupRatioDto getAllGroupRatio();
    public EcoGroupRatioDto getAgeGroupRatio(Gender gender, AgeGroup ageGroup);
}
