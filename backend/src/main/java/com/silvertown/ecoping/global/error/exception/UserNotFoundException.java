package com.silvertown.ecoping.global.error.exception;

import com.silvertown.ecoping.global.error.ErrorCode;
import com.silvertown.ecoping.global.error.ServiceException;

public class UserNotFoundException extends ServiceException {
    public UserNotFoundException() {
        super(ErrorCode.USER_NOT_FOUND);
    }
}
