import React from "react";
import { View, Image, Text, StyleSheet, Button } from "react-native";
import DatabaseConnection from "../database/databaseConnection";
import { Pressable } from "react-native";
const db = DatabaseConnection.getConnection();

const CarCard = ({ car, handleChoice, isDisabled, color }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: car.url }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{car.title}</Text>
        <Text style={styles.description}>price: {car.price}</Text>
        <Text style={styles.customBlock}>km: {car.km}</Text>
        <Text style={styles.customBlock}>year: {car.year}</Text>
        <Text style={styles.customBlock}>color: {car.color}</Text>
        <Text style={styles.customBlock} id="productId">
          id: {car.id}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Compare"
            onPress={() => handleChoice(car.id)}
            color={color}
            disabled={isDisabled}
          />
        </View>
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
  buttonStyle: {
    backgroundColor: "red",
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
  buttonContainer: {
    fontSize: 14,
    color: "#888",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  customBlock: {
    alignItems: "flex-start",
  },
});

export default CarCard;
