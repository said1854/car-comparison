import * as React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Button,
  Pressable,
} from "react-native";
import product from "../../assets/bentley.json";
import CompareCard from "../../components/CompareCard";
import { TouchableOpacity } from "react-native-web";

const ComparisonScreen = () => {
  const [compareList, setCompareList] = React.useState([]);

  const handleChoice = (id) => {
    console.log("s ", id);
    console.log(compareList);
    setCompareList([...compareList, id]);
  };

  return (
    <ScrollView>
      {product.map((car) => (
        <CompareCard
          key={car.id}
          car={car}
          handleChoice={handleChoice}
          isDisabled={compareList.length === 2 ? true : false}
          color={
            compareList.find((el) => el === car.id)?.length > 0
              ? "red"
              : "green"
          }
        />
      ))}
      {compareList.length === 2 ? (
        <Pressable>
          <Text>go to compare screen</Text>
        </Pressable>
      ) : null}
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
