package com.f1veguys.sel.domain.stock.handler;

import com.f1veguys.sel.domain.stock.service.StockService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class KisWebSocketHandler extends TextWebSocketHandler {

    private final StockService stockService;
    private final ObjectMapper objectMapper;
    private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    public KisWebSocketHandler(StockService stockService, ObjectMapper objectMapper) {
        this.stockService = stockService;
        this.objectMapper = objectMapper;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        // 새로운 세션이 열리면 세션을 저장
        sessions.add(session);

        // 연결된 클라이언트에게 즉시 데이터를 전송
        Map<String, Object> stockList = stockService.getStockListData();
        String stockListJson = objectMapper.writeValueAsString(stockList);
        session.sendMessage(new TextMessage(stockListJson));  // 즉시 데이터 전송
    }

    // 주기적으로 주식 데이터를 모든 클라이언트에게 전송하는 기능
    @Scheduled(fixedRate = 10000)  // 10초마다 실행
    public void sendStockList() {
        if (!sessions.isEmpty()) {
            try {
                Map<String, Object> stockList = stockService.getStockListData();
                String stockListJson = objectMapper.writeValueAsString(stockList);

                // 연결된 모든 세션에 데이터를 전송
                for (WebSocketSession session : sessions) {
                    if (session.isOpen()) {
                        session.sendMessage(new TextMessage(stockListJson)); // 주기적으로 데이터 전송
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        // 세션이 닫히면 해당 세션을 리스트에서 제거
        sessions.remove(session);
    }
}
