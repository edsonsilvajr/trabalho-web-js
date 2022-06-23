import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrMessageService } from '../services/toastr.service';
import { ageMajority, cpfValidator } from '../validators/validators';
import { debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DateTime } from 'luxon';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  subject: Subject<any> = new Subject();
  fieldsToLock = ['rua', 'bairro', 'cidade', 'uf'];
  requestFields = ['logradouro', 'bairro', 'localidade', 'uf'];

  onKeyUp(): void {
    this.subject.next();
  }

  onKeyDown(): void {
    // When the user starts to type, remove the validator
  }

  public cadastroForm = this._formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    cpf: [
      '',
      Validators.compose([
        Validators.required,
        cpfValidator(),
        Validators.pattern('^[0-9]+$'),
      ]),
    ],
    cep: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.minLength(8),
        Validators.maxLength(8),
      ]),
    ],
    rua: ['', Validators.required],
    bairro: ['', Validators.required],
    cidade: ['', Validators.required],
    uf: ['', Validators.required],
    data_nascimento: [
      '',
      Validators.compose([Validators.required, ageMajority()]),
    ],
    senha: [
      '',
      Validators.compose([Validators.required, Validators.minLength(8)]),
    ],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _messageService: ToastrMessageService,
    protected _http: HttpClient,
    private _storageService: StorageService
  ) {}

  get checarData() {
    if (this.cadastroForm.get('data_nascimento')?.value) {
      const dataAtual = DateTime.now();
      const dataForm = DateTime.fromISO(
        this.cadastroForm.get('data_nascimento')?.value
      );
      const diff = dataAtual.diff(dataForm, [
        'years',
        'months',
        'days',
        'hours',
      ]);
      return diff['years'];
    }
    return 0;
  }

  ngOnInit(): void {
    const teste = DateTime.local(2017, 5, 15, 8, 30);

    this.subject.pipe(debounceTime(500)).subscribe(() => {
      if (this.invalidCep) {
        this.enableOrDisableFields('enable');
      } else {
        this._http
          .get(
            'https://viacep.com.br/ws/' +
              this.cadastroForm.get('cep')?.value +
              '/json/'
          )
          .subscribe((result: any) => {
            if (result.erro === 'true') {
              this._messageService.showMessage('error', 'CEP não encontrado!');
              this.enableOrDisableFields('enable');
            } else {
              this.setFormValue(result);
              this.enableOrDisableFields('disable');
            }
          });
      }
    });
  }

  setFormValue(values: any) {
    this.fieldsToLock.forEach((field, index) => {
      this.cadastroForm.get(field)?.setValue(values[this.requestFields[index]]);
    });
  }

  enableOrDisableFields(option: string) {
    if (option === 'enable') {
      this.fieldsToLock.forEach((field) => {
        this.cadastroForm.get(field)?.enable();
      });
    }
    if (option === 'disable') {
      this.fieldsToLock.forEach((field) => {
        this.cadastroForm.get(field)?.disable();
      });
    }
  }

  onSubmit() {
    this.cadastroForm.updateValueAndValidity();
    this.cadastroForm.markAllAsTouched();
    if (this.cadastroForm.invalid) {
      this._messageService.showMessage('error', 'Formulário inválido!');
    } else {
      const users = this._storageService.get('users');
      users.push(this.cadastroForm.getRawValue());
      this._storageService.set('users', users);
      this._messageService.showMessage('success', 'Enviado com sucesso!');
    }
  }

  markAsTouched(field: string) {
    this.cadastroForm.get(field)?.markAsTouched();
  }

  get invalidName() {
    return (
      this.cadastroForm.get('nome')?.invalid &&
      (this.cadastroForm.get('nome')?.dirty ||
        this.cadastroForm.get('nome')?.touched)
    );
  }

  get invalidEmail() {
    return (
      this.cadastroForm.get('email')?.invalid &&
      (this.cadastroForm.get('email')?.dirty ||
        this.cadastroForm.get('email')?.touched)
    );
  }

  get invalidCpf() {
    return (
      this.cadastroForm.get('cpf')?.invalid &&
      (this.cadastroForm.get('cpf')?.dirty ||
        this.cadastroForm.get('cpf')?.touched)
    );
  }

  get invalidCep() {
    return (
      this.cadastroForm.get('cep')?.invalid &&
      (this.cadastroForm.get('cep')?.dirty ||
        this.cadastroForm.get('cep')?.touched)
    );
  }

  get invalidRua() {
    return (
      this.cadastroForm.get('rua')?.invalid &&
      (this.cadastroForm.get('rua')?.dirty ||
        this.cadastroForm.get('rua')?.touched)
    );
  }

  get invalidBairro() {
    return (
      this.cadastroForm.get('bairro')?.invalid &&
      (this.cadastroForm.get('bairro')?.dirty ||
        this.cadastroForm.get('bairro')?.touched)
    );
  }

  get invalidCidade() {
    return (
      this.cadastroForm.get('cidade')?.invalid &&
      (this.cadastroForm.get('cidade')?.dirty ||
        this.cadastroForm.get('cidade')?.touched)
    );
  }

  get invalidUf() {
    return (
      this.cadastroForm.get('uf')?.invalid &&
      (this.cadastroForm.get('uf')?.dirty ||
        this.cadastroForm.get('uf')?.touched)
    );
  }

  get invalidDN() {
    return (
      this.cadastroForm.get('data_nascimento')?.invalid &&
      (this.cadastroForm.get('data_nascimento')?.dirty ||
        this.cadastroForm.get('data_nascimento')?.touched)
    );
  }

  get invalidSenha() {
    return (
      this.cadastroForm.get('senha')?.invalid &&
      (this.cadastroForm.get('senha')?.dirty ||
        this.cadastroForm.get('senha')?.touched)
    );
  }
}
