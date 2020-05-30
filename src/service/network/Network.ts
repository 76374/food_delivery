import RequestData from '../../dto/RequestData';
import Axios, { AxiosRequestConfig } from 'axios';
import BackendPath from '../../const/BackendPath';

class Network {
  static post<T>(request: RequestData): Promise<T> {
    return new Promise((resolve, reject) => {
      const postData = {
        query: request.query,
        variables: request.variables,
      };
      let config: AxiosRequestConfig = {};
      if (request.token) {
        config.headers = { Authorization: 'Bearer ' + request.token };
      }
      Axios.post<ServerResponse<T>>(BackendPath.API_PATH, postData, config)
        .then((response) => {
          const errors = response.data.errors;
          if (errors && errors.length) {
            const error = errors[0];
            if (!error.code) {
              error.code = 500;
            }
            if (!error.key) {
              error.key = 'server_error';
            }
            throw error;
          } 
          resolve(response.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

interface ServerResponse<T> {
  data: T;
  errors: ServerError[];
}

interface ServerError {
  message: string;
  key: string;
  code: number;
}

export default Network;
