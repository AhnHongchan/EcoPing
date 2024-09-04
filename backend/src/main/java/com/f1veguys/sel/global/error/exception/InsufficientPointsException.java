package com.f1veguys.sel.global.error.exception;

import com.f1veguys.sel.global.error.ErrorCode;
import com.f1veguys.sel.global.error.ServiceException;

public class InsufficientPointsException extends ServiceException {
    public InsufficientPointsException() {
        super(ErrorCode.INSUFFICIENT_POINTS);
    }
}
