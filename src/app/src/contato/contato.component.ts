import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrMessageService } from '../services/toastr.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export class ContatoComponent implements OnInit {
  public contactForm = this._formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    mensagem: ['', Validators.required],
    assunto: ['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _messageService: ToastrMessageService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.contactForm.updateValueAndValidity();
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) {
      this._messageService.showMessage('error', 'Formulário inválido!');
    } else {
      this._messageService.showMessage('success', 'Enviado com sucesso!');
    }
  }

  get invalidName() {
    return (
      this.contactForm.get('nome')?.invalid &&
      (this.contactForm.get('nome')?.dirty ||
        this.contactForm.get('nome')?.touched)
    );
  }

  get invalidEmail() {
    return (
      this.contactForm.get('email')?.invalid &&
      (this.contactForm.get('email')?.dirty ||
        this.contactForm.get('email')?.touched)
    );
  }

  get invalidMessage() {
    return (
      this.contactForm.get('mensagem')?.invalid &&
      (this.contactForm.get('mensagem')?.dirty ||
        this.contactForm.get('mensagem')?.touched)
    );
  }

  get invalidSubject() {
    return (
      this.contactForm.get('assunto')?.invalid &&
      (this.contactForm.get('assunto')?.dirty ||
        this.contactForm.get('assunto')?.touched)
    );
  }
}
