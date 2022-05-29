import { Injectable } from '@nestjs/common';
import { Contract } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { ConnectionService } from '../connection/connection.service';
import * as Product from 'build/contracts/ProductContract.json';

@Injectable()
export class ProductsService {
  addProduct(tx: string): Promise<void> {
      throw new Error('Method not implemented.');
  }
  
  getProduct(address: string): Promise<string> {
      throw new Error('Method not implemented.');
  }
  private productContract: Contract;

  constructor(private readonly connectionService: ConnectionService,
              private readonly configService: ConfigService) {
    this.productContract = this.getProductContract();
  }

  private getProductContract(): Contract {
    try {
      const productAddress = this.configService.get('PRODUCT_ADDRESS');
      const productAbi = Product.abi;
      return this.connectionService.launchToContract(productAddress, productAbi);
    } catch (error) {
      throw new Error('Unable to connect to Product contract');
    }
  }
}