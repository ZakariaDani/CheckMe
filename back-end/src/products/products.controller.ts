
  
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IsAddressPipe } from '../validation/is-address.pipe';
import { SignedTransferDto } from './dto/signed-transfer.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get('product/:address')
  getBalance(@Param('address', IsAddressPipe) address: string,
             ): Promise<string> {
    return this.productsService.getProduct(address);
  }

  @Post('add-product')
  sendCoin(@Body() signedTransfer: SignedTransferDto): Promise<void> {
    return this.productsService.addProduct(signedTransfer.tx);
  }
}