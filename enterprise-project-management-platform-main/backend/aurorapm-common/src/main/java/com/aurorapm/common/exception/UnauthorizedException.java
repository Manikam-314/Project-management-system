package com.aurorapm.common.exception;

public class UnauthorizedException extends AuroraPmException {

  public UnauthorizedException(String message) {
    super(message, "UNAUTHORIZED");
  }
}
