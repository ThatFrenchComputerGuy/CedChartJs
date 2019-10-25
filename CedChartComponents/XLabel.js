import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import DataGatherer from './DataGatherer';

class XLabels extends Component {
  render() {
    return (
      <React.Fragment>
        {DataGatherer.getDatesArray('formatted').map((item, idx) =>
          idx % DataGatherer.horizontalScaler() === 0 ? (
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
}
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
export default XLabels;
