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
  ngOnInit(): void {}

  async checkProduct(checkProductForm: NgForm) {
    if (checkProductForm.invalid) {
      return;
    }
    const productId = checkProductForm.value.productId;

    let result = await this.productService.checkProduct(productId);
    if (result == 'fake') {
      this.message = 'This product is fake';
    } else {
      this.message = 'This product is real';
    }
    this.isMessageShown = true;
    checkProductForm.reset();
  }
}
