package com.f1veguys.sel.global.error.exception;

import com.f1veguys.sel.global.error.ErrorCode;
import com.f1veguys.sel.global.error.ServiceException;

public class TreeAlmostGrownException extends ServiceException {
    public TreeAlmostGrownException(int remainingPoints) {
        super(ErrorCode.TREE_ALMOST_GROWN, remainingPoints);
    }
}