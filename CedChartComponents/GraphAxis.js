import React from 'react';
import {Dimensions, View} from 'react-native';
import {Line} from 'react-native-svg';
import PropTypes from 'prop-types';

const {width} = Dimensions.get('window');
let yPercentages = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export default function GraphAxis({xScale, horizontalScaler}) {
  return (
    <View xScale={xScale} horizontalScaler={horizontalScaler}>
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
      {xScale.map((item, idx) =>
        idx % horizontalScaler === 0 ? (
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
    </View>
  );
}
GraphAxis.propTypes = {
  xScale: PropTypes.array.isRequired,
  horizontalScaler: PropTypes.number.isRequired,
};
