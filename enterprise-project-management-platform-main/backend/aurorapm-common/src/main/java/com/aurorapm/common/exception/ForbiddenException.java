package com.aurorapm.common.exception;

public class ForbiddenException extends AuroraPmException {

  public ForbiddenException(String message) {
    super(message, "FORBIDDEN");
  }
}
