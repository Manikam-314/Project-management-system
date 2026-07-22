package com.aurorapm.api.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

  private static final String BEARER_SCHEME = "bearerAuth";
  private static final String ORG_HEADER = "orgHeader";

  @Bean
  OpenAPI auroraPmOpenApi() {
    return new OpenAPI()
        .info(
            new Info()
                .title("AuroraPM API")
                .description(
                    "Enterprise AI-powered project management platform. "
                        + "Phase 0 foundation — authentication will be added in Phase 1.")
                .version("0.1.0")
                .contact(new Contact().name("AuroraPM Team").email("support@aurorapm.io"))
                .license(new License().name("Proprietary")))
        .addSecurityItem(new SecurityRequirement().addList(BEARER_SCHEME))
        .addSecurityItem(new SecurityRequirement().addList(ORG_HEADER))
        .components(
            new Components()
                .addSecuritySchemes(
                    BEARER_SCHEME,
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                        .description("JWT access token (Phase 1)"))
                .addSecuritySchemes(
                    ORG_HEADER,
                    new SecurityScheme()
                        .type(SecurityScheme.Type.APIKEY)
                        .in(SecurityScheme.In.HEADER)
                        .name("X-Organization-Id")
                        .description("Active organization UUID")));
  }
}
