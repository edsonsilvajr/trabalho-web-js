import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ToastrMessageService } from '../services/toastr.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {
  cart: any[] = [];
  desconto = false;
  logado = false;
  cupom = '';
  constructor(
    private _storageService: StorageService,
    private _toastr: ToastrMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const cart = this._storageService.get('cart');
    this.logado = this._storageService.get('logado');
    this.cart = cart;
  }

  addToCart(index: any) {
    this.cart[index].quantity++;
    this._storageService.set('cart', this.cart);
  }

  subtractFromCart(index: any) {
    if (this.cart[index].quantity > 1) this.cart[index].quantity--;
    this._storageService.set('cart', this.cart);
  }

  removeFromCart(index: any) {
    this.cart.splice(index, 1);
    this._storageService.set('cart', this.cart);
  }

  get total() {
    let total = 0;
    this.cart.forEach((item) => {
      total = total + item.price * item.quantity;
    });
    return total;
  }

  aplicarCupom() {
    if (this.cupom === 'UTFPR') {
      this.desconto = true;
      this._toastr.showMessage(
        'success',
        'Cupom aplicado com sucesso! Curta os 15% de desconto ;)'
      );
    } else {
      if (this.desconto) {
        this._toastr.showMessage(
          'error',
          'Este cupom é invalido :( mas não se preocupe, o ultimo cupom valido ainda está ativo ;)'
        );
      } else {
        this._toastr.showMessage('error', 'Este cupom é invalido :(');
      }
    }
  }

  finalizarCompra() {
    if (this.cart.length === 0) {
      this._toastr.showMessage('error', 'Carrinho vazio!');
      return;
    }
    if (this.logado) {
      this._storageService.set('cart', []);
      this._toastr.showMessage(
        'success',
        'Seu pedido de compra foi gerado com sucesso!'
      );
      this.router.navigate(['/landing-page']);
    } else {
      this._toastr.showMessage(
        'error',
        'Você deve estar logado para prosseguir com a compra!'
      );
    }
  }
}
