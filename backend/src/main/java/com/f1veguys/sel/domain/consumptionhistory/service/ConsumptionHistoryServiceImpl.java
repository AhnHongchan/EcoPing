package com.f1veguys.sel.domain.consumptionhistory.service;

import com.f1veguys.sel.domain.consumptionhistory.domain.ConsumptionHistory;
import com.f1veguys.sel.domain.consumptionhistory.dto.ConsumptionHistoryResponse;
import com.f1veguys.sel.domain.consumptionhistory.repository.ConsumptionHistoryRepository;
import com.f1veguys.sel.global.error.exception.FileNotFoundException;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ConsumptionHistoryServiceImpl implements ConsumptionHistoryService {

    private final ConsumptionHistoryRepository consumptionHistoryRepository;
    private final String CSV_PATH = "src/main/resources/uploads";

    // eco 소비 모두 가져오기
    @Override
    public List<ConsumptionHistoryResponse> getEcoConsumptionHistories() {
        return consumptionHistoryRepository.findAllByIsEcoTrue().stream()
                .map(ConsumptionHistoryResponse::new)
                .collect(Collectors.toList());
    }

    // 매일 새벽 3시에 소비목록 저장하기
    // 저장하면 파일 삭제
    @Override
    @Scheduled(cron = "0 0 3 * * *")
    @Transactional
    public void SaveCsvFiles() {

        File folder = new File(CSV_PATH);
        File[] csvFiles = folder.listFiles((dir, name) -> name.endsWith(".csv"));

        if (csvFiles == null || csvFiles.length == 0) {
            throw new FileNotFoundException();
        }

        for (File csvFile : csvFiles) {
            List<ConsumptionHistory> histories = new ArrayList<>();
            try (CSVReader reader = new CSVReader(new FileReader(csvFile))) {
                String[] nextLine;
                while ((nextLine = reader.readNext()) != null) {
                    String name = nextLine[0];
                    int price = Integer.parseInt(nextLine[1]);
                    boolean isEco = Boolean.parseBoolean(nextLine[2]);
                    LocalDateTime date = LocalDateTime.parse(nextLine[3]);

                    ConsumptionHistory history = ConsumptionHistory.builder()
                            .name(name)
                            .price(price)
                            .isEco(isEco)
                            .date(date)
                            .build();

                    histories.add(history);
                }

                consumptionHistoryRepository.saveAll(histories);

                Files.delete(Paths.get(csvFile.getAbsolutePath()));
            } catch (IOException | CsvValidationException e) {
                e.printStackTrace();
            }
        }
    }
}
