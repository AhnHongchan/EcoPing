package com.f1veguys.sel.domain.attendance.repository;

import com.f1veguys.sel.domain.attendance.domain.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
    @Query("SELECT DAY(a.attendanceDate) FROM Attendance a WHERE a.userId = :userId AND " +
            "MONTH(a.attendanceDate) = MONTH(:currentDate) AND " +
            "YEAR(a.attendanceDate) = YEAR(:currentDate)")
    List<Integer> findAttendanceDaysForCurrentMonth(@Param("userId") int userId, @Param("currentDate") LocalDateTime currentDate);
}
