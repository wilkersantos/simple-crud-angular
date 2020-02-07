import { CadastroService } from './../services/cadastro.service';
import { PessoaDto } from './../domain/PessoaDto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Pessoa } from '../domain/Pessoa';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;

  private cpfPessoa: string;
  private novoCadastro = false;

  private pessoa: PessoaDto;

  private pessoaRecebida: Pessoa;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private cadastroService: CadastroService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.cpfPessoa = params.cpf;
        this.cpfPessoa = this.cpfPessoa.trim();
      });

    if (this.cpfPessoa.length === 0) {
       this.novoCadastro = true;

       this.cadastroForm = this.formBuilder.group({
        nome: ['', Validators.required],
        email: ['', Validators.required],
        naturalidade: ['', Validators.required],
        nacionalidade: ['', Validators.required],
        cpf: ['', Validators.required],
        sexo: ['', Validators.required],
        dataNascimento: ['', Validators.required]
      });
    } else {
      this.cadastroService.buscarPessoa(this.cpfPessoa).subscribe(
        ( data ) => {

          let dtNascimentoVinda = data.dataNascimento.toString().substr(0, 10);
          const ano = dtNascimentoVinda.substr(0, 4);
          const mes = dtNascimentoVinda.substr(4, 3).replace('-','');
          const dia = dtNascimentoVinda.substr(8, 10);

          dtNascimentoVinda = dia + mes + ano;

          this.cadastroForm = this.formBuilder.group({
            nome: [data.nome, Validators.required],
            email: [data.email, Validators.required],
            naturalidade: [data.naturalidade, Validators.required],
            nacionalidade: [data.nacionalidade, Validators.required],
            cpf: [data.cpf, Validators.required],
            sexo: [data.sexo, Validators.required],
            dataNascimento: [dtNascimentoVinda, Validators.required]
          });
        },
        ( error: HttpErrorResponse ) => {
          alert(error.message);
        }
      );
    }
  }

  enviar() {

    this.pessoa = new PessoaDto();
    this.pessoa.nome = this.cadastroForm.get('nome').value;
    this.pessoa.cpf = this.cadastroForm.get('cpf').value;
    this.pessoa.sexo = this.cadastroForm.get('sexo').value;
    if (this.pessoa.sexo === '') {
      this.pessoa.sexo = 'OUTRO';
    }
    this.pessoa.naturalidade = this.cadastroForm.get('naturalidade').value;
    this.pessoa.nacionalidade = this.cadastroForm.get('nacionalidade').value;
    this.pessoa.email = this.cadastroForm.get('email').value;

    const data = this.cadastroForm.get('dataNascimento').value;
    const dia = data.substr(0, 2);
    const mes = data.substr(2, 2) - 1;
    const ano = data.substr(4, 8);

    this.pessoa.dataNascimento = new Date(ano, mes, dia);

    if (this.novoCadastro === true) {
      this.cadastroService.cadastrar(this.pessoa).subscribe(
        ( data ) => {
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/listagem']);
        },
        (error: HttpErrorResponse) => {
          alert(error.error.message);
        }
      );
    } else {
      this.cadastroService.atualizar(this.pessoa).subscribe(
        ( data ) => {
          alert('Cadastro atualizado com sucesso!');
          this.router.navigate(['/listagem']);
        },
        (error: HttpErrorResponse) => {
          alert(error.error.message);
        }
      );
    }
  }

  apagar() {
    this.cadastroService.apagarPessoa(this.cpfPessoa).subscribe(
      ( data ) => {
        alert('Pessoa apagada!');
        this.router.navigate(['/listagem']);
      },
      ( error: HttpErrorResponse ) => {
        alert(error.error.message);
      }
    );
  }
}
