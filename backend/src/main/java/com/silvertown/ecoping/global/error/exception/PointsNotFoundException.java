package com.silvertown.ecoping.global.error.exception;

import com.silvertown.ecoping.global.error.ErrorCode;
import com.silvertown.ecoping.global.error.ServiceException;

public class PointsNotFoundException extends ServiceException {
    public PointsNotFoundException() {
        super(ErrorCode.POINTS_NOT_FOUND);
    }
}
