import { Component, OnInit } from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../../services/productservice/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartItem} from "../../model/cart-item";
import {CartService} from "../../services/cartservices/cart.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService :ProductService,
              private route: ActivatedRoute,
              private cart: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProduct();
    })
  }
  getProduct(){
    const idProduct = +this.route.snapshot.paramMap.get("id");
    this.productService.getProduct(idProduct).subscribe(
      data => {
        this.product = data;
      }
    )
  }
  addToCart(tempProduct: Product) {
    this.cart.addToCart(new CartItem(tempProduct));
  }
}
