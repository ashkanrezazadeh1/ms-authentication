import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Identity } from './entity/identity.entity';
import { SignupInputDTO } from './dto/signup.input.dto';
import * as bcrypt from 'bcrypt';

interface JwtPayload {
  username: string;
  generatedTime: number;
}

@Injectable()
export class AuthService {
  /*
  private readonly users: User[] = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
    },
  ];
*/
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Identity)
    private readonly userRepository: Repository<Identity>,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.generateToken(user);
    return { access_token: token };
  }

  private async validateUser(
    username: string,
    password: string,
  ): Promise<Identity | null> {
    // First find the user by username
    const user = await this.userRepository.findOne({ where: { username } });

    // If user not found, return null
    if (!user) {
      return null;
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is valid, return the user, otherwise return null
    return isPasswordValid ? user : null;
  }

  private async generateToken(user: Identity): Promise<string> {
    const payload: JwtPayload = {
      username: user.username,
      generatedTime: Date.now(),
    };
    return this.jwtService.sign(payload);
  }

  async register(iden: SignupInputDTO): Promise<string> {
    const identityItem = new Identity();
    identityItem.username = iden.username;
    identityItem.password = await bcrypt.hash(iden.password, 10);
    identityItem.name = iden.name;
    try {
      const sres = await this.userRepository.save(identityItem);
      return sres.id;
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException('Error creating user');
    }
  }
}
