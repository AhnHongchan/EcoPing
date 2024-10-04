package com.f1veguys.sel.domain.UserStockTransaction.service;

import com.f1veguys.sel.domain.UserStockTransaction.domain.UserStockTransaction;
import com.f1veguys.sel.domain.UserStockTransaction.repository.UserStockTransactionRepository;
import com.f1veguys.sel.domain.company.domain.Company;
import com.f1veguys.sel.domain.points.service.PointsService;
import com.f1veguys.sel.domain.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserStockTransactionServiceImpl implements UserStockTransactionService {

    private final UserStockTransactionRepository transactionRepository;
    private final PointsService pointsService;

    @Override
    @Transactional
    public UserStockTransaction buyStock(User user, Company company, int quantity, double currentPrice) {
        int totalPrice = (int) (quantity * currentPrice);

        // 포인트 차감
        pointsService.removePoints(user.getId(), totalPrice, "주식 구매");

        // 매수 트랜잭션 생성 및 저장
        UserStockTransaction transaction = new UserStockTransaction();
        transaction.setUser(user);
        transaction.setCompany(company);
        transaction.setQuantity(quantity);
        transaction.setPriceAtTransaction(currentPrice);
        transaction.setBuy(true);
        transactionRepository.save(transaction);

        return transaction;
    }

    @Override
    @Transactional
    public UserStockTransaction sellStock(User user, Company company, int quantity, double currentPrice) {
        int totalPrice = (int) (quantity * currentPrice);

        // 포인트 추가
        pointsService.addPoints(user.getId(), totalPrice, "주식 판매");

        // 매도 트랜잭션 생성 및 저장
        UserStockTransaction transaction = new UserStockTransaction();
        transaction.setUser(user);
        transaction.setCompany(company);
        transaction.setQuantity(-quantity);
        transaction.setPriceAtTransaction(currentPrice);
        transaction.setBuy(false);
        transactionRepository.save(transaction);

        return transaction;
    }

    @Override
    public List<UserStockTransaction> getUserTransactions(User user) {
        return transactionRepository.findByUser(user);
    }
}
