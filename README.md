# CedChart.js
CedChart.js is a react-native module which renders a fully scalable Line Chart with data that can be fetched from api.

## Description
- The chart has two modes:
    - Data is fetched inside the module with axios get or post. The chart displays a loader during the fetch
    - Data is fetched outside the module and you can pass an array that has been fetched elsewhere.

- The x-axis can contain 24-hours value for the moment. The scale will adapt depending on the amount of data with more or less vetical strokes displaying.

- The y-axis will always display 11 adaptive values corresponding to 0, 10, 20, 30, ... , 100% of the data's max value.

## Installation
There is currently no installation option. You have to include the source code in your project.

## Usage
You implement the chart by calling ```<CedChart />``` in your ```render()```

- **Option 1** - You pass pre-fetched data to the Chart:
    You need 2 props: **directData** and **dataType**.
    - directData must be an array of Objects containing at least 2 different object with at least ```time:``` ,  ```value:``` and ```type:```     
    *Example:* 
    ```
  <CedChart 
        directData={[
            {
              _id: '5d9c4467a9b60f0012c1bb67',
              client: 'A4:CF:12:6B:DA:8C',
              time: '1570522315',
              type: 'Temperature',
              value: '0',
              __v: 0,
            },
            {
              _id: '5d9c4467a9b60f0012c1bb67',
              client: 'A4:CF:12:6B:DA:8C',
              time: '1570522215',
              type: 'Temperature',
              value: '100',
              __v: 0,
            },
          ]}
          dataType="Temperature" 
  />
  ```
- **Option 2** - You let the Chart fetch the data. You only need to specify the 2 props: **device** and **dataType**.
    
    *Example:*
    ```
    <CedChart
      device="A4:CF:12:6B:DA:8C"
      dataType="Temperature"
    />
    ```
  
  ## Contributing
  Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change or contact me on Slack.
