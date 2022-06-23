import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './src/home/home.component';
import { ProductsComponent } from './src/products/products.component';
import { CadastroComponent } from './src/cadastro/cadastro.component';
import { CarrinhoComponent } from './src/carrinho/carrinho.component';
import { ContatoComponent } from './src/contato/contato.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LuxonModule } from 'luxon-angular';
import { ProductModalComponent } from './src/products/product-modal/product-modal.component';
import { LoginComponent } from './src/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    CadastroComponent,
    CarrinhoComponent,
    ContatoComponent,
    ProductModalComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    LuxonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
