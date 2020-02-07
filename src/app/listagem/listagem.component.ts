import { Pessoa } from './../domain/Pessoa';
import { Component, OnInit } from '@angular/core';
import { ListagemService } from '../services/listagem.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  pessoas: Pessoa[];

  constructor(private listagemServ: ListagemService,
              private router: Router) { }

  ngOnInit() {
    this.listagemServ.listarPessoas()
      .subscribe( data => {
        this.pessoas = data;
      });
  }
  
  clickCadastro(cpf: string) {
      this.router.navigate(['/cadastro/' + cpf]);
  }

}
