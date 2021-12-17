import React, { Component } from "react";
import { Platform, Text, View, StyleSheet, Button } from "react-native";
import ServiceScanData from "../services/ServicesScanData";

class TrackingDataComponent extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      //Tracked Data vars
      arrayDBScannedData: [], //Tracked Data from the BD
    };
  }

  async initDataComponent() {
    await ServiceScanData.getAllTrackedData()
      .then((res) => {
        console.log(res);
        let arrayDBScannedData = res.data;

        this.setState({ arrayDBScannedData });
      })
      .catch((error) => {
        console.log(
          "There is a problem with the fetch operation: " + error.message
        );
        throw error;
      });
  }

  componentDidMount() {
    this.initDataComponent();
    console.log(this.state.arrayDBScannedData);
  }

  render() {
    return (
      <View>
        <Text>Some Text</Text>
      </View>
    );
  }
}

export default TrackingDataComponent;
