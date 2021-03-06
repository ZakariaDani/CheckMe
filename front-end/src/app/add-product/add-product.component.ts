import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  qrProps = {
    isQrShown: false,
    elementType: NgxQrcodeElementTypes.URL,
    correctionLevel: NgxQrcodeErrorCorrectionLevels.HIGH,
    value: 'fake',
  };
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
    newProduct.username = this.getUsername();
    console.log(newProduct);
    this.productService.addProduct(newProduct);
    productForm.reset();
    this.qrProps.isQrShown = true;
    this.qrProps.value = newProduct.id.toString();
  }
}
