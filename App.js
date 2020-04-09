import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from "expo-ui-kit";
import { NavigationContainer } from "@react-navigation/native";

import Drawer from './Drawer';

export default function App() {
  return (
    <NavigationContainer>
      {/* <Block middle center>
        <Text>We're building Drawer Menu using</Text>
        <Text bold>react-navigation v5</Text>
      </Block> */}
      <Drawer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
