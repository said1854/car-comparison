import * as React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import product from "../../assets/bentley.json";
import CarCard from "../../src/components/CarCard";

const HomeScreen = () => {
  const [cars, setCars] = React.useState();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCars(product);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <ScrollView>
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
});

export default HomeScreen;
