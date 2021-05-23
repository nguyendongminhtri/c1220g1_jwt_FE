import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SignUpForm} from '../../auth/SignUpForm';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  hide = true;
  form: any = {};
  signUpForm: SignUpForm;
  error1: any = {
    message: "nouser"
  };
  error2: any = {
    message: "noemail"
  };
  success: any = {
    message: "yes"
  }
  status = 'Please Register in the form';
  constructor(private authService: AuthService) {
  }
  onSubmit(){
    this.signUpForm = new SignUpForm(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    )
    this.authService.signUp(this.signUpForm).subscribe(data =>{
      console.log('data',data)
      if(JSON.stringify(data)==JSON.stringify(this.error1)){
        console.log('vao check user')
        this.status = 'The username is existed! Please try again!'
      }
      console.log('co qua day nua khong?')
      if(JSON.stringify(data)==JSON.stringify(this.error2)){
        this.status = 'The email is existed! Please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.success)){
        this.status = 'Create account success! Please login your account!'
        alert(this.status);
      }
    })
  }
  ngOnInit(): void {
  }

}
