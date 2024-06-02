import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from "@rneui/themed";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Prayagraj , Uttar Pradesh , India",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "Lucknow, Uttar Pradesh , India",
  },
];
const NavFavourites = () => {


  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={()=>(
        <View className="border-b border-gray-200" />
      )}
      renderItem={({item: {location , destination , icon}}) => (
        <TouchableOpacity className="flex-row items-center p-5">
          <Icon
            style={{
              marginRight: 10,
              borderRadius: 50,
              backgroundColor: "rgb(229, 231, 235)",
              padding:10,
            }}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text className="font-semibold text-lg">{location}</Text>
            <Text className="text-gray-500">{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

export default NavFavourites