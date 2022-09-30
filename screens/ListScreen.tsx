import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { stylesGlobal } from "../styles/stylesGlobal";

import { Colors } from "react-native/Libraries/NewAppScreen";

import Icon from "react-native-vector-icons/FontAwesome";
import { _clearData, _retrieveData, _storeData } from "../utils/utils";

interface ITaskItem {
  id: string;
  title: string;
}

export default function App({ navigation }) {
  const [inputAddElement, setInputAddElement] = useState("");
  const [inputFilter, setInputFilter] = useState("");
  const [data, setData] = useState<ITaskItem[]>([]);
  const [filteredData, setFilteredData] = useState<ITaskItem[]>([]);
  const [index, setIndex] = useState(1);

  function filterList() {
    const newData = data.filter((item) => item.title.includes(inputFilter));
    setFilteredData(() => newData);
  }

  const addElement = async () => {
    if (inputAddElement === "") {
      return;
    }

    var newData = [...data, { id: index, title: inputAddElement }];
    //@ts-ignore
    setIndex(() => index + 1);
    //@ts-ignore
    _storeData("@data", newData);
    const asyncData = await _retrieveData("@data");
    setData(() => asyncData);
    setFilteredData(() => asyncData);

    setInputAddElement(() => "");
  };

  const renderItem = (item: { item: ITaskItem }) => (
    <View style={stylesGlobal.lineItem}>
      <Text style={stylesGlobal.taskItem}>{item.item.title}</Text>
      <View style={stylesGlobal.tools}>
        <Pressable onPress={() => navigation.navigate("EditScreen", item.item)}>
          <Icon name="edit" size={24} style={stylesGlobal.edit} />
        </Pressable>
        <Pressable onPress={() => deleteElement(item.item.id)}>
          <Icon name="trash" size={24} style={stylesGlobal.trash} />
        </Pressable>
      </View>
    </View>
  );

  const deleteElement = (id: string) => {
    const newData = data.filter((item) => item.id !== id);
    setData(() => newData);
    setFilteredData(() => newData);
    setInputFilter(() => "");
    _storeData("@data", newData);
  };

  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      _retrieveData("@data")
        .then((data) => {
          if (data === null) {
            setData(() => []);
            setFilteredData(() => []);
          } else {
            setData(() => data);
            setFilteredData(() => data);
            setIndex(() => data[data.length - 1].id + 1);
          }
        })
        .catch((e) =>
          console.error("Erro ao buscar dados do AsyncStorage: ", e)
        );
    });

    return willFocusSubscription;
  }, []);

  useEffect(() => {
    inputFilter === "" ? setFilteredData(() => data) : filterList();
  }, [inputFilter]);

  return (
    <SafeAreaView style={stylesGlobal.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.lighter} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={stylesGlobal.container}>
          <View>
            <Text style={stylesGlobal.title}>TODO LIST</Text>
          </View>
          <View style={stylesGlobal.addNewTaskView}>
            <TextInput
              placeholder="Nova tarefa..."
              style={stylesGlobal.input}
              onChangeText={setInputAddElement}
              value={inputAddElement}
            />
          </View>
          <Pressable
            style={({ pressed }) => [
              { backgroundColor: pressed ? "mediumblue" : "dodgerblue" },
              stylesGlobal.addBtn,
            ]}
            onPress={() => addElement()}
          >
            <Text style={stylesGlobal.btnText}>ADICIONAR</Text>
          </Pressable>
          <View style={{ marginTop: "10%" }}>
            <View style={stylesGlobal.listTitleView}>
              <Text style={stylesGlobal.taskListTitle}>Lista de Tarefas</Text>
              <Pressable
                style={({ pressed }) => [
                  { backgroundColor: pressed ? "darkred" : "red" },
                  stylesGlobal.btnClear,
                ]}
                onPress={() => {
                  setData(() => []);
                  setFilteredData(() => []);
                  setInputFilter(() => "");
                  _clearData();
                }}
              >
                <Text style={stylesGlobal.btnText}>Limpar</Text>
              </Pressable>
            </View>
            <View style={stylesGlobal.inputFilterView}>
              <TextInput
                placeholder="Filtrar..."
                style={stylesGlobal.input}
                onChangeText={setInputFilter}
                value={inputFilter}
              />
            </View>
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
