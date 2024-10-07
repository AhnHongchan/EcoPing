package com.f1veguys.sel.domain.consumption.service;

import com.f1veguys.sel.domain.consumption.dto.Consumption;
import com.opencsv.CSVReader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileReader;
import java.io.Reader;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvService {

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    // application.yml에서 upload-dir 설정 읽어오기
    @Value("${file.upload-dir}")
    private String uploadDir;

    // CSV 파일을 파싱하는 메서드
    public List<Consumption> parseCSVFile(File file) throws Exception {
        List<Consumption> consumptionList = new ArrayList<>();

        try (Reader reader = new FileReader(file);
             CSVReader csvReader = new CSVReader(reader)) {

            String[] nextRecord;
            csvReader.readNext(); // 헤더 스킵
            while ((nextRecord = csvReader.readNext()) != null) {
                // CSV 파일의 각 필드를 읽어서 Consumption 객체로 변환
                String name = nextRecord[0];
                int price = Integer.parseInt(nextRecord[1]);
                int quantity = Integer.parseInt(nextRecord[2]);
                LocalDateTime date = LocalDateTime.parse(nextRecord[3], DATE_TIME_FORMATTER);

                // Consumption 객체 생성 후 리스트에 추가
                consumptionList.add(new Consumption(name, price, quantity, date));
            }
        }

        return consumptionList;
    }

    // 매주 월요일 오전 9시에 스케줄링되어 CSV 파일들을 파싱하고 리스트로 반환하는 메서드
    @Scheduled(cron = "0 0 9 ? * MON")
    public List<Consumption> parseScheduledCSVFiles() {
        List<Consumption> allConsumptions = new ArrayList<>();
        File folder = new File(uploadDir);

        // 폴더 내 CSV 파일 목록 가져오기
        File[] csvFiles = folder.listFiles((dir, name) -> name.toLowerCase().endsWith(".csv"));

        if (csvFiles != null) {
            for (File csvFile : csvFiles) {
                try {
                    List<Consumption> consumptionList = parseCSVFile(csvFile);
                    allConsumptions.addAll(consumptionList);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }

        return allConsumptions; // 모든 파일에서 파싱된 소비 내역 리스트 반환
    }
}
