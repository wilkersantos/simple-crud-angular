import { UserAuth } from './../domain/UserAuth';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { LoginService } from '../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertsService } from 'angular-alert-module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: UserAuth;

  loginForm: FormGroup;
  submmited = false;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  enviar() {
    this.user = this.loginForm.value;

    this.loginService.login(this.user)
      .subscribe(
        (data) => {
          localStorage.setItem('auth', data.headers.get('Authorization'));
          alert('Login efetuado com sucesso!!');
          this.router.navigate(['/listagem']);
        },
        (error: HttpErrorResponse) => {
          alert('Login e/ou senha incorretos!');
        }
      );
  }

}
