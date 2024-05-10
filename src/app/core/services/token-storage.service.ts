import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private apiUrl = "http://localhost:4300/RhestIA";
  userId: number;
  oldPassword: string;
  currentUser: any;
  newPassword: string;

  constructor(private http: HttpClient) {
  }

  signOut(): void {
    window.sessionStorage.clear();
    location.href = ''
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public isLoggedIn(): boolean
  {
    const key = sessionStorage.getItem(TOKEN_KEY);
    if(key === null)
    {
      return false;
    }
    return true;
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) || '{}';
  }

  public saveUser(user: any): void {
    this.currentUser = user;
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY)||'{}');
  }

  public getNom()
  {
    return this.getUser()["nom"]
  }
}
