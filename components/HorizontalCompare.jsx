import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const HorizontalCompare = ({ car }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: car.url }} style={styles.image} />
      <Text style={styles.text}>{car.carId}</Text>
      <Text>{car.title}</Text>
      <Text>{car.price}</Text>
      <Text>{car.km}</Text>
      <Text>{car.color}</Text>
      <Text>{car.year}</Text>
    </View>
  );
};

export default HorizontalCompare;

const styles = StyleSheet.create({
  container: {
    width: "50vw",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 8,
    margin: 10,
  },
  text: {
    fontSize: 20,
  },
});
