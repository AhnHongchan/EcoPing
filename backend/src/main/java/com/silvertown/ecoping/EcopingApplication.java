package com.silvertown.ecoping;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class EcopingApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcopingApplication.class, args);
    }

}
