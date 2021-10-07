import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { DmsModule } from './dms/dms.module';
import { DmsController } from './dms/dms.controller';
import { ChannelsModule } from './channels/channels.module';
import { ChannelsController } from './channels/channels.controller';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { WorkspacesController } from './workspaces/workspaces.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormConfig from '../ormconfig';
import { Users } from './entities/Users';
import { AuthModule } from './auth/auth.module';
import { WorkspaceMembers } from './entities/WorkspaceMembers';
import { ChannelMembers } from './entities/ChannelMembers';
import { Workspaces } from './entities/Workspaces';
import { Channels } from './entities/Channels';
import { WorkspacesService } from './workspaces/workspaces.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature([
      Users,
      WorkspaceMembers,
      ChannelMembers,
      Workspaces,
      Channels,
    ]),
  ],
  controllers: [
    AppController,
    UsersController,
    WorkspacesController,
    ChannelsController,
    DmsController,
  ],
  providers: [AppService, UsersService, WorkspacesService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
