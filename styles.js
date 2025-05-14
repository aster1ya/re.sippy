import { StyleSheet } from "react-native";

//man, removing duplicate entries is gonna take ages

const styles = StyleSheet.create({

    //from create.tsx
  container: {
    backgroundColor: "lightsalmon",
    borderColor: "lightsalmon",
    borderRadius: 10,
    borderWidth: 2.5,
    flex: 1,
    margin: 10,
    padding: 10,
  },
  subContainer: {
    backgroundColor: "whitesmoke",
    borderColor: "whitesmoke",
    borderRadius: 5,
    borderWidth: 5,
    padding: 10,
  },
  title: {
    flex: 1,
    flexDirection: "row",
    fontSize: 30,
    paddingBottom: 20,
    textAlign: "center",
  },
  h1: {
    fontSize: 26,
    paddingBottom: 10,
    textAlign: "center",
  },
  infoGrid: {
    alignItems: "flex-start",
    flex: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 18,
    margin: 10,
  },
  infoSection: {
    alignItems: "center",
    padding: 5,
    width: "50%",
  },
  infoLabel: {
    fontWeight: "bold",
  },
  infoField: {
    marginTop: -10,
  },

});

export default styles;