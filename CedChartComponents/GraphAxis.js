import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {Line} from 'react-native-svg';
import PropTypes from 'prop-types';

const {width} = Dimensions.get('window');
let yPercentages = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export default function GraphAxis({dateArr, horizontalScaler}) {
  return (
    <View>
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {dateArr.map((item, idx) =>
          idx % horizontalScaler === 0 ? (
            <View
              key={idx}
              style={{
                borderLeftColor: '#c3d1e6',
                borderLeftWidth: 1,
                width: 1,
                paddingBottom: 200,
              }}
            />
          ) : (
            <View
              key={idx}
              style={{
                width: 0,
              }}
            />
          ),
        )}
      </View>
    </View>
  );
}
GraphAxis.propTypes = {
  dateArr: PropTypes.array.isRequired,
  horizontalScaler: PropTypes.number.isRequired,
};
