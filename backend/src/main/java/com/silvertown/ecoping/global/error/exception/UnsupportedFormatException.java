package com.silvertown.ecoping.global.error.exception;

import com.silvertown.ecoping.global.error.ErrorCode;
import com.silvertown.ecoping.global.error.ServiceException;

public class UnsupportedFormatException extends ServiceException {
    public UnsupportedFormatException() {
        super(ErrorCode.UNSUPPORTED_FORMAT);
    }
}
