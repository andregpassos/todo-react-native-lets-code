import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EditScreen from "./screens/EditScreen";
import ListScreen from "./screens/ListScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
          options={{ title: "TODO LIST" }}
        />
        <Stack.Screen
          name="EditScreen"
          component={EditScreen}
          options={{ title: "EDIT" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
