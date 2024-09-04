package com.f1veguys.sel.domain.attendance.service;

import java.util.List;

public interface AttendanceService {
    public void attend(int userId);
    public List<Integer> getAttendance(int userId);
    public boolean checkToday(List<Integer> attendance);
}
