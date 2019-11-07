import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';

export default function YLabel({unitGet, yLabel}) {
  let maxVal = Math.max(...unitGet);
  let yLabels = [String(parseInt(maxVal))];
  for (let i = 0.9; i > 0.1; i -= 0.1) {
    maxVal * i < 10
      ? yLabels.push('0' + parseInt(maxVal * i, 10))
      : yLabels.push(parseInt(maxVal * i, 10));
  }
  yLabels.push('00');
  return (
    <React.Fragment>
      <View>
        <Text style={{fontSize: 13, marginTop: -23, marginLeft: 4}}>
          {yLabel}
        </Text>
      </View>

      {/*The style applied on Rows renders a homogeneous display for y labels depending on
             whether it's a 2 or 3 digit number*/}
      {yLabels.map((item, idx) => (
        <View
          key={idx}>
          <Text
            style={[
              {fontSize: 11},
              idx === 0 ? {paddingBottom: 1, marginTop: -11} : {paddingTop: -4},
            ]}>
            {item}
          </Text>
        </View>
      ))}
    </React.Fragment>
  );
}

YLabel.propTypes = {
  unitGet: PropTypes.array.isRequired,
  yLabel: PropTypes.string,
};
