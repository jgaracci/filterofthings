package org.jgaracci.thingdataservice;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;

@Component
public class ConfigurationManager
{
  public JsonNode find(String configurationKey)
  {
    return all().path(configurationKey);
  }

  public JsonNode all()
  {
    ObjectMapper mapper = new ObjectMapper();
    InputStream configurationsInputStream = this.getClass().getResourceAsStream("configurations.json");

    try
    {
      return mapper.readValue(configurationsInputStream, JsonNode.class);
    }
    catch (IOException e)
    {
      throw new ThingDataServiceException("Failed reading hardCodedThings", e);
    }
  }
}
