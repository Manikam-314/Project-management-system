package com.aurorapm.api.security;

import com.aurorapm.common.exception.BadRequestException;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthRateLimiter {

  private static final Duration WINDOW = Duration.ofMinutes(1);
  private static final int MAX_ATTEMPTS = 10;

  private final StringRedisTemplate redisTemplate;

  public void check(String keySuffix) {
    String key = "rl:auth:" + keySuffix;
    Long count = redisTemplate.opsForValue().increment(key);
    if (count != null && count == 1L) {
      redisTemplate.expire(key, WINDOW);
    }
    if (count != null && count > MAX_ATTEMPTS) {
      throw new BadRequestException("Too many attempts. Please try again later.");
    }
  }
}
