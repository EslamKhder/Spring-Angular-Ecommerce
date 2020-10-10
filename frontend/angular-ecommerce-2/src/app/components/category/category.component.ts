import { Component, OnInit } from '@angular/core';
import {Category} from "../../model/category";
import {ProductService} from "../../services/productservice/product.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listCategory();
  }
  listCategory() {
    this.productService.getCategoryList().subscribe(
      data => {
        this.categories = data;
      }
    )
  }

}
