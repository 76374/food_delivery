import axios from 'axios';

class Locale {
  data = {};

  init(completeCallback) {
    axios.get('/locale.json').then((result) => {
      this.data = result.data;
      if (completeCallback) {
        completeCallback();
      }
    });
  }

  get(key, ...args) {
    let value = this.data[key];
    if (value === undefined) {
      return key;
    }

    for (let i = 0; i < args.length; i++) {
      value = value.replace(`{${i}}`, args);
    }
    return value;
  }
}

const locale = new Locale();

export default locale;
