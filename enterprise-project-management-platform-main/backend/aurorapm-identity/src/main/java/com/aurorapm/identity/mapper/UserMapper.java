package com.aurorapm.identity.mapper;

import com.aurorapm.identity.dto.response.UserResponse;
import com.aurorapm.identity.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

  UserResponse toResponse(User user);
}
