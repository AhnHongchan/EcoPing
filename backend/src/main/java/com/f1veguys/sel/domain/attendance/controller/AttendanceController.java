package com.f1veguys.sel.domain.attendance.controller;

import com.f1veguys.sel.domain.attendance.service.AttendanceService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
@Slf4j
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @GetMapping("/attend")
    public ResponseEntity<?> getAttendance(HttpServletRequest request) {
        int userId = request.getIntHeader("userId");
        attendanceService.attend(userId);
        Map<String, Object> response = new HashMap<>();
        List<Integer> attendance = attendanceService.getAttendance(userId);
        response.put("check", attendance);
        response.put("todayCheck", true);

        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/check")   //화면 들어오기
    public ResponseEntity<?> checkAttendance(HttpServletRequest request) {
        int userId = request.getIntHeader("userId");
        List<Integer> attendance = attendanceService.getAttendance(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("check", attendance);
        response.put("todayCheck", attendanceService.checkToday(attendance));

        return ResponseEntity.status(200).body(response);
    }
}
