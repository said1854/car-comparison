import React from "react";
import { View, Image, Text, StyleSheet, Button } from "react-native";
import product from "../assets/bentley.json";
import DatabaseConnection from "../database/databaseConnection";
import { TextInput } from "react-native";
const db = DatabaseConnection.getConnection();

const CarCard = ({ car, props }) => {
  const [data, setData] = React.useState(product); // Store the JSON data in state
  const [edit, setEdit] = React.useState(false);
  const [carId, setCarId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [year, setYear] = React.useState("");
  const [km, setKm] = React.useState("");
  const [color, setColor] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [url, setUrl] = React.useState("");

  const refresh = () => window.location.reload(true);
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
    refresh();
  };
  const updateCar = () => {
    console.log(car.carId);
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE car_table SET title = ?, year = ?, km = ?, color = ?, price = ?, url = ? WHERE carId = ?;",
        [title, year, km, color, price, url, car.carId],
        (_, result) => {
          // Handle successful
          console.log("Row UPDATED successfully.");
          console.log(title, year, km, color, price, url, car.carId);
        },
        (_, error) => {
          // Handle error
          console.log("Error updating row:", error);
        }
      );
    });
    // refresh();
  };

  return (
    <View style={styles.container} nativeID={car.id}>
      {edit ? (
        <View style={styles.containerY}>
          <Text style={styles.title}>{car.title}</Text>
          <TextInput
            style={styles.input}
            onChangeText={(title) => setTitle(title)}
            placeholder="Enter car title"
          />
          <TextInput
            style={styles.input}
            onChangeText={(year) => setYear(year)}
            placeholder="Enter car year"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={(price) => setPrice(price)}
            placeholder="Enter car price"
          />
          <TextInput
            style={styles.input}
            onChangeText={(km) => setKm(km)}
            placeholder="Enter car km"
          />
          <TextInput
            style={styles.input}
            onChangeText={(color) => setColor(color)}
            placeholder="Enter car color"
          />
          <TextInput
            style={styles.input}
            onChangeText={(url) => setUrl(url)}
            placeholder="Enter image url"
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => setEdit(false)} />
            <Button title="Save" onPress={updateCar} color="#4BB543" />
          </View>
        </View>
      ) : (
        <>
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
                onPress={() => setEdit(true)}
                style={styles.myButton}
              />
              <Button title="Delete" onPress={deleteCar} color="#B31312" />
            </View>
          </View>
        </>
      )}
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
  containerY: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
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
