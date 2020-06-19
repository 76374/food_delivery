import { observable, action } from 'mobx';

type AuthPopup = null | 'signIn' | 'signUp';

class AppState {
  @observable
  private _localeReady: boolean = false;

  @observable
  private _loading: boolean = false;

  @observable
  private _error: any | null = null;

  @observable 
  private _authPopup: AuthPopup = null;

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

  get authPopup(): AuthPopup {
    return this._authPopup;
  }

  @action
  setAuthPopup(value: AuthPopup) {
    this._authPopup = value;
  }
}

export default AppState;
