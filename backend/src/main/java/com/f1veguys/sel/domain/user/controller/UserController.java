package com.f1veguys.sel.domain.user.controller;

import com.f1veguys.sel.domain.points.domain.Points;
import com.f1veguys.sel.domain.points.repository.PointsRepository;
import com.f1veguys.sel.domain.points.service.PointsService;
import com.f1veguys.sel.domain.user.repository.UserRepository;
import com.f1veguys.sel.dto.LoginRequest;
import com.f1veguys.sel.domain.user.domain.User;
import com.f1veguys.sel.domain.user.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PointsService pointsService;
    private final PointsRepository pointsRepository;


    // 회원가입 API
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) throws JsonProcessingException {
        System.out.println("start");
        userService.register(user);
        int userId = user.getId();
        Points points = pointsService.makePoints(userId);
        pointsRepository.save(points);
        return ResponseEntity.status(200).body("registration successful");
    }

    // 로그인 API
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) { //로그인 성공시 UniqueNo 반환
        System.out.println("통과");
        return userService.login(loginRequest);
    }
}
