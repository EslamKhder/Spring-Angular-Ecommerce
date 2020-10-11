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

  constructor(private httpClient: HttpClient) {
  }

  getProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(this.baseUrlProduct + "/" + productId);
  }

  getProductListPaginate(thePage: number,
                         thePageSize: number,
                         categoryId: number): Observable<GetResponseProducts> {
    const paginateUrl = this.baseUrlProduct + '/search/findByCategoryId?id=' + categoryId + "&page=" + thePage + "&size=" + thePageSize;
    return this.httpClient.get<GetResponseProducts>(paginateUrl);
  }

  getCategoryList(): Observable<Category[]> {
    return this.httpClient.get<GetResponseCategory>(this.baseUrlCategory).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getSearchProductListPaginate(thePageNumber: number,thePageSize: number,productName: string): Observable<GetResponseProducts> {
    const searchUrl: string = this.baseUrlProduct + '/search/findByNameContaining?name=' + productName + "&page=" + thePageNumber
                               + "&size=" + thePageSize;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
}
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page : {
    size: number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}
interface GetResponseCategory {
  _embedded: {
    productCategory: Category[];
  }
}
