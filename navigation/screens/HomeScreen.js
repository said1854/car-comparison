import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import product from "../../assets/bentley.json";
import CarCard from "../../components/CarCard";
import Button from "../../components/Button";
import { DatabaseConnection } from "../../database/database_connection";

const db = DatabaseConnection.getConnection();

const HomeScreen = () => {
  const [create, setCreate] = React.useState(false);
  const [cars, setCars] = React.useState();
  const [car_id, setCar_id] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [year, setYear] = React.useState("");
  const [km, setKm] = React.useState("");
  const [color, setColor] = React.useState("");
  const [price, setPrice] = React.useState("");

  React.useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='car_table'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS car_table", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS car_table(car_id INTEGER PRIMARY KEY, title VARCHAR(25), year INT(4), km VARCHAR(15), color VARCHAR(15), price VARCHAR(25))",
              []
            );
          }
        }
      );
    });
  }, []);

  const cancelCreate = () => {
    setCreate(false);
  };
  const saveCreate = () => {
    setCreate(false);
  };

  const createCar = () => {
    console.log(create);
    setCreate(true);
    console.log(create);
    console.log("Create Car");
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCars(product);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView>
      {create ? (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={(car_id) => setCar_id(car_id)}
            placeholder="Enter car id"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={(title) => setTitle(title)}
            placeholder="Enter car title"
          />
          <TextInput
            style={styles.input}
            onChangeText={(year) => setYear(year)}
            placeholder="Enter car year"
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
          <View style={styles.buttonContainer}>
            <Button title="Cancel" handlePress={cancelCreate} />
            <Button title="Save" handlePress={saveCreate} />
          </View>
        </View>
      ) : (
        <Button title="Create Car" handlePress={createCar} />
      )}
      {cars ? (
        cars.map((car, index) => <CarCard key={index} car={car} />)
      ) : (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="#0000ff"
        />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  carCard: {
    color: "#a10a0a",
    border: "1px black solid",
  },
  loading: {
    margin: "20px",
  },
  container: {
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
    margin: 6,
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer: {
    fontSize: 14,
    color: "#888",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default HomeScreen;
