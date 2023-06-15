import * as React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.handlePress}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#D14D72",
    color: "#ffffff",
    padding: 10,
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  text: {
    color: "#ffffff",
  },
});

export default Button;
