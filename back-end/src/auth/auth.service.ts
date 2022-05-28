import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { RegisterUserDto } from 'src/DTO/registerUser.dto';
  import { ROLE, UserEntity } from 'src/Entity/user.entity';
  import { Repository } from 'typeorm';
  import * as bcrypt from 'bcryptjs';
  import { LoginUserDto } from 'src/DTO/loginUser.dto';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class AuthService {
    constructor(
      @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
      private jwt: JwtService,
    ) {}
  
    async registerUser(registerDto: RegisterUserDto) {
      const { email, username, password, role } = registerDto;
      const hashed = await bcrypt.hash(password, 12);
      const salt = await bcrypt.getSalt(hashed);
  
      const foundUser = await this.repo.findOne({ email });
  
      if (foundUser) {
        throw new BadRequestException('User already exists!');
      } else {
        console.log(hashed, salt);
  
        const user = new UserEntity();
        user.email = email;
        user.username = username;
        user.password = hashed;
        user.role = role;
        user.salt = salt;
  
        this.repo.create(user);
        try {
          return await this.repo.save(user);
        } catch (error) {
          throw new InternalServerErrorException('Something went wrong !');
        }
      }
    }
  
    async loginUser(logUserDto: LoginUserDto) {
      const { email, password } = logUserDto;
      const user = await this.repo.findOne({ email });
      if (!user) {
        throw new UnauthorizedException('Invalid Operation.');
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        const jwtPayload = { email: user.email, username: user.username, role: user.role };
        const jwtToken = await this.jwt.signAsync(jwtPayload, {
          expiresIn: '1d',
          algorithm: 'HS512',
        });
        return { token: jwtToken };
      } else {
        throw new UnauthorizedException('Invalid Operation.');
      }
    }
  }