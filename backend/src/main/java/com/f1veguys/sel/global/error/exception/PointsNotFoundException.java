package com.f1veguys.sel.global.error.exception;

import com.f1veguys.sel.global.error.ErrorCode;
import com.f1veguys.sel.global.error.ServiceException;

public class PointsNotFoundException extends ServiceException {
    public PointsNotFoundException() {
        super(ErrorCode.POINTS_NOT_FOUND);
    }
}
