package com.silvertown.ecoping.global.error.exception;

import com.silvertown.ecoping.global.error.ErrorCode;
import com.silvertown.ecoping.global.error.ServiceException;

public class FileNotFoundException extends ServiceException {
    public FileNotFoundException() {
        super(ErrorCode.FILE_NOT_FOUND);
    }
}
