import React, { useState } from "react";
import { View, Image, Text, StyleSheet, Button } from "react-native";
import product from "../assets/bentley.json";
import DatabaseConnection from "../database/databaseConnection";
const db = DatabaseConnection.getConnection();

const CarCard = ({ car, props }) => {
  const [data, setData] = useState(product); // Store the JSON data in state

  const deleteCar = () => {
    console.log(car.carId);
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM car_table WHERE carId = ?;",
        [car.carId],
        (_, result) => {
          // Handle successful deletion
          console.log("Row deleted successfully.");
        },
        (_, error) => {
          // Handle error
          console.log("Error deleting row:", error);
        }
      );
    });
  };

  return (
    <View style={styles.container} nativeID={car.id}>
      <Image source={{ uri: car.url }} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{car.title}</Text>
        <Text style={styles.description}>price: {car.price}</Text>
        <Text style={styles.description}>km: {car.km}</Text>
        <Text style={styles.description}>year: {car.year}</Text>
        <Text style={styles.description}>color: {car.color}</Text>
        <Text style={styles.description} id="productId">
          id: {car.carId}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Edit"
            onPress={() => console.log("Edit car")}
            style={styles.myButton}
          />
          <Button
            title="Delete"
            onPress={(event) => deleteCar(event)}
            color="#B31312"
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
