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

    public KisWebSocketHandler(StockService stockService, KisAccessTokenUtil kisAccessTokenUtil, KisConfig kisConfig, ObjectMapper objectMapper) {
        this.stockService = stockService;
        this.kisAccessTokenUtil = kisAccessTokenUtil;
        this.kisConfig = kisConfig;
        this.objectMapper = objectMapper;
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
        } catch (Exception e) {
            session.sendMessage(new TextMessage("Approval Key 발급 실패: " + e.getMessage()));
            session.close();
        }

        // 웹소켓 연결 후 주식 리스트를 즉시 전송
        sendStockUpdates();
    }

    @Scheduled(fixedRate = 10000)  // 10초마다 실행
    public void sendStockUpdates() {
        if (!sessions.isEmpty()) {
            try {
                // DB에서 기업 리스트를 가져와서 주식 데이터를 요청
                List<String> companyNumbers = stockService.getAllCompanyCodes();
                List<Map<String, Object>> stockDataList = new ArrayList<>(); // 전체 기업 데이터를 담을 리스트

                for (String companyCode : companyNumbers) {
                    // 각 기업에 대해 실시간 주식 데이터를 요청
                    JsonNode stockData = stockService.getRealTimeStockData(companyCode);

                    // 필요한 데이터만 추출 (종목코드, 주식 이름, 현재가, 전일 대비 가격, 전일 대비 등락률)
                    Map<String, Object> filteredStockData = new HashMap<>();
                    filteredStockData.put("stockId", stockData.get("output").get("stck_shrn_iscd").asText()); // 종목 코드
                    filteredStockData.put("stockName", stockData.get("output").get("rprs_mrkt_kor_name").asText()); // 주식 이름
                    filteredStockData.put("currentPrice", stockData.get("output").get("stck_prpr").asText()); // 현재가
                    filteredStockData.put("priceDifference", stockData.get("output").get("prdy_vrss").asText()); // 전일 대비 가격
                    filteredStockData.put("rateDifference", stockData.get("output").get("prdy_ctrt").asText()); // 전일 대비 등락률

                    // 리스트에 추가
                    stockDataList.add(filteredStockData);
                }

                // 전체 데이터를 묶어서 JSON으로 변환
                String stockDataJson = objectMapper.writeValueAsString(stockDataList);

                // 각 세션에 전송
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
                        sessions.remove(session);  // 세션이 닫혀있다면 리스트에서 제거
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        sessions.remove(session);
    }
}
