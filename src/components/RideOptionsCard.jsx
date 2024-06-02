import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import NavigateCard from './NavigateCard'
import { Image } from 'react-native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../../Slices/navSlice'

const data =[
    {
        id:"123",
        title: "UberX",
        multiplier:1,
        image:"https://links.papareact.com/3pn"
    },
    {
        id:"Uber-XL-456",
        title: "Uber XL",
        multiplier:1.2,
        image:"https://links.papareact.com/5w8"
    },
    {
        id:"Uber-LUX-789",
        title: "Uber LUX",
        multiplier:1.75,
        image:"https://links.papareact.com/7pf"
    },

]

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected]= useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation)
  return (
    <View className="bg-white flex-1 py-4">
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-5 top-1"
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text className="text-center font-semibold text-lg">
          Select a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { image, multiplier, title, id }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            className={`flex-row justify-between items-center px-7 mt-4
            ${id === selected?.id ? "bg-gray-200" : ""}`}
          >
            <View>
              <Image
                style={{ objectFit: "contain" }}
                source={{
                  uri: image,
                }}
                className="h-20 w-20"
              />
            </View>
            <View className="-ml-6 mt-3">
              <Text className="text-xl font-semibold">{title}</Text>
              <Text>{travelTimeInformation?.duration?.text}</Text>
            </View>
            <Text className="text-xl mt-3">

                {new Intl.NumberFormat('en-IN',{
                    style: 'currency',
                    currency:"INR",
                }).format(
                    (travelTimeInformation?.duration?.value/60 * SURGE_CHARGE_RATE * multiplier)
                )}

            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          disabled={!selected}
          className={`bg-black py-3 m-3 rounded-full ${
            !selected && "bg-gray-300"
          }`}
        >
          <Text className="text-center text-lg font-semibold text-white">
            {selected ? `Choose ${selected.title}` : "Choose a ride first"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RideOptionsCard