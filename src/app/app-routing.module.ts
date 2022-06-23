import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './src/cadastro/cadastro.component';
import { CarrinhoComponent } from './src/carrinho/carrinho.component';
import { ContatoComponent } from './src/contato/contato.component';
import { HomeComponent } from './src/home/home.component';
import { LoginComponent } from './src/login/login.component';
import { ProductsComponent } from './src/products/products.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'contact', component: ContatoComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'cart', component: CarrinhoComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
