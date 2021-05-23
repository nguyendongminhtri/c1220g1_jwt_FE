import { Injectable } from '@angular/core';
const TOKEN_KEY = 'Token_Key';
const NAME_KEY = 'Name_Key';
const ROLE_KEY = 'Role_Key';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
 private roles: Array<string> = [];
  constructor() { }
  public setToken(token: string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public setAuthorities (authorities: string[]){
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, JSON.stringify(authorities));
  }
  public getAuthorities(): string[]{
    this.roles = [];
    if(sessionStorage.getItem(TOKEN_KEY)){
      JSON.parse(sessionStorage.getItem(ROLE_KEY)).forEach(authority =>{
        this.roles.push(authority.authority);
      })
    }
    return this.roles;
  }
  public setName(name: string){
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.setItem(NAME_KEY,name);
  }
  public getName(): string {
    return sessionStorage.getItem(NAME_KEY);
  }
}
