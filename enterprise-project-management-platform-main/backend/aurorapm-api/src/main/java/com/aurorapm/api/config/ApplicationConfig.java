package com.aurorapm.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.StringRedisTemplate;

import com.aurorapm.common.tenant.TenantContext;

import java.util.Optional;
import java.util.UUID;

@Configuration
public class ApplicationConfig {

  @Bean
  AuditorAware<UUID> auditorAware() {
    return () -> TenantContext.getUserId();
  }

  @Bean
  StringRedisTemplate stringRedisTemplate(RedisConnectionFactory connectionFactory) {
    return new StringRedisTemplate(connectionFactory);
  }
}
