import { Injectable } from '@angular/core';
import Web3 from 'web3';

const PRODUCT_ADDRESS = '0xEb86C72936b962Fec6Cba11d17fD4e95aaB8b8E4';
const PRODUCT_ABI = [
  {
    "inputs": [],
    "name": "max_products",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "products",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private web3js: any;
  private provider: any;
  private accounts: any;
  private product: any;

  constructor() { }

   async connectContract() {
     this.provider = Web3.givenProvider || 'http://127.0.0.1:7545';
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts();
    console.log(this.accounts[0]);
    this.product = new this.web3js.eth.Contract(PRODUCT_ABI, PRODUCT_ADDRESS);

    const max_products = await this.product.methods.products().call();
    console.log(max_products);
   }
}
