import React from 'react';
import axios from 'axios';

class DataGatherer {
  constructor() {
    this.state = {
      data: [],
      dataType: ['0'],
      period: '',
      increment: 0,
    };
  }

  getUnit = type => {
    let temp = [];
    this.state.data.forEach(element => {
      for (let i = 0; i < this.state.dataType.length; i++) {
        if (this.state.dataType[i]) {
          if (element.type === this.state.dataType[i]) {
            type === 'unixCode'
              ? temp.unshift(parseInt(element.time))
              : temp.unshift(parseFloat(element.value));
          }
        }
      }
    });
    return temp;
  };
  //Function necessary as the date for the x-axis of the graph takes pure unix code not *10000
  graphData = () => {
    let dataGraph = [];

    for (let i = 0; i < this.getUnit('unixCode').length; i++) {
      dataGraph.unshift({
        time: new Date(this.getUnit('unixCode')[i]),
        value: this.getUnit('values')[i],
      });
    }
    return dataGraph;
  };
  // The function scaleTime() from d3 requires a raw type of unixcode which will be referred to as 'classic'
  // To display the time in the label we need toTimeString() which will be referred to as 'formatted'
  getDatesArray = type => {
    let dateArr = [];
    let dataFormat = [];
    for (let i = 0; i < this.getUnit('unixCode').length; i++) {
      if (type === 'classic') {
        dateArr = dateArr.concat(this.graphData()[i].time);
      } else if (type === 'formatted') {
        dataFormat.push({
          time: new Date(this.getUnit('unixCode')[i] * 1000),
          value: this.getUnit('values'),
        });
        dateArr = dateArr.concat(
          dataFormat[i].time.toTimeString().substr(0, 5),
        );
      }
    }
    return dateArr;
  };
  xScale = () => {
    let unixCode = this.getUnit('unixCode');
    let xMax = unixCode[unixCode.length - 1];
    let scale = xMax - unixCode[0];
    let xPercentages = [];
    for (let i = 0; i < unixCode.length; i++) {
      xPercentages.push(100 - ((xMax - unixCode[i]) * 100) / scale);
    }
    return xPercentages;
  };
  //Every 10 strokes, will divide the amount of strokes by 2.
  horizontalScaler = () => {
    let unixCode = this.getUnit('unixCode').length;
    if (unixCode < 20 && unixCode > 12) {
      return 2;
    } else if (unixCode < 10) {
      return 1;
    } else {
      return (unixCode - (unixCode % 10)) / 10 + 1;
    }
  };

  setDataType(dataType) {
    this.state.dataType[this.state.increment] = dataType;
    this.state.increment += 1;
  }

  setPeriod(period) {
    this.state.period = period;
  }

  async axios(device, dataType) {
    await axios
      .get('https://gaussfan.de:3000/chartMeasures/' + device + '/' + dataType)
      .then(result => {
        this.state.data = result.data;
      });
  }
  // async axios(url) {
  //   await axios
  //     .post(url, {
  //       "client": 'A4:CF:12:6B:DA:8C',
  //       "type": 'Temperature',
  //       "startDate": '1571974000',
  //       "endDate": '1571976909',
  //     })
  //     .then(result => {
  //       console.log(result.data[0].x);
  //       this.state.data = result.data;
  //     });
  // }
  parseDirectData(data) {
    this.state.data = data;
  }
}
export default new DataGatherer();
