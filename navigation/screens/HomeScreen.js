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

const db = DatabaseConnection.getConnection();


const HomeScreen = () => {
  const [create, setCreate] = React.useState(false);
  const [cars, setCars] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [car_id, setCar_id] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [year, setYear] = React.useState("");
  const [km, setKm] = React.useState("");
  const [color, setColor] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCars(product);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists car_table (carId INTEGER PRIMARY KEY, title VARCHAR(25), year INT(4), km VARCHAR(15), color VARCHAR(15), price VARCHAR(25), url VARCHAR(50));",
      [
        1077076813,
        "GRAND BAY",
        2012,
        "62.809",
        "gri",
        "6.100.000 TL",
        "https://i0.shbdn.com/photos/07/68/13/lthmb_10770768136is.jpg",
      ]
    );
    tx.executeSql(
      "select * from car_table",
      [],
      (_, { rows: { _array } }) =>
        setTimeout(() => {
          console.log(_array);
        }, 5000),
      () => console.log("error fetching")
    );
  });
  const cancelCreate = () => {
    setCreate(false);
  };
  const saveCreate = () => {
    if (!car_id || !title || !km || !year || !color || !price || !url) {
      alert("Fill all the fields");
    } else {
      console.log("success");
      console.log(car_id, title, km, year, color, price, url);
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
