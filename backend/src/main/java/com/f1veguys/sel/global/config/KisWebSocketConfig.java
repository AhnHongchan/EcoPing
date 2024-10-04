package com.f1veguys.sel.global.config;

import com.f1veguys.sel.domain.stock.handler.KisWebSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class KisWebSocketConfig implements WebSocketConfigurer {

    private final KisWebSocketHandler kisWebSocketHandler;
    private final KisConfig kisConfig;

    public KisWebSocketConfig(KisWebSocketHandler kisWebSocketHandler, KisConfig kisConfig) {
        this.kisWebSocketHandler = kisWebSocketHandler;
        this.kisConfig = kisConfig;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // 웹소켓을 설정하며, "/websocket"은 프록시를 통해 처리할 수 있는 경로로 설정
        // kisConfig에서 웹소켓 URL을 받아 사용하는 것이 아니라, 애플리케이션에서 클라이언트와의 통신 경로를 설정
        registry.addHandler(kisWebSocketHandler, "/websocket/stock")
                .setAllowedOrigins("*");  // 클라이언트의 모든 출처에서 접근을 허용
    }
}
