package com.silvertown.ecoping.global.error.exception;

import com.silvertown.ecoping.global.error.ErrorCode;
import com.silvertown.ecoping.global.error.ServiceException;

public class TreeAlmostGrownException extends ServiceException {
    public TreeAlmostGrownException(int remainingPoints) {
        super(ErrorCode.TREE_ALMOST_GROWN, remainingPoints);
    }
}