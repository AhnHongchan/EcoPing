package com.silvertown.ecoping.global.error.exception;

import com.silvertown.ecoping.global.error.ErrorCode;
import com.silvertown.ecoping.global.error.ServiceException;

public class BadgeNotFoundException extends ServiceException {
    public BadgeNotFoundException() {
        super(ErrorCode.BADGE_NOT_FOUND);
    }
}
