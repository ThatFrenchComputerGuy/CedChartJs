import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';

export default function XLabels({dateArr, scaleY}) {
  return (
    <React.Fragment>
      {dateArr.map((item, idx) =>
        idx % scaleY === 0 ? (
          <View key={idx}>
            <Text
              style={
                Number(Math.round(Dimensions.get('window').width) * 0.9) < 330
                  ? styles.smallScreen
                  : styles.bigScreen
              }>
              {item}
            </Text>
          </View>
        ) : (
          <View key={idx} />
        ),
      )}
    </React.Fragment>
  );
}

XLabels.propTypes = {
  dateArr: PropTypes.array.isRequired,
  scaleY: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  bigScreen: {
    fontSize: 9,
    marginRight: -10,
  },
  smallScreen: {
    fontSize: 7,
    marginRight: -4,
  },
});
