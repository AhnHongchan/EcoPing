package com.f1veguys.sel.global.error.exception;

import com.f1veguys.sel.global.error.ErrorCode;
import com.f1veguys.sel.global.error.ServiceException;

public class UnsupportedFormatException extends ServiceException {
    public UnsupportedFormatException() {
        super(ErrorCode.UNSUPPORTED_FORMAT);
    }
}
