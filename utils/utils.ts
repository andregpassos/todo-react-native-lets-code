import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ITaskItem {
  id: string;
  title: string;
}

export const _storeData = async (data: ITaskItem[]) => {
  try {
    await AsyncStorage.setItem('@data', JSON.stringify(data));
  } catch (err) {
    console.log('Erro ao salvar dados no Async Storage:', err);
  }
};

export const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('@data');
    return value !== null ? JSON.parse(value) : null;
  } catch (err) {
    console.log('Erro ao buscar dados do Async Storage:', err);
  }
};

export const _clearData = () => AsyncStorage.clear();
