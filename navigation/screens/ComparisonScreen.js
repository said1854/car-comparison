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
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-web";
import CompareScreen from "./CompareScreen";

const ComparisonScreen = () => {
  const [compareList, setCompareList] = React.useState([]);
  const navigation = useNavigation();

  const handleChoice = (id) => {
    console.log("s ", id);
    setCompareList([...compareList, id]);
    console.log(compareList);
  };

  const handleCompare = () => {
    console.log(compareList);
    navigation.navigate("CompareScreen", { compareList });
  };

  return (
    <ScrollView>
      {compareList.length === 2 ? (
        <Button
          title="Go to compare page"
          onPress={handleCompare}
          color="red"
        />
      ) : null}
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
