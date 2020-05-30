import axios from 'axios';

interface LocaleData {
  [propName: string]: string;
}

class Locale {
  private static instance: Locale;

  static init(completeCallback: () => void): void {
    if (this.instance) {
      return;
    }
    this.instance = new Locale();
    this.instance.init(completeCallback);
  }

  static get(key: string, ...args: string[]): string {
    if (!this.instance) {
      return key;
    }
    return this.instance.get(key, ...args);
  }

  static contains(key: string):boolean {
    if (!this.instance) {
      return false;
    }
    return this.instance.contains(key);
  }


  data: LocaleData = {};

  init(completeCallback: () => void): void {
    axios.get('/locale.json').then((result) => {
      this.data = result.data;
      if (completeCallback) {
        completeCallback();
      }
    });
  }

  get(key: string, ...args: string[]): string {
    let value: string = this.data[key];
    if (value === undefined) {
      return key;
    }

    for (let i = 0; i < args.length; i++) {
      value = value.replace(`{${i}}`, args[i]);
    }
    return value;
  }

  contains(key: string):boolean {
    return this.data[key] !== undefined;
  }
}

export default Locale;
