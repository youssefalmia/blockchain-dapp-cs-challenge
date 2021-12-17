import React, { useState, useEffect, Component } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { BarCodeScanner } from "expo-barcode-scanner";
import ServiceScanData from "./services/ServicesScanData.js";

export default function App() {
  const [location, setLocation] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [timeStamp, setTimeStamp] = useState(null);
  const [validated, setValidated] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("Not yet scanned");
  const styles = StyleSheet.create({
    button2: {
      zIndex: 0.5,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: "blue",
      width: 300,
      height: 50,
    },
    button: {
      zIndex: 0.5,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: "red",
      width: 300,
      height: 50,
      marginVertical: 5,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: 20,
    },
    paragraph: {
      fontSize: 18,
      textAlign: "center",
    },
    barcodebox: {
      alignItems: "center",
      justifyContent: "center",
      height: 300,
      width: 300,
      overflow: "hidden",
      borderRadius: 30,
      backgroundColor: "tomato",
      padding: 5,
    },
    image: {
      alignItems: "center",
      justifyContent: "center",
      height: 300,
      width: 300,
      overflow: "hidden",
      borderRadius: 30,
      //backgroundColor: "tomato",
      resizeMode: "stretch",
    },
    maintext: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "black",
    },
  });
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };
  const [loading, setLoading] = useState(false);
  async function sendData(trackedData1) {
    setLoading(true),
      async () => {
        await ServiceScanData.addTrackedData(trackedData1)
          .then((res) => setLoading(false))
          .catch((error) => {
            console.log(
              "There is a problem with sending data: " + error.message
            );
            throw error;
          });
      };
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      let longitude = location.coords.longitude;
      let latitude = location.coords.latitude;
      let timeStamp = location.timestamp;
      let validated = false;
      setLocation(location);
      setLatitude(latitude);
      setLongitude(longitude);
      setTimeStamp(timeStamp);
      setValidated(validated);

      askForCameraPermission();
    })();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setData(data);
    console.log("Type: " + type + "\nData: " + data);
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for permissions</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // Create a new JavaScript Date object based on the timestamp
  var date = new Date(timeStamp);
  // get local time
  var scanTime = date.toLocaleTimeString();
  // get local date
  var scanDate = date.toLocaleDateString();

  // Will display time in 10:30:23 format and date int 06/11/21 format
  var formattedTime = scanTime + " " + scanDate;

  console.log(formattedTime);

  const trackedData = {
    longitude: longitude,
    latitude: latitude,
    date: formattedTime,
    idPackage: data,
    validated: validated,
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.paragraph}>
        longitude :{JSON.stringify(longitude)}
        {"\n"}
        latitude :{JSON.stringify(latitude)}
        {"\n"}
        Date :{JSON.stringify(formattedTime)}
        {"\n"}
        Validated :{JSON.stringify(validated)}
        {"\n"}
      </Text> */}

      {scanned ? (
        <>
          <Image
            style={styles.image}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Checkmark_green.svg/1200px-Checkmark_green.svg.png",
            }}
          />

          <Button
            title="Scan again"
            style={styles.button}
            onPress={() => {
              setScanned(false);
            }}
            color="tomato"
          >
            {/* <Text style={styles.text}>Scan again?</Text> */}
          </Button>
        </>
      ) : (
        <>
          <View style={styles.barcodebox}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: 400, width: 400 }}
            />
          </View>
          {/* <View
            style={{
              height: 50,
              marginVertical: 5,
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Text style={styles.maintext}>{data}</Text>
          </View> */}
        </>
      )}

      <Button
        title="Validate Transaction"
        style={scanned == true ? styles.button2 : styles.button}
        // disabled={data === "Not yet scanned"}
        //disabled={loading || data === "Not yet scanned"} //Dont Remove (7ot and m3a eli 9balha ^)
        onPress={() => {
          console.log("pressed");
          console.log(trackedData);
          ServiceScanData.addTrackedData(trackedData)
            .then(() => {
              console.log("data sent");
            })
            .catch((err) => {
              console.log("error");
            });
          //setScanned(true); //Remove Me
        }}
      >
        {/* {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.text}>Validate Transaction</Text>
        )} */}
      </Button>
    </View>
  );
}
