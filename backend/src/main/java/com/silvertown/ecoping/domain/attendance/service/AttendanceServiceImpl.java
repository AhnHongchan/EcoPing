package com.silvertown.ecoping.domain.attendance.service;

import com.silvertown.ecoping.domain.attendance.domain.Attendance;
import com.silvertown.ecoping.domain.attendance.repository.AttendanceRepository;
import com.silvertown.ecoping.domain.points.domain.Points;
import com.silvertown.ecoping.domain.points.service.PointsService;
import com.silvertown.ecoping.domain.pointshistory.service.PointsHistoryService;
import com.silvertown.ecoping.dto.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService{
    private final AttendanceRepository attendanceRepository;
    private final PointsHistoryService pointsHistoryService;
    private final PointsService pointsService;

    @Override
    public void attend(int userId) {
        Attendance attendance = new Attendance();
        attendance.setUserId(userId);
        attendance.setAttendanceDate(LocalDateTime.now());
        Points points = pointsService.getPoints(userId);
        points.setBalance(points.getBalance() + 10);
        pointsHistoryService.savePointsHistory(userId, Operation.EARN, 10, "출석 체크");
        attendanceRepository.save(attendance);
    }

    @Override
    public List<Integer> getAttendance(int userId) {
        List<Integer> attendanceList = new ArrayList<>();
        attendanceList = attendanceRepository.findAttendanceDaysForCurrentMonth(userId, LocalDateTime.now());
        Collections.sort(attendanceList);
        return attendanceList;
    }

    @Override
    public boolean checkToday(List<Integer> attendance) {
        if(attendance.isEmpty()) return false;
        int today = LocalDateTime.now().getDayOfMonth();
        return attendance.get(attendance.size() - 1) == today;
    }
}
