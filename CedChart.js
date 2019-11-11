import React, {Component} from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import YLabel from './CedChartComponents/YLabel';
import LineGenerator from './CedChartComponents/LineGenerator';
import XLabels from './CedChartComponents/XLabel';

class CedChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: this.props.data ? this.props.data : [],
      dataType: this.props.dataType,
      yScale: 0,
      graphData: [],
      classicTime: [],
      formattedTime: [],
      xScale: [],
      values: [],
    };
  }

  componentDidMount() {
    let data = this.state.data;
    let dataGraph = [],
      classicTime = [],
      formattedTime = [],
      xPercentages = [],
      values = [];
    let yScaleVal;
    data.forEach(element => {
      values.unshift(element[this.props.valUnit]);
      this.graphData(dataGraph, element);
      this.getDatesArray(classicTime, formattedTime, element);
      this.xScale(data, xPercentages, element);
    });
    /*-----yScale()-----*/
    //Every 10 strokes, will divide the amount of strokes by 2.
    if (this.props.period === '1w') {
      console.log(data.length);
      yScaleVal =
        (data.length - (data.length % 10)) / 10 + 1 + data.length / 28;
    } else if (data.length < 20 && data.length > 12) {
      yScaleVal = 2;
    } else if (data.length < 10) {
      yScaleVal = 1;
    } else {
      yScaleVal = (data.length - (data.length % 10)) / 10 + 1;
      console.log(yScaleVal);
    }
    this.setState({
      yScale: yScaleVal,
      graphData: dataGraph,
      classicTime: classicTime,
      formattedTime: formattedTime,
      xScale: xPercentages,
      values: values,
      loading: false,
    });
  }
  // Function necessary as the date for the x-axis of the graph takes pure unix code not *10000
  graphData = (dataGraph, element) => {
    dataGraph.push({
      time: new Date(parseInt(element[this.props.timeUnit])),
      value: element[this.props.valUnit],
    });
  };
  // The function scaleTime() from d3 requires a raw type of unixcode which will be referred to as 'classic'
  // To display the time in the label we need toTimeString() which will be referred to as 'formatted'
  getDatesArray = (classicTime, formattedTime, element) => {
    classicTime.unshift(element[this.props.timeUnit]);
    formattedTime.unshift(new Date(element[this.props.timeUnit] * 1000));
  };

  xScale = (data, xPercentages, element) => {
    let xMax = data[data.length - 1][this.props.timeUnit];
    let scale = xMax - data[0][this.props.timeUnit];
    xPercentages.unshift(
      100 - ((xMax - element[this.props.timeUnit]) * 100) / scale,
    );
  };

  render() {
    const {loading} = this.state;
    if (!loading) {
      return (
        <React.Fragment>
          <View>
            <View style={styles.yOnSide}>
              <View style={styles.yLabels}>
                <YLabel
                  unitGet={this.state.values}
                  yLabel={this.props.yLabel}
                />
              </View>
              <LineGenerator
                dateArr={this.state.classicTime}
                valArr={this.state.values}
                graph={this.state.graphData}
                horizonScale={this.state.yScale}
                scaleX={this.state.xScale}
                color={this.props.color}
                secondColor={this.props.secondColor}
              />
            </View>
            <View style={styles.xLabels}>
              <XLabels
                dateArr={this.state.formattedTime}
                scaleY={this.state.yScale}
                period={this.props.period}
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
