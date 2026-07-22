package com.aurorapm.common.exception;

public class ResourceNotFoundException extends AuroraPmException {

  public ResourceNotFoundException(String message) {
    super(message, "RESOURCE_NOT_FOUND");
  }

  public ResourceNotFoundException(String resource, String identifier) {
    super("%s not found: %s".formatted(resource, identifier), "RESOURCE_NOT_FOUND");
  }
}
