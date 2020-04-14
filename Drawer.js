import React, { useState } from 'react';
import { Image } from 'react-native';
import { Block, Text, Button } from "expo-ui-kit";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { Feather, AntDesign } from "@expo/vector-icons";
import Animated from 'react-native-reanimated';
import { LinearGradient } from "expo-linear-gradient";

//import the screens
import Dashboard from './screens/Dashboard';
import Messages from './screens/Messages';
import Contact from './screens/Contact';

//create stacks for each screen
//add header button to show drawer
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Screens = ({ navigation, style }) => {
  return (
    <Animated.View style={[{ flex: 1, overflow: "hidden" }, style]}>
      <Stack.Navigator 
      screenOptions={{
        headerTransparent: true,
        headerTitle: null,
        headerLeft: () => (
          <Button 
            padding
            transparent
            marginHorizontal
            onPress={() => navigation.openDrawer()}
          >
            {/**add nice menu icon */}
            <Feather name="menu" size={18} />
          </Button>
        )
      }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Contact" component={Contact} />
      </Stack.Navigator>
    </Animated.View>
  )
}

//create custom drawer and style it
const DrawerContent = props => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <Block flex={1} margin={20}>
        {/** add avatar */}
        <Block>
          <Image 
            source={{
              uri: "https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png",
              height: 60,
              width: 60
            }}
            resizeMode="center"
            style={{ borderRadius: 50 }}
          />
          <Text white title marginTop="2x">React UI Kit</Text>
          <Text white size={9} marginTop>contact@react-ui-kit.com</Text>
        </Block>
        {/**add icons to items */}
        <Block>
          <DrawerItem
            label="Dashboard"
            labelStyle={{ color: "white", marginLeft: -16 }}
            onPress={() => props.navigation.navigate("Dashboard")}
            icon={() => <AntDesign name="dashboard" size={16} color="white"/>}
          />
          <DrawerItem
            label="Messages"
            labelStyle={{ color: "white", marginLeft: -16 }}
            onPress={() => props.navigation.navigate("Messages")}
            icon={() => <AntDesign name="message1" size={16} color="white"/>}
          />
          <DrawerItem
            label="Contact"
            labelStyle={{ color: "white", marginLeft: -16 }}
            onPress={() => props.navigation.navigate("Contact")}
            icon={() => <AntDesign name="phone" size={16} color="white"/>}
          />
        </Block>
      </Block>
      {/**add logout button */}
      <Block bottom top>
        <DrawerItem
            label="Logout"
            labelStyle={{ color: "white", marginLeft: -16 }}
            onPress={() => alert("Are you sure to logout?")}
            icon={() => <AntDesign name="logout" size={16} color="white"/>}
          />
      </Block>
    </DrawerContentScrollView>
  )
}

export default () => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  //create animation for screen scale
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8]
  });

  //animate the borderRadius of the scene screens
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 10]
  });

  const screensStyles = { borderRadius, transform: [{ scale }] }
  //need to wrap drawer navigator into View
  return (
    <LinearGradient style={{ flex: 1 }} colors={[ "red", "blue" ]}>
      <Drawer.Navigator
        //the drawer -> screen animated should be slide
        drawerType="slide"
        overlayColor="transparent"
        initialRouteName="Dashboard"
        drawerStyle={{ width: "50%", backgroundColor: "transparent" }}
        drawerContentOptions={{
          activeBackgroundColor: "transparent",
          activeTintColor: "green",
          inactiveTintColor: "green"
        }}
        //set the scene background to transparent
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        drawerContent={props => {
          setProgress(props.progress);
          return <DrawerContent {...props} />
        }}
      >
        <Drawer.Screen name="Screens">
          {props => <Screens {...props} style={screensStyles} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
  )
};
