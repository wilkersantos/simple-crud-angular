import { PessoaDto } from './../domain/PessoaDto';
import { Constants } from './app-const';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Pessoa } from '../domain/Pessoa';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private loginServ: LoginService,
              private http: HttpClient) { }


  cadastrar(pessoa: PessoaDto) {
    return this.http.post<HttpResponse<any>>(Constants.HOME_URL + '/cadastro/cadastrar', pessoa, {headers: this.loginServ.addHeader()});
  }

  buscarPessoa(cpf: string) {
    return this.http.get<Pessoa>(Constants.HOME_URL + '/cadastro/buscar/' + cpf, {headers: this.loginServ.addHeader()});
  }

  apagarPessoa(cpf: string) {
    return this.http.delete<HttpResponse<any>>(Constants.HOME_URL + '/cadastro/remover/' + cpf, {headers: this.loginServ.addHeader()});
  }

  atualizar(pessoa: PessoaDto) {
    return this.http.put<HttpResponse<any>>(Constants.HOME_URL + '/cadastro/atualizar', pessoa, {headers: this.loginServ.addHeader()});
  }
}
