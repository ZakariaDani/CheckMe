import { Injectable } from '@angular/core';
import Web3 from 'web3';

const PRODUCT_ADDRESS = '0x5df55332b664a11182c4C54520af212B8d54521d';

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
        name: 'username',
        type: 'string',
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
        internalType: 'uint256',
        name: 'price',
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
        name: '_username',
        type: 'string',
      },
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
      {
        internalType: 'uint256',
        name: '_price',
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
        name: '_productId',
        type: 'uint256',
      },
    ],
    name: 'getProduct',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'username',
            type: 'string',
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
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'date',
            type: 'string',
          },
        ],
        internalType: 'struct Product.ProductItem',
        name: '_productItem',
        type: 'tuple',
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
      .addProductItem(
        newProduct.username,
        newProduct.productName,
        newProduct.date,
        newProduct.id,
        newProduct.price
      )
      .send({ from: this.accounts[0], gas: 1000000 });
  }
  async checkProduct(productId: any) {
    let output = await this.product.methods.searchProduct(+productId).call();
    if (output != 'fake') {
      let prod = await this.product.methods.getProduct(+productId).call();
      return prod;
    } else {
      return output;
    }
  }
}
