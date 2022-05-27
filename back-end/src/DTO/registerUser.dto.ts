import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
import { ROLE } from "src/Entity/user.entity";


export class RegisterUserDto {
    

    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    @MinLength(6, {message: "choose a password between 6 and 12 characters"})
    @MaxLength(12, {message: "choose a password between 6 and 12 characters"})
    password: string;
    @IsNotEmpty()
    @Matches(/^CONSUMER$|^MANIFACTURER$/)
    role: ROLE;
}

