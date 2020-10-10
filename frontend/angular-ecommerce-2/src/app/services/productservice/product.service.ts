import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../model/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Category} from "../../model/category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrlProduct = 'http://localhost:8080/api/products';

  private baseUrlCategory = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl: string = '/search/findByCategoryId?id=' + categoryId;
    return this.getProducts(searchUrl);
  }

  getCategoryList(): Observable<Category[]> {
    return this.httpClient.get<GetResponseCategory>(this.baseUrlCategory).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getSearchProductList(productName: string): Observable<Product[]> {
    const searchUrl: string = '/search/findByNameContaining?name=' + productName;
    return this.getProducts(searchUrl);
  }

  getProducts (url: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(this.baseUrlProduct + url).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseCategory {
  _embedded: {
    productCategory: Category[];
  }
}
