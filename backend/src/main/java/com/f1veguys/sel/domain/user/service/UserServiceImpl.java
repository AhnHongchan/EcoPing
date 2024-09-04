package com.f1veguys.sel.domain.user.service;
import com.f1veguys.sel.domain.points.domain.Points;
import com.f1veguys.sel.domain.points.repository.PointsRepository;
import com.f1veguys.sel.domain.user.domain.User;
import com.f1veguys.sel.global.util.HeaderUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.f1veguys.sel.dto.LoginRequest;
import com.f1veguys.sel.domain.user.repository.UserRepository;
import com.f1veguys.sel.global.util.UniqueNoGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    @Value("${api.url}")
    private String baseUrl;
    @Value("${api.key}")
    private String apiKey;

    private final HeaderUtil headerUtil;
    @Autowired
    private RestTemplate restTemplate;

    private final UserRepository userRepository;
    private final PointsRepository pointsRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public User register(User user) {
        // 생성 날짜 설정
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedDate(LocalDateTime.now());
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("apiKey", apiKey);
        requestBody.put("userId", user.getEmail());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        String url = baseUrl + "member/";
        System.out.println(url);

        ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                Map.class
        );

        Map<String, Object> responseBody = response.getBody();
        String userKey = (String) responseBody.get("userKey");
        user.setApiId(userKey);
        System.out.println(userKey);

        url = baseUrl + "edu/demandDeposit/createDemandDepositAccount";
        String accountTypeUniqueNo = "088-1-44755da19ce64f";
        String apiName = "createDemandDepositAccount";
        Map<String, String> headerInfo = headerUtil.createHeaderUser(apiName, apiName, userKey);
        System.out.println(url);
        requestBody = new HashMap<>();
        requestBody.put("Header", headerInfo);
        requestBody.put("accountTypeUniqueNo", accountTypeUniqueNo);

        entity = new HttpEntity<>(requestBody, headers);

        response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                Map.class
        );

        responseBody = response.getBody();
        Map<String, Object> rec = (Map<String, Object>) responseBody.get("REC");

        String accountNo = (String) rec.get("accountNo");
        System.out.println(accountNo);
        user.setAccountNum(accountNo);
        // 회원 정보 저장
        return userRepository.save(user);
    }

    @Override
    public String login(LoginRequest loginRequest) {
        // 이메일로 사용자 찾기
        userRepository.findByEmail(loginRequest.getEmail())
                .filter(u -> passwordEncoder.matches(loginRequest.getPassword(), u.getPassword())) // 비밀번호 비교
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        return UniqueNoGenerator.generateUniqueNo();
    }
}
