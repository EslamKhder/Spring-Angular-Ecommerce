import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/productservice/product.service';
import {Router, RouterModule, Routes} from "@angular/router";
import { CategoryComponent } from './components/category/category.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {path: 'category/:id', component: ProductComponent},
  {path: 'product/search/:name', component: ProductComponent},
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
    ProductSearchComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {}
