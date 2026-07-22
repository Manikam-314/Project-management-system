package com.aurorapm.api.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.aurorapm.api.exception.GlobalExceptionHandler;
import com.aurorapm.api.security.TenantContextFilter;
import com.aurorapm.api.service.SystemService;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

class SystemControllerTest {

  private MockMvc mockMvc;

  @BeforeEach
  void setUp() {
    SystemService systemService = new SystemService();
    ReflectionTestUtils.setField(systemService, "applicationName", "aurorapm-api");
    SystemController controller = new SystemController(systemService);

    mockMvc =
        MockMvcBuilders.standaloneSetup(controller)
            .setControllerAdvice(new GlobalExceptionHandler())
            .addFilters(new TenantContextFilter())
            .build();
  }

  @Test
  void healthReturnsUpStatus() throws Exception {
    mockMvc
        .perform(get("/api/v1/system/health"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.status").value("UP"))
        .andExpect(jsonPath("$.application").value("aurorapm-api"))
        .andExpect(jsonPath("$.version").value("0.1.0"));
  }

  @Test
  void healthEchoesOrganizationContextWhenHeaderPresent() throws Exception {
    UUID organizationId = UUID.randomUUID();

    mockMvc
        .perform(
            get("/api/v1/system/health").header("X-Organization-Id", organizationId.toString()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.organizationId").value(organizationId.toString()));
  }

  @Test
  void invalidOrganizationHeaderReturnsBadRequest() throws Exception {
    mockMvc
        .perform(get("/api/v1/system/health").header("X-Organization-Id", "not-a-uuid"))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorCode").value("BAD_REQUEST"));
  }
}
