"use client";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "50%",
};

const GoogleMap = () => {
  return (
    //The <Map></Map> need the following props
    //initialCenter={} will be the center on the Map
    <Map
      google={window.google}
      zoom={17}
      style={mapStyles}
      initialCenter={{
        lat: 19.020145856138136,
        lng: -98.24006775697993,
      }}
    >
      {/* //The Maker Component have a prop positio={}
      //in which you decide the position of it */}
      <Marker
        position={{
          lat: 19.020145856138136,
          lng: -98.24006775697993,
        }}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCxoTRE-tMeV3sn-tXw0NUQsg7b8KS6mWQ",
})(GoogleMap);
