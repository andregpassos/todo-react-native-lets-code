import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

import { stylesGlobal } from "./styles/stylesGlobal";

import { Colors } from "react-native/Libraries/NewAppScreen";

import Icon from "react-native-vector-icons/FontAwesome";
import { _clearData, _retrieveData, _storeData } from "./utils/utils";

interface ITaskItem {
  id: string;
  title: string;
}

export default function App() {
  const [inputAddElement, setInputAddElement] = useState("");
  const [inputFilter, setInputFilter] = useState("");
  const [data, setData] = useState<ITaskItem[]>([]);

  function filterList(newText: string) {
    setInputFilter(newText);

    console.log(inputFilter);
    _storeData("@filteredData", data);
  }

  const asyncDataId = _retrieveData("@data")
    .then((data) => (data === null ? 1 : Number(data[data.length - 1].id)))
    .catch((e) => console.error("Erro ao buscar dados do AsyncStorage: ", e));

  const [index, setIndex] = useState(asyncDataId);

  const addElement = async () => {
    if (inputAddElement === "") {
      return;
    }

    var newData = [...data, { id: index, title: inputAddElement }];
    //@ts-ignore
    setIndex(index + 1);
    //@ts-ignore
    _storeData("@data", newData);
    const asyncData = await _retrieveData("@data");
    setData(asyncData);
  };

  const renderItem = (item: { item: ITaskItem }) => (
    <View style={stylesGlobal.lineItem}>
      <Text style={[stylesGlobal.taskItem]}>{item.item.title}</Text>
      <Pressable onPress={() => deleteElement(item.item.id)}>
        <Icon name="trash" size={24} style={stylesGlobal.trash} />
      </Pressable>
    </View>
  );

  const deleteElement = (id: string) => {
    const filteredData = data.filter((item) => item.id !== id);
    setData(filteredData);
    _storeData("@data", filteredData);
  };

  useEffect(() => {
    if (inputFilter === "") {
      _retrieveData("@data")
        .then((data) => (data === null ? setData([]) : setData(data)))
        .catch((e) =>
          console.error("Erro ao buscar dados do AsyncStorage: ", e)
        );
    } else {
      _retrieveData("@filteredData")
        .then((data) => (data === null ? setData([]) : setData(data)))
        .catch((e) =>
          console.error("Erro ao buscar dados do AsyncStorage: ", e)
        );
    }
  }, []);

  return (
    <SafeAreaView style={stylesGlobal.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.lighter} />
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
        <Pressable style={stylesGlobal.addBtn} onPress={() => addElement()}>
          <Text style={stylesGlobal.btnText}>ADICIONAR</Text>
        </Pressable>
        <View style={{ marginTop: "15%" }}>
          <View style={stylesGlobal.listTitleView}>
            <Text style={stylesGlobal.taskListTitle}>Lista de Tarefas</Text>
            <Pressable
              style={({ pressed }) => [
                { backgroundColor: pressed ? "darkred" : "red" },
                stylesGlobal.btnClear,
              ]}
              onPress={() => {
                setData([]);
                _clearData();
              }}
            >
              <Text style={stylesGlobal.btnText}>Limpar</Text>
            </Pressable>
          </View>
          <View style={stylesGlobal.addNewTaskView}>
            <TextInput
              placeholder="Filtrar..."
              style={stylesGlobal.input}
              onChangeText={(newText) => filterList(newText)}
              value={inputFilter}
            />
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
