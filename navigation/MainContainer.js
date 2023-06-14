import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//screens
import HomeScreen from "./screens/HomeScreen";
import ComparisonScreen from "./screens/ComparisonScreen";
import LoginScreen from "./screens/LoginScreen";

//Screen names
const homeName = "Home";
const loginName = "Login";
const comparisionName = "Comparison";

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === comparisionName) {
              iconName = focused ? "list" : "list-outline";
            } else if (rn === loginName) {
              iconName = focused ? "log-in" : "log-in-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={comparisionName} component={ComparisonScreen} />
        <Tab.Screen
          options={{ headerShown: false }}
          name={loginName}
          component={LoginScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
