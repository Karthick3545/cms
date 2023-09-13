import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { Company } from './company/entities/company.entity';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { DocumentsModule } from './documents/documents.module';
import { Document } from './documents/entities/document.entity';
import { MacidsModule } from './macids/macids.module';
import { Macid } from './macids/entities/macid.entity';
import { ContentModule } from './content/content.module';
import { Content } from './content/entities/content.entity';
import { ScheduleModule } from './schedule/schedule.module';
import { Schedule } from './schedule/entities/schedule.entity';

@Module({
  controllers: [AppController],
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: null,
      database: 'nestjs',
      entities: [User, Company, Role, Document, Macid, Content, Schedule],
      synchronize: true,
    }),
    AuthModule,
    ProfileModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CompanyModule,
    PermissionModule,
    RoleModule,
    DocumentsModule,
    MacidsModule,
    ContentModule,
    ScheduleModule,
  ],
})
export class AppModule {}
