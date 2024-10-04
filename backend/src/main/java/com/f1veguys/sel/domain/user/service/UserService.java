package com.f1veguys.sel.domain.user.service;

import com.f1veguys.sel.dto.AgeGroup;
import com.f1veguys.sel.dto.LoginRequest;
import com.f1veguys.sel.domain.user.domain.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Optional;

public interface UserService {
    User register(User user) ;

    String login(LoginRequest loginRequest, HttpServletResponse httpServletResponse) throws JsonProcessingException;

    boolean emailExist(String email);


    AgeGroup determineAgeGroup(int age);

    Optional<User> getUserById(int userId);
}
