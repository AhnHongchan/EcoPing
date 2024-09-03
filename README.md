# 1일차

핀테크 도메인 API 명세서 정독

# 2일차

개발 사전학습 중 상세 기능 기획 관련 시장조사

# 3일차

CORS 설정에 대해 공부
```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebCosConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 경로
                .allowedMethods("*") // httpMethod
                .allowCredentials(true)
                .allowedHeaders("*")
                .allowedOrigins("*")
                .exposedHeaders("*"); //

    }
}
```

# 09-02 (월)
### 프로젝트 주제 상세화 고안
- 기존 ESG에서 eco만 살리기
- 백엔드 기능적인 부분 보다 성능적인 부분 강화 (보안 or 대용량 트래픽/데이터 처리)

# 09-03 (화)
### 스프링 Batch 학습 1
**batch :** 실시간으로 처리하기에 크기가 너무 커서 리소스가 많이 필요할 때, 특정 시간에 특정 양을 한번에 처리하는 방식.  
**Process Flow**  
![image.png](/image.png)
