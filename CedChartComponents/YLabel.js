import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class YLabel extends Component {
  generateYLabelsValues = () => {
    let maxVal = Math.max(...this.props.unitGet);
    let yLabels = [String(parseInt(maxVal))];
    for (let i = 0.9; i > 0.1; i -= 0.1) {
      maxVal * i < 10
        ? yLabels.push('0' + parseInt(maxVal * i, 10))
        : yLabels.push(parseInt(maxVal * i, 10));
    }
    yLabels.push('00');
    return yLabels;
  };

  render() {
    return (
      <React.Fragment>
        <Text style={{fontSize: 9, marginTop:-19, marginRight:-30}}>{this.props.dataType}</Text>
        {/*The style applied on Rows renders a homogeneous display for y labels depending on
             whether it's a 2 or 3 digit number*/}
        {this.generateYLabelsValues().map((item, idx) => (
          <View
            key={idx}
            style={
              item < 100 ? styles.yLabelDoubleValue : styles.yLabelTripleValue
            }>
            <Text style={[{fontSize: 10},idx === 0 ? {paddingBottom: 1, marginTop:-4} : {paddingTop:-4}]}>{item}</Text>
          </View>
        ))}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  yLabelTripleValue: {
    marginLeft: 2.5,
  },
  yLabelDoubleValue: {
    marginLeft: 7,
  },
  text: {
    fontSize: 10,
  },
});
export default YLabel;
