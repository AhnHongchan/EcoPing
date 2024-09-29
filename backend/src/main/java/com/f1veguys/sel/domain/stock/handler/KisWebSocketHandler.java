package com.f1veguys.sel.domain.stock.handler;

import com.f1veguys.sel.domain.stock.service.StockService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class KisWebSocketHandler extends TextWebSocketHandler {

    private final StockService stockService;
    private final ObjectMapper objectMapper;

    public KisWebSocketHandler(StockService stockService, ObjectMapper objectMapper) {
        this.stockService = stockService;
        this.objectMapper = objectMapper;
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 수신한 메시지를 처리
        String receivedMessage = message.getPayload();
        System.out.println("Received: " + receivedMessage);

        // 받은 메시지에서 주식 종목 코드를 추출
        String stockCode = extractStockCode(receivedMessage);
        System.out.println("Stock code: " + stockCode);

        // 주식 데이터를 가져오는 로직 호출 (실시간 데이터를 가져오는 경우)
        JsonNode stockData = stockService.getRealTimeStockData(stockCode);
        System.out.println("Stock data: " + objectMapper.writeValueAsString(stockData));
        // 주식 데이터를 웹소켓 세션으로 전송
        session.sendMessage(new TextMessage(stockData.toString()));

        // 실시간 데이터를 처리하는 로직 추가
        processRealTimeStockData(receivedMessage);
    }

    private String extractStockCode(String message) throws Exception {
        // 메시지에서 stockCode를 추출하는 로직 (JSON 형태로 가정)
        JsonNode jsonNode = objectMapper.readTree(message);
        if (jsonNode.has("stockCode")) {
            return jsonNode.get("stockCode").asText();
        } else {
            throw new IllegalArgumentException("Invalid message format: stockCode not found");
        }
    }

    private void processRealTimeStockData(String receivedMessage) {
        // 실시간 데이터를 처리하는 로직
        System.out.println("Processing real-time stock data: " + receivedMessage);

        // 받은 데이터를 파싱하거나 필요한 로직을 추가합니다.
        String[] dataParts = receivedMessage.split("\\^");

        // 예: 종목코드, 현재가, 체결량 등 데이터를 출력하는 로직 추가
        if (dataParts.length > 2) {
            String stockCode = dataParts[0];
            String currentPrice = dataParts[1];
            String tradeVolume = dataParts[2];
            System.out.println("Stock Code: " + stockCode);
            System.out.println("Current Price: " + currentPrice);
            System.out.println("Trade Volume: " + tradeVolume);
        }
    }
}
