package com.aurorapm.api.security;

import com.aurorapm.authorization.service.OrganizationPermissionService;
import com.aurorapm.common.exception.ForbiddenException;
import com.aurorapm.common.tenant.TenantContext;
import com.aurorapm.identity.security.AuroraPmUserDetails;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class TenantContextFilter extends OncePerRequestFilter {

  public static final String ORGANIZATION_HEADER = "X-Organization-Id";

  private final OrganizationPermissionService organizationPermissionService;

  public TenantContextFilter() {
    this.organizationPermissionService = null;
  }

  public TenantContextFilter(OrganizationPermissionService organizationPermissionService) {
    this.organizationPermissionService = organizationPermissionService;
  }

  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain)
      throws ServletException, IOException {
    try {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      if (authentication != null
          && authentication.getPrincipal() instanceof AuroraPmUserDetails userDetails) {
        TenantContext.setUserId(userDetails.getUserId());
      }

      String organizationHeader = request.getHeader(ORGANIZATION_HEADER);
      if (organizationHeader != null && !organizationHeader.isBlank()) {
        UUID organizationId = parseOrganizationId(organizationHeader, response);
        if (organizationId == null) {
          return;
        }

        UUID userId = TenantContext.getUserId().orElse(null);
        if (userId != null
            && organizationPermissionService != null
            && !organizationPermissionService.isMember(userId, organizationId)) {
          writeForbidden(response, "You are not a member of this organization");
          return;
        }

        TenantContext.setOrganizationId(organizationId);
      }

      filterChain.doFilter(request, response);
    } finally {
      TenantContext.clear();
    }
  }

  private UUID parseOrganizationId(String value, HttpServletResponse response) throws IOException {
    try {
      return UUID.fromString(value.trim());
    } catch (IllegalArgumentException ex) {
      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
      response.setContentType(MediaType.APPLICATION_PROBLEM_JSON_VALUE);
      response
          .getWriter()
          .write(
              """
              {"status":400,"title":"Bad Request",\
              "detail":"Invalid X-Organization-Id header: must be a valid UUID",\
              "errorCode":"BAD_REQUEST"}\
              """);
      return null;
    }
  }

  private void writeForbidden(HttpServletResponse response, String detail) throws IOException {
    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
    response.setContentType(MediaType.APPLICATION_PROBLEM_JSON_VALUE);
    response
        .getWriter()
        .write(
            """
            {"status":403,"title":"Forbidden","detail":"%s","errorCode":"FORBIDDEN"}\
            """
                .formatted(detail));
  }
}
