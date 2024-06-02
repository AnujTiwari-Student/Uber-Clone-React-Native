import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { setDestination } from '../../Slices/navSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import RideOptionsCard from './RideOptionsCard';
import NavFavourites from './NavFavourites';
import { Icon } from '@rneui/base';
const GOOGLE_MAPS_APIKEY = "Your_Api_Key";

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white p-2">
      <Text className="pb-2 text-center text-xl font-bold">Welcome Anuj</Text>
      <View className="border-t border-gray-200 flex-shrink">
        <View className="pl-3 mt-2">
          <GooglePlacesAutocomplete
            placeholder="Enter Destination"
            styles={{
              container: {
                flex: 0,
                zIndex: 1,
                width: 317,
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
            enablePoweredByContainer={false}
            minLength={2}
            getDefaultValue={() => ""}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            onPress={(data, details = null)=>{
                dispatch(setDestination({
                    location:details.geometry.location,
                    description: data.description,
                }))
            navigation.navigate(RideOptionsCard)
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={200}
            fetchDetails={true}
            returnKeyType={"search"}
          />
        </View>
        <NavFavourites />
      </View>
      <View className="flex-row bg-white justify-evenly py-2 mt-auto border-t
      border-gray-200">
        <TouchableOpacity
        onPress={()=>(
            navigation.navigate(RideOptionsCard)
        )}
        className="flex flex-row bg-black w-24 py-3 px-4 rounded-full">
            <Icon name="car" type="font-awesome" color="white" size={16} />
            <Text className="text-white text-center pl-2">Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row justify-between w-24 py-3 px-4 rounded-full">
            <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
            <Text className="text-black text-center">Eats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default NavigateCard