import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { utils } from 'ethers';

@Injectable()
export class IsAddressPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!utils.isAddress(value)) throw new BadRequestException(`'${metadata.data}' ${metadata.type} should be an address`);
    return value;
  }
}
