package com.aurorapm.api.exception;

import com.aurorapm.common.exception.AuroraPmException;
import com.aurorapm.common.exception.BadRequestException;
import com.aurorapm.common.exception.ConflictException;
import com.aurorapm.common.exception.ForbiddenException;
import com.aurorapm.common.exception.ResourceNotFoundException;
import com.aurorapm.common.exception.UnauthorizedException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import java.net.URI;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.FieldError;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(UnauthorizedException.class)
  ProblemDetail handleUnauthorized(UnauthorizedException ex, HttpServletRequest request) {
    ProblemDetail problem =
        ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, ex.getMessage());
    enrich(problem, ex.getErrorCode(), request);
    return problem;
  }

  @ExceptionHandler(ForbiddenException.class)
  ProblemDetail handleForbidden(ForbiddenException ex, HttpServletRequest request) {
    ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, ex.getMessage());
    enrich(problem, ex.getErrorCode(), request);
    return problem;
  }

  @ExceptionHandler(AccessDeniedException.class)
  ProblemDetail handleAccessDenied(AccessDeniedException ex, HttpServletRequest request) {
    ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, "Access denied");
    enrich(problem, "FORBIDDEN", request);
    return problem;
  }

  @ExceptionHandler(ConflictException.class)
  ProblemDetail handleConflict(ConflictException ex, HttpServletRequest request) {
    ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, ex.getMessage());
    enrich(problem, ex.getErrorCode(), request);
    return problem;
  }

  @ExceptionHandler(ResourceNotFoundException.class)
  ProblemDetail handleNotFound(ResourceNotFoundException ex, HttpServletRequest request) {
    ProblemDetail problem =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
    enrich(problem, ex.getErrorCode(), request);
    return problem;
  }

  @ExceptionHandler(BadRequestException.class)
  ProblemDetail handleBadRequest(BadRequestException ex, HttpServletRequest request) {
    ProblemDetail problem =
        ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
    enrich(problem, ex.getErrorCode(), request);
    return problem;
  }

  @ExceptionHandler(AuroraPmException.class)
  ProblemDetail handleAuroraPm(AuroraPmException ex, HttpServletRequest request) {
    ProblemDetail problem =
        ProblemDetail.forStatusAndDetail(HttpStatus.UNPROCESSABLE_ENTITY, ex.getMessage());
    enrich(problem, ex.getErrorCode(), request);
    return problem;
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  ProblemDetail handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
    String detail =
        ex.getBindingResult().getFieldErrors().stream()
            .map(this::formatFieldError)
            .collect(Collectors.joining("; "));

    ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, detail);
    enrich(problem, "VALIDATION_ERROR", request);
    problem.setProperty(
        "errors",
        ex.getBindingResult().getFieldErrors().stream()
            .collect(
                Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage, (a, b) -> a)));
    return problem;
  }

  @ExceptionHandler(ConstraintViolationException.class)
  ProblemDetail handleConstraintViolation(
      ConstraintViolationException ex, HttpServletRequest request) {
    String detail =
        ex.getConstraintViolations().stream()
            .map(v -> v.getPropertyPath() + ": " + v.getMessage())
            .collect(Collectors.joining("; "));

    ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, detail);
    enrich(problem, "VALIDATION_ERROR", request);
    return problem;
  }

  @ExceptionHandler(Exception.class)
  ProblemDetail handleUnexpected(Exception ex, HttpServletRequest request) {
    log.error("Unexpected error at {}", request.getRequestURI(), ex);
    ProblemDetail problem =
        ProblemDetail.forStatusAndDetail(
            HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred");
    enrich(problem, "INTERNAL_ERROR", request);
    return problem;
  }

  private void enrich(ProblemDetail problem, String errorCode, HttpServletRequest request) {
    problem.setTitle(HttpStatus.valueOf(problem.getStatus()).getReasonPhrase());
    problem.setProperty("errorCode", errorCode);
    problem.setProperty("path", request.getRequestURI());
    problem.setType(URI.create("https://aurorapm.io/problems/" + errorCode.toLowerCase()));
  }

  private String formatFieldError(FieldError error) {
    return error.getField() + ": " + error.getDefaultMessage();
  }
}
