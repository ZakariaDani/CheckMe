import { Injectable } from '@angular/core';
import Web3 from 'web3';

const PRODUCT_ADDRESS = '0xEb86C72936b962Fec6Cba11d17fD4e95aaB8b8E4';
const PRODUCT_ABI = [
  {
    inputs: [],
    name: 'max_products',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'products',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
];

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private web3: any;
  private accounts: any;
  private product: any;


  constructor() {
    if (typeof this.web3 !== 'undefined') {
      this.web3 = new Web3(this.web3.currentProvider);
    } else {
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545')
      );
    }
  }

  async connectContract() {
    this.accounts = await this.web3.eth.getAccounts().then((result: any) => {
      console.log(result[0]);
    });
    const network = await this.web3.eth.net.getNetworkType();
    console.log(network);
    this.product = new this.web3.eth.Contract(PRODUCT_ABI, PRODUCT_ADDRESS);
    const max_products = await this.product.methods.products().call();
    console.log(max_products);
  }
}
