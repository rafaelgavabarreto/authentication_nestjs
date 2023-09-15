import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInAuthenticationDto } from './dto/signIn-authentication.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInAuthenticationDto: SignInAuthenticationDto) {
    const user = await this.usersService.signIn(
      signInAuthenticationDto.email,
      signInAuthenticationDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { user_id: user.user_id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
