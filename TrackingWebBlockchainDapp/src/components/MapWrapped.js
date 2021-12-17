import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 37.27259,
  lng: 9.87191,
};
/*
const position = {
  lat: 37.27259,
  lng: 9.8712,
};
const position1 = {
  lat: 37.20259,
  lng: 9.21191,
};
const position2 = {
  lat: 37.25259,
  lng: 9.42191,
};
const position3 = {
  lat: 37.1122,
  lng: 9.4212,
};*/
const position3 = {
  lat: 37.20743442057966,
  lng: 9.666982773826687,
  date: "12:12:26 11/12/21",
  idPackage: 256,
};
const position4 = {
  lat: 37.15792557011335,
  lng: 9.29482090294704,
  date: "11:12:26 12/12/21",
  idPackage: 256,
};
const positions = [position3, position4]; //position3,position4
const onLoad = (marker) => {
  console.log("marker: ", marker);
};

function MapWrapped(props) {
  const [selectedPakcet, setSelectedPacket] = useState(null);
  const [markersArray, setMarkersArray] = useState(null);
  useEffect(() => {
    let markersArray = props.pos;
    setMarkersArray(markersArray);
    console.log(markersArray);
  }, [props.pos, markersArray]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBgvsWJ1tMw8RP_reF0vGFaekMjJmsW96Y">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* {(console.log("final array ="), console.log(props.pos))} */}
        {props.pos
          ? props.pos.map((key) => (
              <Marker
                icon={{
                  url: require("../packet.png"),
                  size: { width: 130, height: 130 },
                  anchor: { x: 5, y: 5 },
                  scaledSize: { width: 20, height: 20 },
                }}
                onLoad={onLoad}
                position={{
                  lat: key["lat"],
                  lng: key["lng"],
                }}
                onClick={() => {
                  setSelectedPacket(key);
                }}
              />
            ))
          : positions.map((key) => (
              <Marker
                icon={{
                  url: require("../packet.png"),
                  size: { width: 120, height: 120 },
                  anchor: { x: 10, y: 45 },
                  scaledSize: { width: 30, height: 30 },
                }}
                onLoad={(onLoad, console.log(props.kaka))}
                position={{ lat: key["lat"], lng: key["lng"] }}
                onClick={() => {
                  setSelectedPacket(key);
                }}
              />
            ))}

        {selectedPakcet && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedPacket(null);
            }}
            position={{
              lat: selectedPakcet["lat"],
              lng: selectedPakcet["lng"],
            }}
          >
            <div>
              <h3>Package number {selectedPakcet["idPackage"]}</h3>
              <p>you package was here at {selectedPakcet["date"]}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapWrapped);
