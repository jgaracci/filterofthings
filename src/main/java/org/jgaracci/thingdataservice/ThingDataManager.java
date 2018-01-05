package org.jgaracci.thingdataservice;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.jgaracci.thingdataservice.domain.Thing;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class ThingDataManager
{
  List<Thing> all()
  {
    ObjectMapper mapper = new ObjectMapper();
    InputStream thingInputStream = this.getClass().getResourceAsStream("hardCodedThings.json");

    try
    {
      return mapper.readValue(thingInputStream, new TypeReference<List<Thing>>() {});
    }
    catch (IOException e)
    {
      throw new ThingDataServiceException("Failed reading hardCodedThings", e);
    }
  }
}
