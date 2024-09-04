package com.f1veguys.sel.global.error.exception;

import com.f1veguys.sel.global.error.ErrorCode;
import com.f1veguys.sel.global.error.ServiceException;

public class TreeNotFoundException extends ServiceException {
    public TreeNotFoundException() {
        super(ErrorCode.TREE_NOT_FOUND);
    }
}
