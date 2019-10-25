import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {Line} from 'react-native-svg';
import DataGatherer from './DataGatherer';

const {width} = Dimensions.get('window');
let yPercentages = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

class GraphAxis extends Component {
  render() {
    return (
      <React.Fragment>
        {yPercentages.map(item => (
          <Line
            key={item}
            x1={0}
            y1={item + '%'}
            x2={width}
            y2={item + '%'}
            stroke="#c3d1e6"
            strokeWidth="02"
          />
        ))}
        {DataGatherer.xScale().map((item, idx) =>
          idx % DataGatherer.horizontalScaler() === 0 ? (
            <Line
              key={idx}
              x1={item + '%'}
              y1="100%"
              x2={item + '%'}
              y2="0%"
              stroke="#c3d1e6"
              strokeWidth="02"
            />
          ) : (
            <Line key={idx} /> //Do not display any line
          ),
        )}
      </React.Fragment>
    );
  }
}
export default GraphAxis;
