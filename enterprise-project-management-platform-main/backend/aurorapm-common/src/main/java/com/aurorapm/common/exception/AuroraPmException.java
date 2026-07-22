package com.aurorapm.common.exception;

import lombok.Getter;

@Getter
public class AuroraPmException extends RuntimeException {

  private final String errorCode;

  public AuroraPmException(String message, String errorCode) {
    super(message);
    this.errorCode = errorCode;
  }

  public AuroraPmException(String message, String errorCode, Throwable cause) {
    super(message, cause);
    this.errorCode = errorCode;
  }
}
