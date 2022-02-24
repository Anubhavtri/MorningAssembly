import {apiConfig} from '../../utility/config';
import axios from 'axios';
import { Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
   // device_token: await checkFirebaseToken(),
  },
});
const getclient = async () => {
 //client.defaults.headers.common.Authorization = await getAccessToken();
  client.defaults.headers['device_token'] = await checkFirebaseToken();
  client.defaults.headers['platform'] = Platform.OS;
  
  
  

  return client;
};
export default getclient;

function getUrl(config) {
  if (config.baseURL) {
    return config.url.replace(config.baseURL, '');
  }
  return config.url;
}
// Intercept all request
client.interceptors.request.use(
  config => {
    //  console.log('interceptors request');
    // console.log(
    //     `%c ${config.method.toUpperCase()} - ${getUrl(config)}:`,
    //     'color: #0086b3; font-weight: bold', config);
    return config;
  },
  error => Promise.reject(error),
);

// Intercept all responses
client.interceptors.response.use(
  async response => {
    // console.log('Interceptor Response', response.status);
    // console.log('Interceptor Response', response.data);

    return response;
  },
  error => {
    // console.log('Interceptor Error>>', error);

    // console.log('Interceptor Error', error.response.data);

    return Promise.reject(error);
  },
);



const checkFirebaseToken = async () => {
  try {
    const retrievedItem = await AsyncStorage.getItem('@deviceToken');
    if (retrievedItem !== null) {
      /* const item = JSON.parse(retrievedItem); */
      const item = retrievedItem;
      console.log("checkFirebaseToken item>>",item)
      return item;
    }
    return null;
  } catch (error) {
    console.log('getAnonymousId', 'Error retrieving data');
  }
};
