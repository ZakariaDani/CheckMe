import { Injectable } from '@nestjs/common';
import { Contract } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { ConnectionService } from '../connection/connection.service';
import * as Product from 'build/contracts/ProductChain.json';

@Injectable()
export class ProductsService {
  private productChainContract: Contract;

  constructor(
    private readonly connectionService: ConnectionService,
    private readonly configService: ConfigService,
  ) {
    this.productChainContract = this.getProductChainContract();
  }
 
  

  addProduct(tx: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getProduct(): Promise<string>{
    try {
      const amount = await this.productChainContract.getProduct();
      console.log(amount + "*************--------------------------");
      return amount.toString();
    } catch (error) {
      throw new Error('Unable to get the amount');
    }
  }


  private getProductChainContract(): Contract {
    try {
      const productAddress = this.configService.get('PRODUCT_ADDRESS');
      console.log(productAddress+"---------------------------------------------");
      
      const productAbi = Product.abi;
      console.log(productAbi+ "*************************");
      
      return this.connectionService.launchToContract(
        productAddress,
        productAbi,
      );
      
    } catch (error) {
      throw new Error('Unable to connect to Product contract');
    }
  }
}
