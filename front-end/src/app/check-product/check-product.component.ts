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

  ngOnInit(): void {}

  checkProduct(checkProductForm: NgForm) {
    if (checkProductForm.invalid) {
      return;
    }
    const productId = checkProductForm.value.productId;

    this.productService.checkProduct(productId);
    checkProductForm.reset();
  }
}
