import Axios, { AxiosRequestConfig } from 'axios';
import BackendPath from '../const/BackendPath';
import useStore from './useStore';
import { useCallback } from 'react';
import AppState from '../stores/AppState';

let id = 0;

const apiCall = (
  requestPayload: RequestPayload,
  appState: AppState,
  token: string | null,
  successCallback: SuccessCallback
) => {
  const processId = 'api call ' + ++id;

  const requestData: RequestData = {
    query: requestPayload.query,
  };
  if (requestPayload.input) {
    requestData.variables = {
      input: requestPayload.input,
    };
  }

  let config: AxiosRequestConfig = {};
  if (token) {
    config = { 
      headers: { Authorization: 'Bearer ' + token } 
    };
  }

  appState.addProcess(processId);

  Axios.post(BackendPath.API_PATH, requestData, config)
    .then((response) => {
      const errors = response.data.errors;
      if (errors && errors.length) {
        appState.setError(errors[0]);
      } else {
        successCallback(response.data.data);
      }
    })
    .catch((err) => {
      appState.setError(err);
    })
    .then(() => {
      appState.removeProcess(processId);
    });
};

const useApiCall = () => {
  const { appState, user } = useStore();

  return useCallback(
    (requestPayload: RequestPayload, sendToken, successCallback: SuccessCallback) => {
      const token: string | null = sendToken ? user.token : null;
      apiCall(requestPayload, appState, token, successCallback);
    },
    [appState, user]
  );
};

interface RequestData {
  query: string;
  variables?: any;
}

interface RequestPayload {
  query: string;
  input?: any;
  token?: string;
}

interface SuccessCallback {
  (data: any): void;
}

export default useApiCall;
