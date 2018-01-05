package org.jgaracci.thingdataservice;

import com.fasterxml.jackson.databind.JsonNode;
import org.jgaracci.thingdataservice.domain.Thing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
public class ThingDataService
{
  @Autowired
  private ThingDataManager thingDataManager;

  @Autowired
  private ConfigurationManager configurationManager;

  @RequestMapping(path="/things", method=RequestMethod.GET)
  @CrossOrigin
  public List<Thing> things()
  {
    return thingDataManager.all();
  }

  @RequestMapping(path="/configuration/{key}", method=RequestMethod.GET)
  @CrossOrigin
  public JsonNode configuration(@PathVariable("key") String configurationKey)
  {
    return configurationManager.find(configurationKey);
  }

  @RequestMapping(path="/configurations", method=RequestMethod.GET)
  @CrossOrigin
  public JsonNode configurations()
  {
    return configurationManager.all();
  }
}
