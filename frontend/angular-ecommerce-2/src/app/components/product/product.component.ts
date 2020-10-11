import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/productservice/product.service';
import { Product } from 'src/app/model/product';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product.component.html',
  // templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  productSearch: boolean;

  constructor(private productService: ProductService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.productSearch = this.route.snapshot.paramMap.has("name");
    if(this.productSearch){
      this.handleSearchProduct();
    } else {
      this.handleListProduct();
    }
  }
  handleSearchProduct(){
    const productSearchName: string = this.route.snapshot.paramMap.get("name");
    this.productService.getSearchProductList(productSearchName).subscribe(
      data => {
        this.products = data;
      }
    )
  }
  handleListProduct(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id");
    } else {
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
