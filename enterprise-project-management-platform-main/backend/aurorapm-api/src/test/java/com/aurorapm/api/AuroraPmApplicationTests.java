package com.aurorapm.api;

import com.aurorapm.api.support.IntegrationTestConfig;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
@Import(IntegrationTestConfig.class)
class AuroraPmApplicationTests {

  @Test
  void contextLoads() {}
}
