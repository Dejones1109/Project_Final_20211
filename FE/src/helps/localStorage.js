import AsyncStorage from '@react-native-async-storage/async-storage';
const storeData = async (key,value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
    }
}

const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? jsonValue : null;
    } catch(e) {
        // error reading value
    }
}

const deleteData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.removeItem(key)
        return jsonValue != null ? jsonValue : null;
    } catch(e) {
        // error reading value
    }
}
export {storeData, getData,deleteData};
