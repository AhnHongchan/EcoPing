package com.silvertown.ecoping.global.error.exception;

import com.silvertown.ecoping.global.error.ErrorCode;
import com.silvertown.ecoping.global.error.ServiceException;

public class InsufficientPointsException extends ServiceException {
    public InsufficientPointsException() {
        super(ErrorCode.INSUFFICIENT_POINTS);
    }
}
