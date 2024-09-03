package com.f1veguys.sel.global.error.exception;

import com.f1veguys.sel.global.error.ErrorCode;
import com.f1veguys.sel.global.error.ServiceException;

public class UserNotFoundException extends ServiceException {
    public UserNotFoundException() {
        super(ErrorCode.USER_NOT_FOUND);
    }
}
