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
      description:
        'Bola de basquete marca SPALDING, tamanho 7 otimo para quadra oficial ou de rua!',
    },
    {
      name: 'Barraca',
      price: '230',
      url: './../../../assets/imagens/Barraca.png',
      description: 'Uma Barraca',
    },
    {
      name: 'Calça Femimina',
      price: '50',
      url: './../../../assets/imagens/Calça Fem.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Enim tortor at auctor urna nunc id cursus metus. Lectus magna fringilla urna porttitor rhoncus dolor. Sed odio morbi quis commodo. In nibh mauris cursus mattis molestie a iaculis.',
    },
    {
      name: 'Bicicleta CALOI',
      price: '1850',
      url: './../../../assets/imagens/CALOI.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel facilisis volutpat est velit. Ipsum suspendisse ultrices gravida dictum fusce ut. Velit ut tortor pretium viverra suspendisse potenti nullam ac. Et netus et malesuada fames. Pellentesque adipiscing commodo elit at imperdiet dui. Ac tortor vitae purus faucibus ornare. Sagittis purus sit amet volutpat consequat mauris nunc congue. Quam pellentesque nec nam aliquam sem et tortor. Id ornare arcu odio ut sem nulla pharetra diam.',
    },
    {
      name: 'Sapato Infantil Fem',
      price: '50',
      url: './../../../assets/imagens/Sapato Infantil Fem.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent semper feugiat nibh sed. Rhoncus dolor purus non enim praesent. Est ante in nibh mauris cursus mattis molestie a. Mauris nunc congue nisi vitae suscipit tellus mauris. Tincidunt nunc pulvinar sapien et. Enim blandit volutpat maecenas volutpat blandit aliquam. Integer eget aliquet nibh praesent tristique magna sit amet purus. Accumsan tortor posuere ac ut. Sed risus ultricies tristique nulla aliquet enim.',
    },
    {
      name: 'Tenis Fem',
      price: '200',
      url: './../../../assets/imagens/Tenis Fem.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur libero id faucibus nisl tincidunt eget nullam non nisi. Vulputate odio ut enim blandit volutpat. Risus viverra adipiscing at in tellus integer feugiat. Cras fermentum odio eu feugiat pretium nibh ipsum consequat. Augue interdum velit euismod in pellentesque massa placerat. Massa massa ultricies mi quis hendrerit dolor. Ante in nibh mauris cursus. Vestibulum sed arcu non odio euismod lacinia at quis risus. Eu scelerisque felis imperdiet proin fermentum leo. Ultricies mi quis hendrerit dolor magna. Tortor pretium viverra suspendisse potenti nullam ac tortor.',
    },
    {
      name: 'Camisa Fem',
      price: '40',
      url: './../../../assets/imagens/Camisa Fem.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Sit amet consectetur adipiscing elit ut aliquam. Purus faucibus ornare suspendisse sed nisi lacus sed viverra. Et ligula ullamcorper malesuada proin libero nunc consequat interdum. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Magna eget est lorem ipsum dolor. Cras fermentum odio eu feugiat pretium nibh. Nec feugiat nisl pretium fusce. Habitant morbi tristique senectus et netus et malesuada. A arcu cursus vitae congue mauris rhoncus aenean vel elit. Porta lorem mollis aliquam ut porttitor leo a. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. In metus vulputate eu scelerisque. Facilisis volutpat est velit egestas. Elementum tempus egestas sed sed risus pretium quam vulputate. Fusce id velit ut tortor.',
    },
    {
      name: 'Camisa Masc',
      price: '40',
      url: './../../../assets/imagens/Camisa MASC.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At lectus urna duis convallis convallis tellus. Sodales ut eu sem integer vitae justo eget magna fermentum. Quam quisque id diam vel. Integer vitae justo eget magna fermentum iaculis eu non. Pulvinar elementum integer enim neque. Aenean sed adipiscing diam donec. Mi bibendum neque egestas congue quisque egestas diam in. Nec nam aliquam sem et tortor consequat id porta. In tellus integer feugiat scelerisque varius morbi enim. Gravida neque convallis a cras semper auctor.',
    },
    {
      name: 'Meia',
      price: '15',
      url: './../../../assets/imagens/Meia.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In dictum non consectetur a erat nam at. Fusce ut placerat orci nulla pellentesque. Pharetra convallis posuere morbi leo urna. Accumsan sit amet nulla facilisi morbi tempus iaculis. Quis imperdiet massa tincidunt nunc pulvinar sapien et. Eu non diam phasellus vestibulum lorem sed risus. Eget nulla facilisi etiam dignissim diam quis. Eleifend donec pretium vulputate sapien nec. At imperdiet dui accumsan sit amet nulla facilisi morbi. Augue eget arcu dictum varius.',
    },
    {
      name: 'Mochila',
      price: '89',
      url: './../../../assets/imagens/Mochila.png',
      description:
        'nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum',
    },
    {
      name: 'Bicicleta SPACELINE',
      price: '800',
      url: './../../../assets/imagens/SPACELINE.png',
      description:
        'tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam nulla',
    },
    {
      name: 'Mesa de PING-PONG',
      price: '1500',
      url: './../../../assets/imagens/Tenis de Mesa.png',
      description:
        'nec nam aliquam sem et tortor consequat id porta nibh venenatis cras sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac',
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
