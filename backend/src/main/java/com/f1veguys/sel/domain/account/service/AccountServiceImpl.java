package com.f1veguys.sel.domain.account.service;

import com.f1veguys.sel.domain.spendinghistory.service.SpendingHistoryService;
import com.f1veguys.sel.domain.user.domain.User;
import com.f1veguys.sel.domain.user.repository.UserRepository;
import com.f1veguys.sel.global.error.exception.UserNotFoundException;
import com.f1veguys.sel.global.util.HeaderUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class AccountServiceImpl implements AccountService {
    @Value("${api.url}")
    private String baseUrl;
    @Value("${api.key}")
    private String apiKey;

    private final HeaderUtil headerUtil;
    @Autowired
    private RestTemplate restTemplate;

    private final UserRepository userRepository;
    private final SpendingHistoryService spendingHistoryService;
    @Override
    public void depositBalance(int userId, int amount) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UserNotFoundException();
        }
        String accountNo = user.getAccountNum();
        String userKey = user.getApiId();
        String url = baseUrl + "/edu/demandDeposit/updateDemandDepositAccountDeposit";
        String apiName = "updateDemandDepositAccountDeposit";
        Map<String, String> headerInfo = headerUtil.createHeaderUser(apiName, apiName, userKey);
        Map<String, Object> requestBody = new HashMap<>();
        System.out.println(accountNo);
        requestBody.put("Header", headerInfo);
        requestBody.put("accountNo", accountNo);
        requestBody.put("transactionBalance", (long)amount);
        requestBody.put("transactionSummary", "계좌 입금");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                Map.class
        );
    }

    @Override
    public void withdrawBalance(int userId, int amount, String description) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UserNotFoundException();
        }
        String accountNo = user.getAccountNum();
        String userKey = user.getApiId();
        String url = baseUrl + "/edu/demandDeposit/updateDemandDepositAccountWithdrawal";
        String apiName = "updateDemandDepositAccountWithdrawal";
        Map<String, String> headerInfo = headerUtil.createHeaderUser(apiName, apiName, userKey);
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("Header", headerInfo);
        requestBody.put("accountNo", accountNo);
        requestBody.put("transactionBalance", (long)amount);
        requestBody.put("transactionSummary", description);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                Map.class
        );
        spendingHistoryService.saveSpendingHistory(userId, amount, description);

    }

    @Override
    public void checkAccount(int userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UserNotFoundException();
        }
        String accountNo = user.getAccountNum();
        String userKey = user.getApiId();
        String url = baseUrl + "/edu/demandDeposit/inquireDemandDepositAccountList";
        String apiName = "inquireDemandDepositAccountList";
        Map<String, String> headerInfo = headerUtil.createHeaderUser(apiName, apiName, userKey);
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("Header", headerInfo);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                Map.class
        );
        Map<String, Object> responseBody = response.getBody();
        List<Map<String, String>> recList = (List<Map<String, String>>) responseBody.get("REC");
        for(Map<String, String> rec : recList) {
            System.out.println(rec.get("accountNo"));
        }


    }
}
