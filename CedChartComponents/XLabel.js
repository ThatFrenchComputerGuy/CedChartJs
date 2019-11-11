import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';

class XLabels extends Component {
  dateFormat = item => {
    let date;
    switch (this.props.period.toLowerCase()) {
      case '1d':
        date = item.toString().substr(16, 5);
        break;
      case '1w':
        date = item.toDateString().substr(0, 3);
        break;
      default:
        date = item.getMonth() + '/' + item.getDate();
        break;
    }
    return date;
  };

  render() {
    return (
        <React.Fragment>
          {this.props.dateArr.map((item, idx) =>
              idx % this.props.scaleY === 0 ? (
                  <View key={idx}>
                    <Text
                        style={
                          Number(Math.round(Dimensions.get('window').width) * 0.9) < 330
                              ? styles.smallScreen
                              : styles.bigScreen
                        }>
                      {this.dateFormat(item)}
                    </Text>
                  </View>
              ) : (
                  <View key={idx} style={{width: 0}} />
              ),
          )}
        </React.Fragment>
    );
  }
}

XLabels.propTypes = {
  dateArr: PropTypes.array.isRequired,
  scaleY: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  bigScreen: {
    fontSize: 10,
    marginLeft: 0,
  },
  smallScreen: {
    fontSize: 8,
    marginLeft: 0,
  },
});
export default XLabels;
