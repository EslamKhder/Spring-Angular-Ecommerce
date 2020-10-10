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
    return this.httpClient.get<GetResponseProduct>(this.baseUrlProduct + '/search/findByCategoryId?id=' + categoryId).pipe(
      map(response => response._embedded.products)
    );
  }
  getCategoryList(): Observable<Category[]> {
    return this.httpClient.get<GetResponseCategory>(this.baseUrlCategory).pipe(
      map(response => response._embedded.productCategory)
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
