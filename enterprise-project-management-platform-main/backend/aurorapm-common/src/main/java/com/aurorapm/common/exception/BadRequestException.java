package com.aurorapm.common.exception;

public class BadRequestException extends AuroraPmException {

  public BadRequestException(String message) {
    super(message, "BAD_REQUEST");
  }
}
