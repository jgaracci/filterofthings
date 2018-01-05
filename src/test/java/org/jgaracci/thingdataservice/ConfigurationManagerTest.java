package org.jgaracci.thingdataservice;

import com.fasterxml.jackson.databind.JsonNode;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Spy;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class ConfigurationManagerTest
{
  @Spy private ConfigurationManager manager;

  @Test
  public void find()
  {
    // When

    // Test
    JsonNode configuration = manager.find("things");

    // Expect
    Assert.assertTrue(configuration.path("responseDataPath").isMissingNode());
  }

  @Test
  public void all()
  {
    // When

    // Test
    JsonNode configurations = manager.all();

    // Expect
    Assert.assertEquals("rates", configurations.path("exchangeRates").path("responseDataPath").asText());
  }
}