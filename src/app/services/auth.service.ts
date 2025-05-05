// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    this.checkInitialState();
  }

  private checkInitialState() {
    this.isLoggedInSubject.next(!!sessionStorage.getItem('token'));
  }

  setLoggedIn(status: boolean) {
    this.isLoggedInSubject.next(status);
  }

  logout() {
    sessionStorage.removeItem('token');
    this.setLoggedIn(false);
  }
}