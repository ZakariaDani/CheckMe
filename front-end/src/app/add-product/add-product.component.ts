import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  getUsername() {
    return localStorage.getItem('username') || '';
  }

  addProduct(productForm: NgForm) {
    if (productForm.invalid) {
      return;
    }
    const newProduct = productForm.value;
    newProduct.date = new Date().toISOString();
    newProduct.id = Math.floor(Math.random() * 100000) + 1;
    this.productService.addProduct(newProduct);
    productForm.reset();
  }
}
