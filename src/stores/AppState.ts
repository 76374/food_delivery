import { observable, action } from 'mobx';

class AppState {
  @observable
  private _localeReady: boolean = false;

  @observable
  private _loading: boolean = false;

  @observable
  private _error: any | null = null;

  processes: string[] = [];

  get loading(): boolean {
    return this._loading;
  }

  @action
  addProcess(id: string) {
    if (this.processes.includes(id)) {
      return;
    }
    this.processes.push(id);
    this._loading = true;
  }

  @action
  removeProcess(id: string) {
    const index = this.processes.indexOf(id);
    if (index === -1) {
      return;
    }
    this.processes.splice(index, 1);
    return (this._loading = this.processes.length > 0);
  }

  get error(): any | null {
    return this._error;
  }

  @action
  setError(value: any) {
    this._error = value;
  }

  @action
  clearError() {
    this._error = null;
  }

  get localeReady(): boolean {
    return this._localeReady;
  }

  @action
  setLocaleReady() {
    this._localeReady = true;
  }
}

export default AppState;
