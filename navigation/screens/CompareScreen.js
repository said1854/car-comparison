import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import DatabaseConnection from "../../database/databaseConnection";
import HorizontalCompare from "../../components/HorizontalCompare";

const db = DatabaseConnection.getConnection();

const CompareScreen = (props) => {
  const firstCar = props.route.params.compareList[0];
  const secondCar = props.route.params.compareList[1];
  console.log(firstCar, secondCar);

  const [rowData, setRowData] = React.useState([]);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM car_table WHERE carId IN (?, ?)",
        [firstCar, secondCar],
        (_, result) => {
          const carArray = Array.from(result.rows).map((row) => ({ ...row }));
          console.log(carArray);
          setRowData((prevCars) => [...prevCars, ...carArray]);
        },
        (_, error) => {
          console.log("Error getting table:", error);
        }
      );
    });
  }, []);

  return (
    <>
      <Button
        title="Back to Comparison Screen"
        onPress={() => {
          navigation.navigate("Compare");
        }}
        color="#4BB543"
      />
      <View style={styles.container}>
        {rowData ? (
          rowData.map((car, index) => (
            <HorizontalCompare car={car} key={index} />
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </>
  );
};

export default CompareScreen;

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
});
