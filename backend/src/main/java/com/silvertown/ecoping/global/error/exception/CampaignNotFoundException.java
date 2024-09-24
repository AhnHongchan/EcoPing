package com.silvertown.ecoping.global.error.exception;

import com.silvertown.ecoping.global.error.ErrorCode;
import com.silvertown.ecoping.global.error.ServiceException;

public class CampaignNotFoundException extends ServiceException {
    public CampaignNotFoundException() {
        super(ErrorCode.CAMPAIGN_NOT_FOUND);
    }
}
