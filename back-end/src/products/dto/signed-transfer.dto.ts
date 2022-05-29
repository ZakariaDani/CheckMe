import { IsEmpty } from 'class-validator';

export class SignedTransferDto {
  @IsEmpty()
  tx: string;
}
