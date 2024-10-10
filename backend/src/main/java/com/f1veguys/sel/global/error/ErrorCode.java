package com.f1veguys.sel.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    INTERNAL_SERVER_ERROR(500, "서버 오류가 발생했습니다."),
    FILE_NOT_FOUND(404, "파일을 찾을 수 없습니다."),
    UNSUPPORTED_FORMAT(415, "지원하지 않는 파일 포맷입니다."),
    USER_NOT_FOUND(404, "사용자를 찾을 수 없습니다."),
    CAMPAIGN_NOT_FOUND(404, "캠페인을 찾을 수 없습니다."),
    TREE_NOT_FOUND(404, "나무를 찾을 수 없습니다."),
    BADGE_NOT_FOUND(404, "뱃지를 찾을 수 없습니다."),
    POINTS_NOT_FOUND(404, "포인트를 찾을 수 없습니다."),
    CONSUMPTIONS_NOT_FOUND(404, "소비를 찾을 수 없습니다."),
    TREE_ALMOST_GROWN(400, "나무에 줄 수 있는 포인트는 최대 3000입니다. 남은 포인트: %d"),
    INSUFFICIENT_POINTS(400, "보유하고 있는 포인트가 부족합니다.");

    private final int httpStatus;
    private final String message;

    /**
     * 메시지에 동적 값을 삽입할 때 사용.
     *
     * @param args 메시지에 삽입할 동적 값들
     * @return 포맷된 메시지
     */
    public String formatMessage(Object... args) {
        return String.format(this.message, args);
    }
}
