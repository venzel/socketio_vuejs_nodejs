import { Injectable } from '@nestjs/common';
import { GatewayService } from 'src/gateway/gateway.service';

@Injectable()
export class UsersService {
    constructor(private gatewayService: GatewayService) {}

    execute() {
        const payload = {
            id: 200
        };

        this.gatewayService.handleMessage('changeStatus', payload);
    }
}
