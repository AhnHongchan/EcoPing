package com.f1veguys.sel.domain.consumption.service;

import com.f1veguys.sel.domain.consumption.dto.ConsumptionResponse;
import com.opencsv.CSVReader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

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

    @Value("${file.upload-dir}")
    private String uploadDir;

    // CSV 파일을 파싱
    public List<ConsumptionResponse> parseCSVFile(File file) throws Exception {
        List<ConsumptionResponse> consumptionDtoList = new ArrayList<>();

        try (Reader reader = new FileReader(file);
             CSVReader csvReader = new CSVReader(reader)) {

            String[] nextRecord;
            csvReader.readNext();
            while ((nextRecord = csvReader.readNext()) != null) {
                String name = nextRecord[0];
                int price = Integer.parseInt(nextRecord[1]);
                int quantity = Integer.parseInt(nextRecord[2]);
                LocalDateTime date = LocalDateTime.parse(nextRecord[3], DATE_TIME_FORMATTER);

                consumptionDtoList.add(new ConsumptionResponse(name, price, quantity, date));
            }
        }

        return consumptionDtoList;
    }

    // 매주 월요일 오전 9시에 스케줄링
    @Scheduled(cron = "0 0 9 ? * MON")
    public List<ConsumptionResponse> parseScheduledCSVFiles() {
        List<ConsumptionResponse> allConsumptionDtos = new ArrayList<>();
        File folder = new File(uploadDir);

        // 폴더 내 CSV 파일 목록 가져오기
        File[] csvFiles = folder.listFiles((dir, name) -> name.toLowerCase().endsWith(".csv"));

        if (csvFiles != null) {
            for (File csvFile : csvFiles) {
                try {
                    List<ConsumptionResponse> consumptionDtoList = parseCSVFile(csvFile);
                    allConsumptionDtos.addAll(consumptionDtoList);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }

        return allConsumptionDtos;
    }
}
