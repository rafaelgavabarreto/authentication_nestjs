import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInAuthenticationDto } from './dto/signIn-authentication.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}
  signIn(signInAuthenticationDto: SignInAuthenticationDto) {
    return this.usersService.signIn(
      signInAuthenticationDto.email,
      signInAuthenticationDto.password,
    );
  }
}
