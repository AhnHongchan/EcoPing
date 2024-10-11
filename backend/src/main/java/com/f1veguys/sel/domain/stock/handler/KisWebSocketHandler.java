package com.f1veguys.sel.domain.stock.handler;

import com.f1veguys.sel.domain.stock.service.StockService;
import com.f1veguys.sel.global.util.KisAccessTokenUtil;
import com.f1veguys.sel.global.config.KisConfig;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.HashMap;
import java.util.ArrayList;

@Component
public class KisWebSocketHandler extends TextWebSocketHandler {

    private final StockService stockService;
    private final KisAccessTokenUtil kisAccessTokenUtil;
    private final KisConfig kisConfig;
    private final ObjectMapper objectMapper;
    private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    private final List<Map<String, Object>> aggregatedData = new ArrayList<>(); // 데이터를 고정된 순서로 유지하는 리스트
    private List<String> companyNumbers;
    private int currentBatchIndex = 0;

    public KisWebSocketHandler(StockService stockService, KisAccessTokenUtil kisAccessTokenUtil, KisConfig kisConfig, ObjectMapper objectMapper) {
        this.stockService = stockService;
        this.kisAccessTokenUtil = kisAccessTokenUtil;
        this.kisConfig = kisConfig;
        this.objectMapper = objectMapper;
        this.companyNumbers = stockService.getAllCompanyCodes();

        // 회사 순서에 맞게 빈 데이터로 초기화
        for (String companyNumber : companyNumbers) {
            Map<String, Object> initialData = new HashMap<>();
            initialData.put("companyNumber", companyNumber);
            initialData.put("stockName", "");
            initialData.put("currentPrice", "");
            initialData.put("priceDifference", "");
            initialData.put("rateDifference", "");
            aggregatedData.add(initialData);
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        sessions.add(session);
        String approvalKey = null;
        try {
            approvalKey = kisAccessTokenUtil.getApprovalKey();
            StandardWebSocketClient client = new StandardWebSocketClient();

            client.doHandshake(new TextWebSocketHandler() {
                @Override
                public void handleTextMessage(WebSocketSession webSocketSession, TextMessage webSocketMessage) {
                    if (session.isOpen()) {
                        try {
                            session.sendMessage(new TextMessage(webSocketMessage.getPayload()));
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    } else {
                        System.out.println("WebSocket 세션이 닫혀있어 메시지를 전송할 수 없습니다.");
                    }
                }
            }, kisConfig.getWebsocketUrl() + "?approval_key=" + approvalKey);

            sendInitialStockUpdates(session);

        } catch (Exception e) {
            session.sendMessage(new TextMessage("Approval Key 발급 실패: " + e.getMessage()));
            session.close();
        }
    }

    private void sendInitialStockUpdates(WebSocketSession session) {
        try {
            String stockDataJson = objectMapper.writeValueAsString(aggregatedData);
            if (session.isOpen()) {
                session.sendMessage(new TextMessage(stockDataJson));
            } else {
                System.err.println("WebSocket 세션이 닫혀 있어 초기 데이터를 전송할 수 없습니다. 세션 ID: " + session.getId());
            }
        } catch (IOException e) {
            System.err.println("초기 데이터 전송 중 JSON 직렬화 오류 발생: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Scheduled(fixedRate = 2000)  // 2초마다 실행
    public void collectStockData() {
        try {
            int endIndex = Math.min(currentBatchIndex + 20, companyNumbers.size());

            for (int i = currentBatchIndex; i < endIndex; i++) {
                String companyCode = companyNumbers.get(i);
                JsonNode stockData = stockService.getRealTimeStockData(companyCode);
                Map<String, Object> filteredStockData = extractStockData(stockData);

                // 기존 데이터 업데이트 (회사 코드 순서 유지)
                aggregatedData.set(i, filteredStockData);
            }

            currentBatchIndex = (currentBatchIndex + 20) % companyNumbers.size();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Scheduled(fixedRate = 6000)  // 6초마다 실행
    public void sendAggregatedData() {
        if (!sessions.isEmpty() && !aggregatedData.isEmpty()) {
            try {
                String stockDataJson = objectMapper.writeValueAsString(aggregatedData);

                for (WebSocketSession session : sessions) {
                    if (session.isOpen()) {
                        try {
                            session.sendMessage(new TextMessage(stockDataJson));
                        } catch (IOException e) {
                            System.out.println("메시지 전송 중 오류 발생: " + e.getMessage());
                            e.printStackTrace();
                        }
                    } else {
                        System.out.println("WebSocket 세션이 닫혀 있어 메시지를 전송할 수 없습니다.");
                        sessions.remove(session);
                    }
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private Map<String, Object> extractStockData(JsonNode stockData) {
        Map<String, Object> filteredStockData = new HashMap<>();
        filteredStockData.put("companyNumber", stockData.get("output").get("stck_shrn_iscd").asText());
        filteredStockData.put("stockName", stockData.get("output").get("rprs_mrkt_kor_name").asText());
        filteredStockData.put("currentPrice", stockData.get("output").get("stck_prpr").asText());
        filteredStockData.put("priceDifference", stockData.get("output").get("prdy_vrss").asText());
        filteredStockData.put("rateDifference", stockData.get("output").get("prdy_ctrt").asText());
        return filteredStockData;
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        sessions.remove(session);
    }
}
