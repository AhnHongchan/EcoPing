package com.silvertown.ecoping.domain.user.service;

import com.silvertown.ecoping.dto.LoginRequest;
import com.silvertown.ecoping.domain.user.domain.User;

public interface UserService {
    User register(User user) ;

    String login(LoginRequest loginRequest);
}
