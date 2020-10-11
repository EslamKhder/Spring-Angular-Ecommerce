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

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  productSearch: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyWord: string = undefined;

  constructor(private productService: ProductService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {

    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.productSearch = this.route.snapshot.paramMap.has("name");
    if(this.productSearch) {
      this.handleSearchProduct();
    } else {
      this.handleListProduct();
    }
  }
  handleSearchProduct(){
    const productSearchName: string = this.route.snapshot.paramMap.get("name");
    if(this.previousKeyWord != productSearchName){
      this.thePageNumber = 1;
    }
    this.previousKeyWord = productSearchName;
    this.productService.getSearchProductListPaginate(this.thePageNumber - 1,
                                                                  this.thePageSize
                                                                  ,productSearchName).subscribe(this.processResult());

  }
  handleListProduct(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id");
    } else {
      this.currentCategoryId = 1;
    }
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(this.processResult());
  }ث
  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements
    };
  }
  updatePageSize(event) {
    this.thePageSize = event.target.value;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(tempProduct: Product) {
    console.log("Name : " + tempProduct.name + "   Price: " + tempProduct.unitPrice)
  }
}
