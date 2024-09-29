package com.f1veguys.sel.global.config;

import com.f1veguys.sel.domain.stock.handler.KisWebSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final KisWebSocketHandler kisWebSocketHandler;

    public WebSocketConfig(KisWebSocketHandler kisWebSocketHandler) {
        this.kisWebSocketHandler = kisWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // 웹소켓 엔드포인트 등록
        registry.addHandler(kisWebSocketHandler, "/stock-websocket")
                .setAllowedOrigins("*"); // 수정 가능: 클라이언트의 도메인 추가
    }
}
