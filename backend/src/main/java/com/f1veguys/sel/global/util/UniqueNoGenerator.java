package com.f1veguys.sel.global.util;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class UniqueNoGenerator {
    private static final AtomicInteger sequence = new AtomicInteger(0);
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

    public static String generateUniqueNo() {
        // 현재 시간 가져오기
        LocalDateTime now = LocalDateTime.now();
        String timestamp = now.format(formatter);

        // 6자리 일련번호 생성 (0 ~ 999999)
        int seqNum = sequence.getAndIncrement() % 1000000;
        String sequenceStr = String.format("%06d", seqNum);

        return timestamp + sequenceStr;
    }

}
