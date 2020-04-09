import React from 'react';
import { Image } from 'react-native';
import { Block, Text, Button } from "expo-ui-kit";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";

//import the screens
import Dashboard from './screens/Dashboard';
import Messages from './screens/Messages';
import Contact from './screens/Contact';

//create stacks for each screen
//add header button to show drawer
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Screens = ({ navigation }) => {
  return (
    <Stack.Navigator 
    screenOptions={{
      headerTransparent: true,
      headerTitle: null,
      headerLeft: () => (
        <Button 
          primary
          padding
          marginHorizontal
          onPress={() => navigation.openDrawer()}
        >
          <Text white small>Menu</Text>
        </Button>
      )
    }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  )
}

//create custom drawer and style it
const DrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <Block flex={0.4} margin={20} bottom>
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
          <Text title>React UI Kit</Text>
          <Text size={9}>contact@react-ui-kit.com</Text>
        </Block>
        {/**add icons to items */}
        <DrawerItem
          label="Dashboard"
          onPress={() => props.navigation.navigate("Dashboard")}
        />
        <DrawerItem
          label="Messages"
          onPress={() => props.navigation.navigate("Messages")}
        />
        <DrawerItem
          label="Contact"
          onPress={() => props.navigation.navigate("Contact")}
        />
      </Block>
    </DrawerContentScrollView>
  )
}

export default () => {
  return (
    <Drawer.Navigator 
      initialRouteName="Home" 
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Screens" component={Screens} />
    </Drawer.Navigator>
  )
};
