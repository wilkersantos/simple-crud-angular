import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListagemComponent } from './listagem/listagem.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';

const routes: Routes = [
  {
      path: '',
      component: LoginComponent,
  },
  {
    path: 'listagem',
    component: ListagemComponent,
  },
  {
    path: 'cadastro/:cpf',
    component: CadastroComponent,
  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListagemComponent,
    CadastroComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
