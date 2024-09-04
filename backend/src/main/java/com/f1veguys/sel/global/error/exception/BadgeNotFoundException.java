package com.f1veguys.sel.global.error.exception;

import com.f1veguys.sel.global.error.ErrorCode;
import com.f1veguys.sel.global.error.ServiceException;

public class BadgeNotFoundException extends ServiceException {
    public BadgeNotFoundException() {
        super(ErrorCode.BADGE_NOT_FOUND);
    }
}
