import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';

import {styles} from './styles/styles';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Icon from 'react-native-vector-icons/FontAwesome';
import {_clearData, _retrieveData, _storeData} from './utils/utils';

interface ITaskItem {
  id: string;
  title: string;
}

export default function App() {
  const [inputText, onChangeInputText] = useState('');

  const [data, setData] = useState<ITaskItem[]>([]);

  const asyncDataId = _retrieveData()
    .then(data => (data === null ? 1 : Number(data.id)))
    .catch(e => console.error('Erro ao buscar dados do AsyncStorage: ', e));

  const [index, setIndex] = useState(asyncDataId);

  const addElement = async () => {
    if (inputText === '') {
      return;
    }

    var newData = [...data, {id: index, title: inputText}];
    //@ts-ignore
    setIndex(index + 1);
    //@ts-ignore
    _storeData(newData);
    const asyncData = await _retrieveData();
    setData(asyncData);
  };

  const renderItem = (item: {item: ITaskItem}) => (
    <View style={styles.lineItem}>
      <Text style={[styles.taskItem]}>{item.item.title}</Text>
      <Pressable onPress={() => deleteElement(item.item.id)}>
        <Icon name="trash" size={24} style={styles.trash} />
      </Pressable>
    </View>
  );

  const deleteElement = (id: string) => {
    const filteredData = data.filter(item => item.id !== id);
    setData(filteredData);
    _storeData(filteredData);
  };

  useEffect(() => {
    _retrieveData()
      .then(data => (data === null ? setData([]) : setData(data)))
      .catch(e => console.error('Erro ao buscar dados do AsyncStorage: ', e));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lighter} />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>TODO LIST</Text>
        </View>
        <View style={styles.addNewTaskView}>
          <TextInput
            placeholder="Nova tarefa..."
            style={styles.input}
            onChangeText={onChangeInputText}
            value={inputText}
          />
        </View>
        <Pressable style={styles.addBtn} onPress={() => addElement()}>
          <Text style={styles.btnText}>ADICIONAR</Text>
        </Pressable>
        <View style={styles.taskListView}>
          <View style={styles.listTitleView}>
            <Text style={styles.taskListTitle}>Lista de Tarefas</Text>
            <Pressable
              style={({pressed}) => [
                {backgroundColor: pressed ? 'darkred' : 'red'},
                styles.btnClear,
              ]}
              onPress={() => {
                setData([]);
                _clearData();
              }}>
              <Text style={styles.btnText}>Limpar</Text>
            </Pressable>
          </View>
          <View></View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.taskListScrollView}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
