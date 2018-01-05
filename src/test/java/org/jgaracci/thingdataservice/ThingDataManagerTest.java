package org.jgaracci.thingdataservice;

import org.jgaracci.thingdataservice.domain.Thing;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Spy;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class ThingDataManagerTest
{
  @Spy private ThingDataManager manager;

  @Test
  public void all()
  {
    // When

    // Test
    List<Thing> things = manager.all();

    // Expect
    Assert.assertEquals(3, things.size());
    Assert.assertEquals("Banana", things.get(0).getIdentifier());
  }
}