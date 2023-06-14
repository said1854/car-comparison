import * as React from "react";
import { Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import product from "../../assets/bentley.json";
import CompareCard from "../../components/CompareCard";

const ComparisonScreen = () => {
  return (
    <ScrollView>
      {product.map((car, index) => (
        <CompareCard key={index} car={car} />
      ))}
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
});

export default ComparisonScreen;
