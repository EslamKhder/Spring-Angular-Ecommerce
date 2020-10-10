import { Component, OnInit } from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../../services/productservice/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  searchProduct: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSearch(productname: string) {
    this.router.navigateByUrl(`product/search/${productname}`);
  }
}
