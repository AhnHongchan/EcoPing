package com.f1veguys.sel.domain.user.service;
import com.f1veguys.sel.domain.points.repository.PointsRepository;
import com.f1veguys.sel.domain.user.domain.User;
import com.f1veguys.sel.dto.AgeGroup;
import com.f1veguys.sel.global.util.HeaderUtil;
import com.f1veguys.sel.global.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.f1veguys.sel.dto.LoginRequest;
import com.f1veguys.sel.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    @Value("${api.url}")
    private String baseUrl;
    @Value("${api.key}")
    private String apiKey;
    private final JwtUtil jwtUtil;
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
        int age = LocalDateTime.now().getYear()-user.getBirthDate().getYear();
        user.setAgeGroup(determineAgeGroup(age));
        // 회원 정보 저장
        return userRepository.save(user);
    }

    @Override
    public String login(LoginRequest loginRequest, HttpServletResponse response) {
        // 이메일로 사용자 찾기
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .filter(u -> passwordEncoder.matches(loginRequest.getPassword(), u.getPassword())) // 비밀번호 비교
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        Cookie accessCookie = new Cookie("accessToken", jwtUtil.generateAccessToken(user.getEmail()));
        //accessCookie.setHttpOnly(true);
        //accessCookie.setSecure(true);
        accessCookie.setPath("/");
        accessCookie.setMaxAge(60*60*12);
        Cookie refreshCookie = new Cookie("refreshToken", jwtUtil.generateRefreshToken(user.getEmail()));
        //refreshCookie.setHttpOnly(true);
        //refreshCookie.setSecure(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(60*60*24*3);
        response.addCookie(accessCookie);
        response.addCookie(refreshCookie);
        return user.getEmail();
    }

    @Override
    public boolean emailExist(String email) {
        return userRepository.findByEmail(email).isPresent(); //있으면 true, 없으면 false
    }

    @Override
    public AgeGroup determineAgeGroup(int age) {
        if (age < 20) {
            return AgeGroup.UNDER_20;
        } else if (age < 30) {
            return AgeGroup.TWENTIES;
        } else if (age < 40) {
            return AgeGroup.THIRTIES;
        } else if (age < 50) {
            return AgeGroup.FORTIES;
        } else if (age < 60) {
            return AgeGroup.FIFTIES;
        } else if (age < 70) {
            return AgeGroup.SIXTIES;
        } else if (age < 80) {
            return AgeGroup.SEVENTIES;
        } else {
            return AgeGroup.OVER_80;
        }
    }


    @Override
    public Optional<User> getUserById(int userId) {
        return userRepository.findById(userId);
    }
}
