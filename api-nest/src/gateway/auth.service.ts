import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    validate(token: string): any {
        return this.jwtService.verify(token, { secret: 'myRandomHash' });
    }
}
