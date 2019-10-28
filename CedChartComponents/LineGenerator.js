import React, {Component} from 'react';
import DataGatherer from './DataGatherer';
import {scaleLinear, scaleTime} from 'd3-scale';
import {Dimensions, View} from 'react-native';
import * as shape from 'd3-shape';
import Svg, {Defs, LinearGradient, Path, Stop} from 'react-native-svg';
import GraphAxis from './GraphAxis';

const height = 200;
const {width} = Dimensions.get('window');
const d3 = {
  shape,
};

class LineGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      line: this.drawMyLine(),
    };
  }
  drawMyLine = () => {
    let dateArr = DataGatherer.getDatesArray('classic'),
      valArr = DataGatherer.getUnit('values');
    /*Scale function works as follows:
     * domain = Max - Min of the data
     * range = Max - Min of the available space defined
     * We can then know how many units of domain equals one unit of range
     * --> y = domain/range * x + b with b = 0
     */
    const scaleX = scaleTime()
      .domain([Math.min(...dateArr), Math.max(...dateArr)])
      .range([0, width * 0.9]);

    const scaleY = scaleLinear()
      .domain([0, Math.max(...valArr)]) //d3.max(CedChart.)
      .range([height, 3]); //3 corresponds to a vertical padding

    return d3.shape
      .line()
      .x(d => scaleX(d.time))
      .y(d => scaleY(d.value)) //The max value will be the height of the chart
      .curve(d3.shape.curveCatmullRom.alpha(0.5))(DataGatherer.graphData());
  };

  colorPicker = color => {
    let colorArr = [];
    switch (color){
      case 'blue':
        colorArr.push('#367be2');
        colorArr.push('#CDE3F8');
        break;
      case 'green':
        colorArr.push('#36e258');
        colorArr.push('#d3f8cd');
        break;
      case 'red':
        colorArr.push('#e23636');
        colorArr.push('#f8cdcd');
        break;
      default:
        colorArr.push('#367be2');
        colorArr.push('#CDE3F8');
    }
    return colorArr;
  };

  render() {
    return (
      <View>
        <Svg width={width * 0.9} height={height}>
          <Defs>
            <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
              <Stop stopColor="#ecf0f1" offset="98%" />
              <Stop stopColor={this.colorPicker(this.props.color)[1]} offset="0%" />
              <Stop stopColor="#eef6fd" offset="100%" />
            </LinearGradient>
          </Defs>
          <Path
            d={this.state.line}
            fill="transparent"
            stroke={this.colorPicker(this.props.color)[0]}
            strokeWidth={5}
          />
          <Path
            d={`${this.state.line} L ${0} ${height} L ${width} ${height}`}
            fill="url(#gradient)"
          />
          <GraphAxis />
        </Svg>
      </View>
    );
  }
}
export default LineGenerator;
