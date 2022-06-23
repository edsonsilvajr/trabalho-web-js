import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { ToastrMessageService } from '../services/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  users: any[] = [];
  public loginForm = this._formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    senha: [
      '',
      Validators.compose([Validators.required, Validators.minLength(8)]),
    ],
  });
  constructor(
    private _formBuilder: FormBuilder,
    private _storageService: StorageService,
    private _messageService: ToastrMessageService
  ) {}

  ngOnInit(): void {
    this.users = this._storageService.get('users');
  }

  onSubmit() {
    this.loginForm.updateValueAndValidity();
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      this._messageService.showMessage('error', 'Formulário inválido!');
    } else {
      const user = this.loginForm.getRawValue();
      const index = this.users.findIndex((element) => {
        return element.email === user.email && element.senha === user.senha;
      });
      if (index !== -1) {
        this._storageService.set('logado', true);
      } else {
        this._messageService.showMessage('error', 'Usuário/Senha incorreta!');
      }
    }
  }

  get invalidSenha() {
    return (
      this.loginForm.get('senha')?.invalid &&
      (this.loginForm.get('senha')?.dirty ||
        this.loginForm.get('senha')?.touched)
    );
  }

  get invalidEmail() {
    return (
      this.loginForm.get('email')?.invalid &&
      (this.loginForm.get('email')?.dirty ||
        this.loginForm.get('email')?.touched)
    );
  }
}
