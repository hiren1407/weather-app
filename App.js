import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen'
import SearchScreen from './src/screens/SearchScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const navigator=createBottomTabNavigator({
  Home:HomeScreen,
  Search:SearchScreen


},

{
  initialRouteName: 'Home',
  initialRouteParams: { city: 'london' },
  
  defaultNavigationOptions:({navigation})=>({
  tabBarIcon:({color})=>{
    let iconName;
    const { routeName } = navigation.state;
    if(routeName==="Home"){
      iconName = 'home-city-outline'
    }else if(routeName==="Search"){
      iconName = "city"
    }
    return <MaterialCommunityIcons name={iconName} size={25} color={color} />
  }
}),
  tabBarOptions: 
    {
      activeTintColor:"white",
      inactiveTintColor:"gray",
      activeBackgroundColor:"darkblue",
      inactiveBackgroundColor:"darkblue"
    }
  
})
const Nav=createAppContainer(navigator)
export default function App() {
  return (
    <>
      
      <StatusBar barStyle="dark-content" backgroundColor="#353ca1"/>
      <Nav/>
    </>
  );
}

const styles = StyleSheet.create({
  
});
