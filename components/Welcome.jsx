import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React from "react";

const Welcome = (props) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Account!</Text>
      <Text>name:{props.name}</Text>
      <Text>surname:{props.surname}</Text>
      <Text>email:{props.email}</Text>
      <Text>age:{props.age}</Text>
      <TouchableOpacity>
        <Button title="Logout" onPress={props.logout} />
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: "col",
    alignItems: "flex-start",
  },
});
