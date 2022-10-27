import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { AuthService } from './auth.service';

@WebSocketGateway({
    cors: {
        origin: '*'
    }
})
export class GatewayService
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    private server: Server;

    private logger: Logger = new Logger('AppGateway');

    constructor(private authService: AuthService) {}

    afterInit(server: Server) {
        server.use((socket: Socket, next: any) => {
            const accessToken = socket.handshake.auth.token;

            try {
                const { data } = this.authService.validate(accessToken);

                socket.data = data;

                return next();
            } catch (e) {
                this.logger.log('Unsuccessful communication attempt!');

                return next(new Error(e.message));
            }
        });
    }

    handleConnection(client: any, ...args: any[]) {
        this.logger.log('Connection established between client and server!');

        this.logger.log(`Client id: ${client.id}`);
    }

    @SubscribeMessage('msgToServer')
    handleMessage(name: string, payload: any) {
        this.server.emit(name, payload);

        this.logger.log(`Payload ${name} emited: ${payload}`);
    }

    handleDisconnect(client: any) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
}
