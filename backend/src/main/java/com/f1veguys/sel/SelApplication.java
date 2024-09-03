package com.f1veguys.sel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SelApplication {

    public static void main(String[] args) {
        SpringApplication.run(SelApplication.class, args);
    }

}
