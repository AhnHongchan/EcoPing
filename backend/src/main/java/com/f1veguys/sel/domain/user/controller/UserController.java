package com.f1veguys.sel.domain.user.controller;

import com.f1veguys.sel.domain.points.domain.Points;
import com.f1veguys.sel.domain.points.repository.PointsRepository;
import com.f1veguys.sel.domain.points.service.PointsService;
import com.f1veguys.sel.domain.user.repository.UserRepository;
import com.f1veguys.sel.dto.LoginRequest;
import com.f1veguys.sel.domain.user.domain.User;
import com.f1veguys.sel.domain.user.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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
        userService.register(user);
        int userId = user.getId();
        Points points = pointsService.makePoints(userId);
        pointsRepository.save(points);
        return ResponseEntity.status(200).body("registration successful");
    }

    // 로그인 API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) throws JsonProcessingException { //로그인 성공시 UniqueNo 반환
        String user = userService.login(loginRequest, response);
        return ResponseEntity.ok(user); //user Name
    }

    // 로그인 API
    @GetMapping("/emailExist")
    public ResponseEntity<?> emailExist(@RequestParam(value = "email") String email) {
        if(userService.emailExist(email)){
            return ResponseEntity.status(409).body("email already exist");
        }
        return ResponseEntity.ok("email is available");
    }
}
