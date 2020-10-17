import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/productservice/product.service';
import {RouterModule, Routes} from "@angular/router";
import { CategoryComponent } from './components/category/category.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import {FormsModule} from "@angular/forms";
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

const routes: Routes = [
  {path: "cartdetails",component: CartDetailsComponent},
  {path: 'category/:id', component: ProductComponent},
  {path: 'product/search/:name', component: ProductComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'category', component: ProductComponent},
  {path: 'products', component: ProductComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'},
];
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CategoryComponent,
    ProductSearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {}
