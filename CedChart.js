import React, {Component} from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import YLabel from './CedChartComponents/YLabel';
import LineGenerator from './CedChartComponents/LineGenerator';
import XLabels from './CedChartComponents/XLabel';
import DataGatherer from './CedChartComponents/DataGatherer';

class CedChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    DataGatherer.setDataType(this.props.dataType);
    if (this.props.directData) {
      DataGatherer.parseDirectData(this.props.directData);
      this.setState({loading: false});
    } else {
      if (!this.props.period) {
        DataGatherer.axios(this.props.device, this.props.dataType, this.props.url).then(() => {
          this.setState({...this.state, loading: false});
        });
      }
    }
  }

  render() {
    const {loading} = this.state;
    if (!loading) {
      return (
        <React.Fragment>
          <View>
            <View style={styles.yOnSide}>
              <View style={styles.yLabels}>
                <YLabel dataType={this.props.dataType} />
              </View>
              <LineGenerator color={this.props.color} secondColor={this.props.secondColor}/>
            </View>
            <View style={styles.xLabels}>
              <XLabels />
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
