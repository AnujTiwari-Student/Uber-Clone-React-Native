import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Maps from './components/Maps';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from './components/NavigateCard';
import RideOptionsCard from './components/RideOptionsCard';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen';

const MapScreen = () => {

  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity 
      onPress={()=>navigation.navigate(HomeScreen)}
      className="absolute top-12 left-6 z-50 bg-gray-300 p-3 rounded-full shadow-lg">
        <Icon name="menu" />
      </TouchableOpacity>
      <View className="h-1/2">
        <Maps />
      </View>
      <View className="h-1/2">
        <Stack.Navigator>
          <Stack.Screen
            name='NavigateCard'
            component={NavigateCard}
            options={{
              headerShown:false,
            }}
          />
          <Stack.Screen
            name='RideOptionsCard'
            component={RideOptionsCard}
            options={{
              headerShown:false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen;