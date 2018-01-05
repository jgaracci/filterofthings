package org.jgaracci.thingdataservice;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.UUID;

@ControllerAdvice
public class ThingDataServiceExceptionHandler extends ResponseEntityExceptionHandler
{
  @ExceptionHandler(ThingDataServiceException.class)
  public ResponseEntity<Object> handleThingServiceException(ThingDataServiceException e, WebRequest request)
  {
    String response = String.format("Application Error %s", generateErrorIdentifier());
    logger.error(String.format("%s", response), e);
    return handleExceptionInternal(e, response,
      new HttpHeaders(), HttpStatus.CONFLICT, request);
  }

  private String generateErrorIdentifier()
  {
    return UUID.randomUUID().toString();
  }
}
