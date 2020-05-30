import { observable, action } from 'mobx';

class User {
  @observable
  private _token: string = '';

  @observable
  private _firstName: string = '';

  @observable
  private _lastName: string = '';

  @observable
  private _email: string = '';

  get token(): string {
    return this._token;
  }

  get isSignedIn(): boolean {
    return Boolean(this._token);
  }

  @action
  setToken(value: string): void {
    this._token = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }

  @action
  setUserDetails(firstName: string, lastName: string, email: string): void {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
  }

  @action
  signOut() {
    this._token = '';
    this._firstName = '';
    this._lastName = '';
    this._email = '';
  }
}

export default User;
