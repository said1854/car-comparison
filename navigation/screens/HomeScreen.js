import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
  RefreshControl,
} from "react-native";
import product from "../../assets/bentley.json";
import CarCard from "../../components/CarCard";
import Button from "../../components/Button";
import DatabaseConnection from "../../database/databaseConnection";
import insertObjects from "../../database/inserData";
const db = DatabaseConnection.getConnection();

const HomeScreen = () => {
  const [create, setCreate] = React.useState(false);
  const [cars, setCars] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [carId, setCarId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [year, setYear] = React.useState("");
  const [km, setKm] = React.useState("");
  const [color, setColor] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM car_table",
        [],
        (_, result) => {
          const carArray = Array.from(result.rows).map((row) => ({ ...row }));
          setCars((prevCars) => [...prevCars, ...carArray]);
        },
        (_, error) => {
          console.log("Error getting table:", error);
        }
      );
    });
  }, []);
  React.useEffect(() => {
    const timer = setTimeout(() => console.log(cars), 10000);
  }, []);

  // insertObjects(product);
  // React.useEffect(() => {
  //   db.transaction(function (txn) {
  //     txn.executeSql(
  //       "SELECT name FROM sqlite_master WHERE type='table' AND name='car_table'",
  //       [],
  //       function (txn, res) {
  //         console.log("item:", res.rows);
  //         // if (res.rows.length == 0) {
  //         //   // txn.executeSql("DROP TABLE IF EXISTS car_table", []);
  //         //   txn.executeSql(
  //         //     "CREATE TABLE IF NOT EXISTS car_table(car_id INTEGER PRIMARY KEY, title VARCHAR(25), year INT(4), km VARCHAR(15), color VARCHAR(15), price VARCHAR(25), url VARCHAR(50))",
  //         //     [car_id, title, year, km, color, price, url]
  //         //   );
  //         // }
  //       }
  //     );
  //   });
  // }, []);

  const cancelCreate = () => {
    setCreate(false);
  };
  const saveCreate = () => {
    if (!carId || !title || !km || !year || !color || !price || !url) {
      alert("Fill all the fields");
    } else {
      console.log("success");
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO car_table (carId, title, year, km, color, price, url) VALUES (?, ?, ?, ?, ?, ?, ?);",
          [carId, title, year, km, color, price, url]
        );
      });
      console.log(carId, title, km, year, color, price, url);
      setCreate(false);
    }
  };

  const createCar = () => {
    setCreate(true);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log("refreshing");
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {create ? (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={(carId) => setCarId(carId)}
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
    margin: 20,
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
    margin: 5,
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
