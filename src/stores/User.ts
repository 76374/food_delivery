import { observable, action } from 'mobx';

class User {
  @observable
  private _token: string | null = null;

  @observable
  private _firstName: string | null = null;

  @observable
  private _lastName: string | null = null;

  @observable
  private _email: string | null = null;

  get token(): string | null {
    return this._token;
  }

  get isSignedIn(): boolean {
    return Boolean(this._token);
  }

  @action
  setToken(value: string): void {
    this._token = value;
  }

  get firstName(): string | null {
    return this._firstName;
  }

  get lastName(): string | null {
    return this._lastName;
  }

  get email(): string | null {
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
    this._token = null;
    this._firstName = null;
    this._lastName = null;
    this._email = null;
  }
}

export default User;
