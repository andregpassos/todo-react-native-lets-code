import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ITaskItem {
  id: string;
  title: string;
}

export const _storeData = async (dataId: string, data: ITaskItem[]) => {
  try {
    await AsyncStorage.setItem(dataId, JSON.stringify(data));
  } catch (err) {
    console.error("Erro ao salvar dados no Async Storage:", err);
    console.log(dataId);
  }
};

export const _retrieveData = async (dataId: string) => {
  try {
    const value = await AsyncStorage.getItem(dataId.toString());
    return value !== null ? JSON.parse(value) : null;
  } catch (err) {
    console.error("Erro ao buscar dados do Async Storage:", err);
  }
};

export const _clearData = () => AsyncStorage.clear();
