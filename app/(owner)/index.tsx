import { StyleSheet, Text, View } from "react-native";

export default function OwnerHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Owner Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
});
