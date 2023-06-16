import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// screens
import HomeScreen from "./screens/HomeScreen";
import ComparisonScreen from "./screens/ComparisonScreen";
import LoginScreen from "./screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";

// Screen names
const homeName = "Home";
const loginName = "Account";
const comparisonName = "Compare";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// const MainContainer = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={homeName}>
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name={loginName}
//           component={LoginScreen}
//         />
//         <Stack.Screen
//           name="SubContainer"
//           component={SubContainer}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

const MainContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === comparisonName) {
              iconName = focused ? "git-compare" : "git-compare-outline";
            } else if (route.name === loginName) {
              iconName = focused ? "log-in" : "log-in-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={comparisonName} component={ComparisonScreen} />
        <Tab.Screen name={loginName} component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
