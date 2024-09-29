package com.f1veguys.sel.domain.stock.handler;

import com.f1veguys.sel.domain.stock.service.StockService;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class KisWebSocketHandler extends TextWebSocketHandler {

    private final StockService stockService;

    public KisWebSocketHandler(StockService stockService) {
        this.stockService = stockService;
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 웹소켓으로 받은 메시지에 따라 주식 데이터를 처리할 수 있도록 수정 가능
        String receivedMessage = message.getPayload(); // 클라이언트로부터 받은 메시지

        // 주식 데이터를 가져와 웹소켓 세션에 전송
        String stockData = stockService.getRealTimeStockData();

        // 주식 데이터를 클라이언트로 전송
        session.sendMessage(new TextMessage("실시간 주식 데이터: " + stockData));
    }
}
