package com.f1veguys.sel.domain.user.service;

import com.f1veguys.sel.dto.LoginRequest;
import com.f1veguys.sel.domain.user.domain.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletResponse;

public interface UserService {
    User register(User user) ;

    void login(LoginRequest loginRequest, HttpServletResponse httpServletResponse) throws JsonProcessingException;
}
