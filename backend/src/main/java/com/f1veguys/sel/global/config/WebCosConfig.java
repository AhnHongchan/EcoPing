package com.f1veguys.sel.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebCosConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 경로
                .allowedMethods("*") // httpMethod
                .allowedHeaders("*")
                .allowedOrigins("*")
                .exposedHeaders("*");

    }
}
