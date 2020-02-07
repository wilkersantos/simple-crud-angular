import { Constants } from './app-const';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Pessoa } from '../domain/Pessoa';

@Injectable({
  providedIn: 'root'
})
export class ListagemService {

  constructor(private http: HttpClient,
              private router: Router,
              private loginService: LoginService) { }

  listarPessoas() {
      return this.http.get<Pessoa[]>(Constants.HOME_URL + '/cadastro/listar', {headers: this.loginService.addHeader()});
  }
}
