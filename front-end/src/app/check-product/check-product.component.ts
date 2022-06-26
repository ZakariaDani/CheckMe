import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-check-product',
  templateUrl: './check-product.component.html',
  styleUrls: ['./check-product.component.css'],
})
export class CheckProductComponent implements OnInit {
  constructor(private productService: ProductService) {}
  message = '';
  isMessageShown = false;
  productDetails: any = {
    creator: '',
    productName: '',
    price: null,
    dateCreation: '',
  };
  ngOnInit(): void {}

  async checkProduct(checkProductForm: NgForm) {
    if (checkProductForm.invalid) {
      return;
    }
    const productId = checkProductForm.value.productId;

    let result = await this.productService.checkProduct(productId);
    if (result == 'fake') {
      this.message = 'This product is fake ❌';
    } else {
      this.message = 'This product is real ✅';
      console.log(result);
      this.productDetails.creator = result.username;
      this.productDetails.productName = result.productName;
      this.productDetails.price = result.price;
      this.productDetails.dateCreation = result.date;
    }
    this.isMessageShown = true;
    checkProductForm.reset();
  }
}
