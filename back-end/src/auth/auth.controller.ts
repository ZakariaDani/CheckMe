import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { LoginUserDto } from 'src/DTO/loginUser.dto';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('register')
    registration(@Body(ValidationPipe) regDto: RegisterUserDto) {
        return this.authService.registerUser(regDto);
    }

    @Post('login')
    signIn(@Body(ValidationPipe) loginDto: LoginUserDto) {
        return this.authService.loginUser(loginDto);
    }
}