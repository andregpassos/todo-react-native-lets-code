import { StyleSheet } from "react-native";

export const stylesGlobal = StyleSheet.create({
  container: {
    backgroundColor: "lavender",
    padding: 10,
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "dodgerblue",
  },
  titleHeader :{
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
  },
  arrowLeft:{
    fontSize: 24,
    fontWeight: '900',
    color: 'dodgerblue',
    backgroundColor: 'lavender',
    marginRight: 20,
  },
  addNewTaskView: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 15,
    alignItems: "center",
  },
  input: {
    flex: 1,
    justifyContent: "flex-end",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "white",
    height: 35,
    color: "black",
    width: 20,
    fontSize: 20,
    margin: 0,
    padding: 5,
  },
  textInputTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginRight: 10,
    color: "black",
  },
  addBtn: {
    height: 45,
    width: "100%",
    borderRadius: 5,
    padding: 10,
  },
  cancelBtn :{
    height: 45,
    width: '100%',
    borderRadius: 5,
    padding: 10,
    marginTop:20,
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  listTitleView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskListTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "dodgerblue",
  },
  btnClear: {
    width: "20%",
    height: "75%",
    borderRadius: 20,
  },
  inputFilterView: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 30,
    alignItems: "center",
  },
  inputFilter: {
    height: "100%",
    width: "100%",
  },
  taskItem: {
    fontSize: 24,
    fontWeight: "500",
    color: "black",
  },
  lineItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems:'center',
  },
  trash: {
    backgroundColor: "lavender",
    color: "red",
    marginLeft: 15,
  },
  edit: {
    backgroundColor: 'lavender',
    color: 'blue',
  },
  tools: {
    display: 'flex',
    flexDirection: 'row',
  },
});
