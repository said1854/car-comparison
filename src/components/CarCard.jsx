import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const CarCard = ({ car }) => {
  return (
    <View style={styles.container}>
      <Image source={car.url} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{car.title}</Text>
        <Text style={styles.description}>{car.km}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 8,
    margin: 10,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#888",
  },
});

export default CarCard;
