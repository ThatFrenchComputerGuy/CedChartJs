import React, {Component} from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import YLabel from './CedChartComponents/YLabel';
import LineGenerator from './CedChartComponents/LineGenerator';
import XLabels from './CedChartComponents/XLabel';
import axios from 'axios';
// let myComp = require(axios) from 'axios';

class CedChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      dataType: '',
      period: '',
    };
  }

  componentDidMount() {
    this.setState({
      dataType: this.props.dataType,
    });
    if (this.props.directData) {
      this.setState({data: this.props.directData, loading: false});
    } else {
      if (!this.props.period) {
        this.axios(this.props.device, this.props.dataType, this.props.url).then(
          () => {
            this.setState({...this.state, loading: false});
          },
        );
      }
    }
  }

  getUnit = type => {
    let temp = [];
    this.state.data.forEach(element => {
      if (this.state.dataType) {
        if (element.type === this.props.dataType) {
          type === 'unixCode'
            ? temp.unshift(parseInt(element.time))
            : temp.unshift(parseFloat(element.value));
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
    console.log(xPercentages);
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

  setPeriod(period) {
    this.setState({period: period});
  }

  async axios(device, dataType, url) {
    await axios.get(url + device + '/' + dataType).then(result => {
      this.setState({data: result.data});
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

  render() {
    const {loading} = this.state;
    if (!loading) {
      return (
        <React.Fragment>
          <View>
            <View style={styles.yOnSide}>
              <View style={styles.yLabels}>
                <YLabel
                  unitGet={this.getUnit('values')}
                  dataType={this.props.dataType}
                />
              </View>
              <LineGenerator
                dateArr={this.getDatesArray('classic')}
                valArr={this.getUnit('values')}
                graph={this.graphData()}
                horizonScale={this.horizontalScaler()}
                scaleX={this.xScale()}
                color={this.props.color}
                secondColor={this.props.secondColor}
              />
            </View>
            <View style={styles.xLabels}>
              <XLabels
                dateArr={this.getDatesArray('formatted')}
                scaleY={this.horizontalScaler()}
              />
            </View>
          </View>
        </React.Fragment>
      );
    } else {
      return (
        <View style={{height: 200}}>
          <Text style={{color: '#367be2', paddingTop: 90}}>
            Chart loading...
          </Text>
          <ActivityIndicator
            size="large"
            color="#367be2"
            style={{paddingTop: 10}}
          />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  yOnSide: {
    display: 'flex',
    flexDirection: 'row',
  },
  yLabels: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  xLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 12,
  },
});
export default CedChart;
