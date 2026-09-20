package com.shorto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ShortoApplication {
    public static void main(String[] args) {
        SpringApplication.run(ShortoApplication.class, args);
    }
}