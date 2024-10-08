package com.f1veguys.sel.global.error.exception;

import com.f1veguys.sel.global.error.ErrorCode;
import com.f1veguys.sel.global.error.ServiceException;

public class ConsumptionNotFoundException extends ServiceException {
    public ConsumptionNotFoundException() {
        super(ErrorCode.CONSUMPTIONS_NOT_FOUND);
    }
}
