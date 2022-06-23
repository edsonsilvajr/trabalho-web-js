import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './src/services/storage.service';
import { ToastrMessageService } from './src/services/toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private _storageService: StorageService,
    private router: Router,
    private _messageService: ToastrMessageService
  ) {}
  title = 'trabalho-web-js';
  links = [
    { label: 'Home', url: 'landing-page', active: true },
    { label: 'Produtos', url: 'products', active: false },
    { label: 'Contato', url: 'contact', active: false },
    { label: 'Cadastro', url: 'cadastro', active: false },
    { label: 'Carrinho', url: 'cart', active: false },
  ];
  logado = false;

  ngOnInit() {
    if (this._storageService.get('logado').length === 0) {
      this.logado = false;
    } else {
      this.logado = this._storageService.get('logado');
    }
    this._storageService.storageSubObs.subscribe((event) => {
      if (event === 'logado') {
        this.logado = this._storageService.get('logado');
        if (this.logado) {
          this._messageService.showMessage('success', 'Logado com sucesso!');
        } else {
          this._messageService.showMessage('success', 'Deslogado com Sucesso!');
        }
        this.router.navigate(['/landing-page']);
      }
    });
  }

  logout() {
    this._storageService.set('logado', false);
  }
}
