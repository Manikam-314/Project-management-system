package com.aurorapm.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.aurorapm")
@EnableJpaAuditing
@EntityScan(basePackages = "com.aurorapm")
@EnableJpaRepositories(basePackages = "com.aurorapm")
public class AuroraPmApplication {

  public static void main(String[] args) {
    SpringApplication.run(AuroraPmApplication.class, args);
  }
}
