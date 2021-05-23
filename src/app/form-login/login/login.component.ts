import { Component, OnInit } from '@angular/core';
import {SignInForm} from '../../auth/SignInForm';
import {AuthService} from '../../auth/auth.service';
import {TokenStorageService} from '../../auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  status = 'Please Login!!'
  signInForm: SignInForm;
  isLoggedIn = false;
  isLoggedFailed = false;
  roles: string[] = [];
  name: string;
  hide = true;
  constructor(private authService: AuthService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenStorageService.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getAuthorities();
      this.name = this.tokenStorageService.getName();
    }
  }
  onSubmit(){
    this.signInForm = new SignInForm(
      this.form.username,
      this.form.password
    )
    this.authService.signIn(this.signInForm).subscribe(data =>{
      this.tokenStorageService.setToken(data.token)
      this.tokenStorageService.setName(data.name)
      this.tokenStorageService.setAuthorities(data.roles);
      this.isLoggedIn = true;
      this.isLoggedFailed = false;
      this.roles = this.tokenStorageService.getAuthorities();
      alert('Login success!!')
      window.location.reload();
    }, error => {
      this.status = error.error.message;
      this.isLoggedFailed = true;
      alert('Login Failed! Please login again!')
      }
    )
  }

}
