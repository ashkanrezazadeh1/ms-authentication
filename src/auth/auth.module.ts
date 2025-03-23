import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Identity } from './entity/identity.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes .env available globally
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'hard!to-guess_secret',
        signOptions: { expiresIn: '60s' },
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD.toString(),
      database: process.env.DB_NAME,
      entities: [Identity],
      synchronize: false,
      logging: true,
    }),
    TypeOrmModule.forFeature([Identity]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
