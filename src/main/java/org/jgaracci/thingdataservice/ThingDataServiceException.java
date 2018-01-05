package org.jgaracci.thingdataservice;

public class ThingDataServiceException extends RuntimeException
{
  public ThingDataServiceException()
  {
    super();
  }

  public ThingDataServiceException(String message)
  {
    super(message);
  }

  public ThingDataServiceException(String message, Throwable cause)
  {
    super(message, cause);
  }

  public ThingDataServiceException(Throwable cause)
  {
    super(cause);
  }
}
