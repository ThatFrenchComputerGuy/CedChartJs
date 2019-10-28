# CedChart.js
CedChart.js is a react-native module which renders a fully scalable Line Chart with data that can be fetched from api.
<p>
<img style="float: left; margin-top: -50px" src="/visuals/loader.png">
<img style="float: right;" src="/visuals/mainVisual.png">
</p>

## Table of Contents
1. [Description](#Description)
2. [Installation](#Installation)
3. [Usage](#Usage)
4. [Contributing](#Contributing)
5. [F.A.Q](#F.A.Q)

## Description
- The chart has two modes:
    - Data is fetched inside the module with axios get or post. The chart displays a loader during the fetch
    - Data is fetched outside the module and you can pass an array that has been fetched elsewhere.

- The x-axis can contain 24-hours value for the moment. The scale will adapt depending on the amount of data with more or less vetical strokes displaying.

- The y-axis will always display 11 adaptive values corresponding to 0, 10, 20, 30, ... , 100% of the data's max value.

## Installation
There is currently no installation option. You have to include the source code in your project.

### Dependencies
You **must** install: 
-  axios
- d3-scale
- d3-shape
- react-native-svg
- _(react_ & _react-native)_

Run ```npm install dependency_name```

Alternatively, you may run ```yarn add dependency_name``` then ```yarn install``` (Not tested)

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
    
 ## F.A.Q
   #### Can I change the aspect ratio of the chart ?
   
   This Chart module has been thought to take the full width of the screen so please *Full compatibility cannot be guaranteed if you change the width ratio.* 
   
   The Chart should render nicely on any screen width so please open an issue stating your screen ratio if it does not. 

   You can adapt the height a little bit.
   
   #### Can I load multiple graphs on the same screen ?
   Yes you absolutely can.
