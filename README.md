# List of Things
A Spring-Boot application that serves up public data via predefined integration configurations.
* ThingDataService performs the following functions 
  * Provides a default Things data collection, loaded from the embedded hardCodedThings.json
  * Serves predefined configurations, loaded from the embedded configurations.json
  

Access the List of Things app via http://localhost:8080/index.html
 * The app provides the following functions
   * Allows the user to select from a predefined list of data services

     * ![Image of Listing](https://preview.ibb.co/c6iNHG/list_Of_Things.png)

   * Displays the data from the selected service based on its configuration in the backend
   * Allows the user to Filter the data
   
     * ![Image of Filters](https://preview.ibb.co/d9srcG/listof_Rates.png)
   
# Technologies
* Java Service Backend
  * Sprint Boot
  * Restful API
  * JSON for data
* Web App Front End
  * RequireJS
  * HandlebarsJS

