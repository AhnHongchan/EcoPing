package com.f1veguys.sel.domain.UserStockHoldings.service;

import com.f1veguys.sel.domain.UserStockHoldings.domain.UserStockHoldings;
import com.f1veguys.sel.domain.UserStockHoldings.dto.UserStockHoldingsDto;
import com.f1veguys.sel.domain.UserStockHoldings.repository.UserStockHoldingsRepository;
import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserStockHoldingsServiceImpl implements UserStockHoldingsService {

    private final UserStockHoldingsRepository holdingsRepository;

    @Override
    @Transactional
    public UserStockHoldings updateHoldings(User user, Company company, int quantity, boolean isBuy, double purchasePrice) {
        UserStockHoldings holdings = holdingsRepository.findByUserAndCompany(user, company)
            .orElseGet(() -> UserStockHoldings.builder()
                .user(user)
                .company(company)
                .quantity(0)
                .averagePurchasePrice(0.0)
                .build());

        if (isBuy) {
            holdings.increaseQuantity(quantity, purchasePrice);
        } else {
            holdings.decreaseQuantity(quantity);
        }

        return holdingsRepository.save(holdings);
    }

    @Override
    public int getHoldings(User user, Company company) {
        return holdingsRepository.findByUserAndCompany(user, company)
            .map(UserStockHoldings::getQuantity)
            .orElse(0);
    }

    @Override
    public double getAveragePurchasePrice(User user, Company company) {
        return holdingsRepository.findByUserAndCompany(user, company)
            .map(UserStockHoldings::getAveragePurchasePrice)
            .orElse(0.0);
    }

    @Override
    public List<UserStockHoldingsDto> getUserStockHoldingsList(User user) {
        // 사용자가 소유한 주식 목록을 UserStockHoldingsDto로 변환하여 반환
        return holdingsRepository.findAllByUser(user).stream()
            .map(holdings -> new UserStockHoldingsDto(
                holdings.getCompany().getCompanyNumber(),
                holdings.getCompany().getCompanyName(),
                holdings.getQuantity(),
                holdings.getAveragePurchasePrice()
            ))
            .collect(Collectors.toList());
    }
}
