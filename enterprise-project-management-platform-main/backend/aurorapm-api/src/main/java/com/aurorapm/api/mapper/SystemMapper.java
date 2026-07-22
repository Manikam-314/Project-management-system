package com.aurorapm.api.mapper;

import com.aurorapm.api.dto.response.SystemHealthResponse;
import com.aurorapm.api.service.SystemService;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

/**
 * MapStruct mapper registry — extended in future phases as DTO mappings grow.
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SystemMapper {

  default SystemHealthResponse toResponse(SystemHealthResponse source) {
    return source;
  }
}
