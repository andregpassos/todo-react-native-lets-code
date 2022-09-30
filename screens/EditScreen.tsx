import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { stylesGlobal } from "../styles/stylesGlobal";
import { _retrieveData, _storeData } from "../utils/utils";

interface ITaskItem {
  id: string;
  title: string;
}

const Stack = createNativeStackNavigator();

export default function EditScreen({ route, navigation }) {
  const { id, title } = route.params;

  const [inputText, setInputText] = useState(title);

  const [data, setData] = useState<ITaskItem[]>([]);

  const asyncDataId = _retrieveData("@data")
    .then((data) => (data === null ? 1 : Number(data.id)))
    .catch((e) => console.error("Erro ao buscar dados do AsyncStorage: ", e));

  const [index, setIndex] = useState(asyncDataId);

  const addElement = async () => {
    if (inputText === "") {
      return;
    }

    let newData = data;
    const editedItem = newData.find((e) => e.id === id);
    let indexOfEditedItem = newData.indexOf(editedItem!);
    newData[indexOfEditedItem].title = inputText;

    _storeData("@data", newData);
    const asyncData = await _retrieveData("@data");
    setData(asyncData);

    navigation.goBack();
  };

  useEffect(() => {
    _retrieveData("@data")
      .then((data) => (data === null ? setData([]) : setData(data)))
      .catch((e) => console.error("Erro ao buscar dados do AsyncStorage: ", e));
  }, []);

  return (
    <SafeAreaView style={stylesGlobal.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.lighter} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={stylesGlobal.container}>
          <View style={stylesGlobal.titleHeader}>
            <Pressable onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" style={stylesGlobal.arrowLeft} />
            </Pressable>
            <Text style={stylesGlobal.title}>EDIT TASK</Text>
          </View>
          <View style={stylesGlobal.addNewTaskView}>
            <TextInput
              placeholder="Nova tarefa..."
              style={stylesGlobal.input}
              onChangeText={setInputText}
              value={inputText}
              autoFocus={true}
            />
          </View>
          <Pressable
            style={({ pressed }) => [
              { backgroundColor: pressed ? "mediumblue" : "dodgerblue" },
              stylesGlobal.addBtn,
            ]}
            onPress={() => addElement()}
          >
            <Text style={stylesGlobal.btnText}>CONCLUIR</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              { backgroundColor: pressed ? "darkred" : "red" },
              stylesGlobal.cancelBtn,
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text style={stylesGlobal.btnText}>CANCELAR</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
