import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey = 'currentUser';
  private usersKey = 'users';

  private loginState = new BehaviorSubject<boolean>(this.isAuthenticated());
  loginState$ = this.loginState.asObservable();


  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }


  login(username: string, password: string): boolean {
    try {
      const users: User[] = this._getUsers();
      const userExists = users.find(user => user.username === username && user.password === password);

      if (userExists) {
        this._setLocalStorage(this.storageKey, userExists);
        this.loginState.next(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  }


  register(username: string, password: string): boolean {
    try {
      const users: User[] = this._getUsers();
      const userExists = users.find(user => user.username === username);

      if (!userExists) {
        users.push({ username, password });
        this._setLocalStorage(this.usersKey, users);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during registration:', error);
      return false;
    }
  }

  logout(): void {
    try {
      localStorage.removeItem(this.storageKey);
      this.loginState.next(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }


  getCurrentUser(): User | null {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || 'null');
    } catch (error) {
      console.error('Error retrieving current user:', error);
      return null;
    }
  }


  private _getUsers(): User[] {
    try {
      return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    } catch (error) {
      console.error('Error retrieving users:', error);
      return [];
    }
  }

  private _setLocalStorage(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  }
}
