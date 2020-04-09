import { observable, action } from 'mobx';

class AppState {
  @observable
  localeReady = false;

  @observable
  loading = false;

  @observable
  error = null;

  @observable
  authData = null;

  processes = [];

  @action
  addProcess(id) {
    if (this.processes.includes(id)) {
      return;
    }
    this.processes.push(id);
    this.loading = true;
  }

  @action
  removeProcess(id) {
    const index = this.processes.indexOf(id);
    if (index === -1) {
      return;
    }
    this.processes.splice(index, 1);
    return (this.loading = this.processes.length > 0);
  }

  @action
  setError(value) {
    this.error = value;
  }

  @action
  setLocaleReady() {
      this.localeReady = true;
  }

  @action
  setAuthData(firstName, lastName) {
      this.authData = { firstName, lastName };
  }

  @action
  clearAuthData() {
      this.authData = null;
  }
}

export default AppState;
