import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../../Slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
const GOOGLE_MAPS_APIKEY = "Your_Api_Key";

const Maps = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    //Use when component is re-render
    useEffect(()=>{
      if (!origin || !destination) return;
      //Zoom and fit to marker
      mapRef.current.fitToSuppliedMarkers(["origin","destination"],{
        edgePadding:{top:50 , right:50 , left:50 , bottom:50},
        animated: true,
      })
    },[origin,destination])//Re-render the component when only origin and destination is changed

    useEffect(() => {
      if (!origin || !destination) return;
      const getTravelTime = async () => {
        fetch(
          `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(
              "Distance:",
              JSON.stringify(data.rows[0].elements[0].distance)
            );
            dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
          });
      };
      getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_APIKEY]); 

  return (
    <MapView
    ref={mapRef}
      className="flex-1"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor='black'
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          identifier="origin"
          description={origin.description}
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          identifier="destination"
          description={destination.description}
        />
      )}
    </MapView>
  );
}


export default Maps