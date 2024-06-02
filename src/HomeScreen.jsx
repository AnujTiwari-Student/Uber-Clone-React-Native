import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import NavOptions from "./components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../Slices/navSlice";
import NavFavourites from "./components/NavFavourites";
const GOOGLE_MAPS_APIKEY = "Your_Api_Key";

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView className="mt-5 ml-1 bg-white h-full">
      <View className="p-5">
        <Image
          style={{
            height: 100,
            width: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="Enter Current Location"
          styles={{
            container: {
              flex: 0,
              zIndex: 1,
              width:317,
            },
            textInput: {
              fontSize: 18,
              height: 44,
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 5,
              paddingLeft: 10,
              backgroundColor: "#fff",
            },
            row: {
              padding: 13,
              height: 45,
              flexDirection: "row",
            },
            separator: {
              height: 0.5,
              backgroundColor: "#c8c7cc",
            },
            description: {
              fontSize: 16,
            },
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          enablePoweredByContainer={false}
          minLength={2}
          getDefaultValue={() => ""}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={200}
          fetchDetails={true}
        />

        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
