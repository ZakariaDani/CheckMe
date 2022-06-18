import { Injectable } from '@angular/core';
import Web3 from 'web3';

const PRODUCT_ADDRESS = '0x8B20f0d6Ee5Cb45665BF01Af003bc5014beAB052';

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
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'productItems',
    outputs: [
      {
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'productName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'date',
        type: 'string',
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
  {
    inputs: [
      {
        internalType: 'string',
        name: '_text',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_date',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'addProductItem',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getProductItems',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_a',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_b',
        type: 'string',
      },
    ],
    name: 'concat',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_productId',
        type: 'uint256',
      },
    ],
    name: 'searchProduct',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'deleteProductItem',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
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
        new Web3.providers.HttpProvider('HTTP://127.0.0.1:8545')
      );
    }
  }

  async connectContract() {
    await this.web3.eth.getAccounts().then((result: any) => {
      console.log(result[0]);
      this.accounts = result;
    });
    const network = await this.web3.eth.net.getNetworkType();
    console.log(network);
    this.product = new this.web3.eth.Contract(PRODUCT_ABI, PRODUCT_ADDRESS);
    const max_products = await this.product.methods.products().call();
    console.log(max_products);
  }

  addProduct(newProduct: any) {
    console.log('productIs:-----', newProduct.id);
    this.product.methods
      .addProductItem(newProduct.productName, newProduct.date, newProduct.id)
      .send({ from: this.accounts[0], gas: 1000000 });
  }
  async checkProduct(productId: any) {
    let output = await this.product.methods.searchProduct(+productId).call();
    return output;
  }
}
