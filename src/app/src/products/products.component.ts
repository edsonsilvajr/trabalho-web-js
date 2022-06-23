import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../services/storage.service';
import { ToastrMessageService } from '../services/toastr.service';
import { ProductModalComponent } from './product-modal/product-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products = [
    {
      name: 'Bola de Basquete SPALDING',
      price: '135',
      url: './../../../assets/imagens/bola_de_basquete_spalding_nba_game_ball_series_t_7_laranja_6737_1_20201207120407.png',
      description: 'mock description',
    },
    {
      name: 'Barraca',
      price: '230',
      url: './../../../assets/imagens/Barraca.png',
      description: 'mock description',
    },
    {
      name: 'Calça Femimina',
      price: '50',
      url: './../../../assets/imagens/Calça Fem.png',
      description: 'mock description',
    },
    {
      name: 'Bicicleta CALOI',
      price: '1850',
      url: './../../../assets/imagens/CALOI.png',
      description: 'mock description',
    },
    {
      name: 'Sapato Infantil Fem',
      price: '50',
      url: './../../../assets/imagens/Sapato Infantil Fem.png',
      description: 'mock description',
    },
    {
      name: 'Tenis Fem',
      price: '200',
      url: './../../../assets/imagens/Tenis Fem.png',
      description: 'mock description',
    },
    {
      name: 'Camisa Fem',
      price: '40',
      url: './../../../assets/imagens/Camisa Fem.png',
      description: 'mock description',
    },
    {
      name: 'Camisa Masc',
      price: '40',
      url: './../../../assets/imagens/Camisa MASC.png',
      description: 'mock description',
    },
    {
      name: 'Meia',
      price: '15',
      url: './../../../assets/imagens/Meia.png',
      description: 'mock description',
    },
    {
      name: 'Mochila',
      price: '89',
      url: './../../../assets/imagens/Mochila.png',
      description: 'mock description',
    },
    {
      name: 'Bicicleta SPACELINE',
      price: '800',
      url: './../../../assets/imagens/SPACELINE.png',
      description: 'mock description',
    },
    {
      name: 'Mesa de PING-PONG',
      price: '1500',
      url: './../../../assets/imagens/Tenis de Mesa.png',
      description: 'mock description',
    },
  ];

  public order = 1;

  constructor(
    private _toastr: ToastrMessageService,
    private _modalService: NgbModal,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.products.sort((a, b): any => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }

  onChange(event: any) {
    let ordenado;
    switch (+this.order) {
      case 1:
        this.products.sort((a, b): any => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        break;
      case 2:
        this.products.sort((a, b): any => {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          return 0;
        });
        break;
      case 3:
        this.products.sort((a, b): any => {
          if (+a.price > +b.price) {
            return 1;
          }
          if (+a.price < +b.price) {
            return -1;
          }
          return 0;
        });
        break;
      case 4:
        this.products.sort((a, b): any => {
          if (+a.price < +b.price) {
            return 1;
          }
          if (+a.price > +b.price) {
            return -1;
          }
          return 0;
        });
        break;
      default:
        break;
    }
  }

  addToCart(product: any) {
    this._toastr.showMessage(
      'success',
      'Adicionado(a) ao carrinho!',
      product.name
    );
    const cart = this._storageService.get('cart') as Array<any>;
    const sla = cart.findIndex((element) => {
      return element.name === product.name;
    });
    if (sla === -1) {
      product.quantity = 1;
      cart.push(product);
    } else {
      cart[sla].quantity++;
    }

    this._storageService.set('cart', cart);
  }

  openModal(product: any) {
    const modalRef = this._modalService.open(ProductModalComponent);
    modalRef.componentInstance.product = product;
  }
}
