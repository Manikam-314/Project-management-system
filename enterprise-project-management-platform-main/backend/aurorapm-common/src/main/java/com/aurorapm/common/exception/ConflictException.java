package com.aurorapm.common.exception;

public class ConflictException extends AuroraPmException {

  public ConflictException(String message) {
    super(message, "CONFLICT");
  }
}
