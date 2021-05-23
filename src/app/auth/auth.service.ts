import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignUpForm} from './SignUpForm';
import {Observable} from 'rxjs';
import {SignInForm} from './SignInForm';
import {JwtResponse} from './JwtResponse';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //API LOCAL
  // private SIGNUP_API = 'http://localhost:8080/api/auth/signup'
  // private SIGNIN_API = 'http://localhost:8080/api/auth/signin'
  //API SERVER
  private SIGNUP_API = environment.API_SERVER+'signup';
  private SIGNIN_API = environment.API_SERVER+'signin';
  constructor(private http: HttpClient) { }
  signUp(signUpForm: SignUpForm): Observable<any>{
  return this.http.post<any>(this.SIGNUP_API, signUpForm)
  }
  signIn(signInForm: SignInForm): Observable<JwtResponse>{
  return this.http.post<JwtResponse>(this.SIGNIN_API, signInForm);
  }
}
