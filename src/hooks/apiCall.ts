import Axios from 'axios';
import BackendPath from '../const/BackendPath';
import useStore from './useStore';
import { useCallback } from 'react';
import AppState from '../stores/AppState';

let id = 0;

const apiCall = (
  requestPayload: RequestPayload,
  appState: AppState,
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

  appState.addProcess(processId);

  Axios.post(BackendPath.API_PATH, requestData)
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
  const { appState } = useStore();

  return useCallback(
    (requestPayload: RequestPayload, successCallback: SuccessCallback) => {
      apiCall(requestPayload, appState, successCallback);
    },
    [appState]
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
