import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';
import { AuthService } from './gateway/auth.service';
import { GatewayService } from './gateway/gateway.service';
import { UsersService } from './users/users.service';

@Module({
    imports: [
        JwtModule.register({
            signOptions: { expiresIn: '60s' }
        })
    ],
    controllers: [UsersController],
    providers: [GatewayService, UsersService, AuthService]
})
export class AppModule {}
