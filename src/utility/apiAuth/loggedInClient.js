import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiConfig} from '../../utility/config';
import axios from 'axios';
import * as RootNavigation from '../../RootNavigation';
import {Platform} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

/* import analytics from '@segment/analytics-react-native'; */

const getAccessToken = async () => {
  try {
    const retrievedItem = await AsyncStorage.getItem('@access_token');
    if (retrievedItem !== null) {
       console.log('getAccessToken', 'Error retrieving data'+retrievedItem);
     
      return retrievedItem;
    }
    return null;
  } catch (error) {
    console.log('getAccessToken', 'Error retrieving data');
  }
};

const getAnonymousId = async () => {
  try {
    const retrievedItem = await AsyncStorage.getItem('LoginData');
    if (retrievedItem !== null) {
      const item = JSON.parse(retrievedItem);
      const anonymousId = item.details.unique_id;
      return anonymousId;
    }
    return null;
  } catch (error) {
    console.log('getAnonymousId', 'Error retrieving data');
  }
};

const clearAsyncStorage = async () => {
  console.log('clearAsyncStorage');

  try {
    console.log('try is working');
    // await AsyncStorage.clear();
    await AsyncStorage.removeItem('@storage_Key');
    // await Keychain.resetGenericPassword({
    //   service: 'Fingerprint Authentication Service',
    // });
    //await trackEventLogout();
    console.log('try after  working');
    RootNavigation.resetRoot('Unauthorized', {screen: 'Login'});
  } catch (e) {
    console.log('async clear error', e);
  }
};

const checkFirebaseToken = async () => {
  try {
    const retrievedItem = await AsyncStorage.getItem('@deviceToken');
    if (retrievedItem !== null) {
      /* const item = JSON.parse(retrievedItem); */
      const item = retrievedItem;
      //console.log("checkFirebaseToken item>>",item)
      return item;
    }
    return null;
  } catch (error) {
    console.log('getAnonymousId', 'Error retrieving data');
  }
};
/* const trackEventLogout = async () => {
  await analytics.track('Log out', {
    logout_type: 'timeout',
    title: 'Maji App',
  });
}; */

const getSavedData = async () => {
  try {
    const retrievedItem = await AsyncStorage.getItem('@access_token');
    if (retrievedItem !== null) {
      return retrievedItem;
    }
    return null;
  } catch (error) {
    console.log('getSavedData', 'Error retrieving data');
  }
};

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('LoginData', jsonValue);
  } catch (e) {
    console.log('storeData', 'saving error');
  }
};

const loginClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    // Accept: 'application/json',
  },
});

const getLoginClient = async () => {
   loginClient.defaults.headers.common.Authorization = await getAccessToken();
  //  loginClient.defaults.headers['device_token'] = await checkFirebaseToken();
  //  loginClient.defaults.headers['platform'] = Platform.OS;

  return loginClient;
};

const callRefreshToken = async config => {
  return new Promise(async (resolve, reject) => {
    try {
      const retrievedData = await getSavedData();
      const parsedData = JSON.parse(retrievedData);
      const refreshToken = parsedData.refreshToken;

      const data = {
        refresh_token: refreshToken,
      };

      let response = await axios.post(
        apiConfig.baseUrl + '/refresh-token/',
        data,
        {timeout: 5000}
      );

      console.log('Refresh Token Status', response.status);

      if (response.status == 200) {
        const responseData = response.data;

        parsedData.access_token = responseData.access_token;
        parsedData.refresh_token = responseData.refresh_token;

        await storeData(parsedData);

        config.headers.Authorization = `Bearer ${responseData.access_token}`;

        axios
          .request(config)
          .then(response => {
            console.log('API call with new Token Success');
            resolve(response);
          })
          .catch(error => {
            console.log('API call with new Token Error', error);
            reject(error);
          });
      } else {
        reject({isRefreshFail: true});
      }
    } catch (err) {
      console.log('callRefreshToken', 'Catch', err);
      reject({isRefreshFail: true});
    }
  });
};

export default getLoginClient;

function getUrl(config) {
  if (config.baseURL) {
    return config.url.replace(config.baseURL, '');
  }
  return config.url;
}

// Intercept all requests
loginClient.interceptors.request.use(
  config => {
    // console.log(config);
    return config;
  },
  error => Promise.reject(error),
);



// Intercept all responses
loginClient.interceptors.response.use(
  async response => {
    console.log('Interceptor Response', response.status);
    // console.log('Interceptor Response', response.data);
    try {
      console.log('Interceptor Response', response.status);

      if (response.status === 401) {
       //let res = await callRefreshToken(response.config);

       return res;
      } else {
        return response;
      }
    } catch (err) {
      console.log('Interceptor Response', JSON.stringify(err));
      if (err.isRefreshFail) {
        clearAsyncStorage();
      } else {
        return Promise.reject(err);
      }
    }
  },
  async error => {
    //console.log('Interceptor Error', error.response);
    // console.log('Interceptor Error', error.response.status);
      console.log('Interceptor Error>>', JSON.stringify(error));
    try {
      if (error.response.status === 401) {
     //   const res = await callRefreshToken(error.response.config);

        return res;
      } else {
        return Promise.reject(error);
      }
    } catch (err) {
      if (err.isRefreshFail) {
        clearAsyncStorage();
      } else {
        return Promise.reject(err);
      }
    }
  },
);
