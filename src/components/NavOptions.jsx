import { View, Text, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../../Slices/navSlice";

const data = [
  {
    id: "123",
    title: "Get a Ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order Food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen",
  },
];

const NavOptions = () => {

  const origin = useSelector(selectOrigin);
  const navigation = useNavigation();

  const handlePress = (screen) => {
    if (!origin) {
      Alert.alert("No Origin Selected", "Please select an origin to proceed.");
      return;
    }
    navigation.navigate(screen);
  };

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handlePress(item.screen)}
          // onPress={() => navigation.navigate(item.screen)}
          className="p-2 pt-4 pb-8 bg-gray-200 m-2 w-40"
        >
          <View>
            <Image
              style={{ height: 120, width: 120, resizeMode: "contain" }}
              source={{
                uri: item.image,
              }}
            />
            <Text className="pl-2 mt-2 text-lg font-semibold">
              {item.title}
            </Text>
            <Icon
              // className="p-2 bg-black rounded-full w-10 mt-4"
              style={{
                padding: 7,
                backgroundColor: "black",
                width: 40,
                height: 40,
                marginTop: 8,
                borderRadius: 40,
              }}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
