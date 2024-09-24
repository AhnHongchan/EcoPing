package com.silvertown.ecoping.global.error.exception;

import com.silvertown.ecoping.global.error.ErrorCode;
import com.silvertown.ecoping.global.error.ServiceException;

public class TreeNotFoundException extends ServiceException {
    public TreeNotFoundException() {
        super(ErrorCode.TREE_NOT_FOUND);
    }
}
