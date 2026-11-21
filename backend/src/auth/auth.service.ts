import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

interface InMemoryUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly inMemoryUsers = new Map<string, InMemoryUser>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {
    // Seed default demo user in memory for offline testing
    bcrypt.hash('Password123!', 10).then((hash) => {
      const demoId = randomUUID();
      this.inMemoryUsers.set('demo@bugrefinery.com', {
        id: demoId,
        email: 'demo@bugrefinery.com',
        passwordHash: hash,
        name: 'Demo Admin',
        role: 'ADMIN',
      });
    });
  }

  private hasDatabase(): boolean {
    return Boolean(this.config.get<string>('DATABASE_URL'));
  }

  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();

    if (this.hasDatabase()) {
      try {
        const existing = await this.prisma.user.findUnique({
          where: { email },
        });

        if (existing) {
          throw new ConflictException('An account with this email already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(dto.password, salt);

        const user = await this.prisma.user.create({
          data: {
            email,
            passwordHash,
            name: dto.name.trim(),
            role: 'USER',
          },
        });

        const token = this.generateToken(user.id, user.email, user.role);
        return {
          user: { id: user.id, email: user.email, name: user.name, role: user.role },
          accessToken: token,
        };
      } catch (dbErr) {
        if (dbErr instanceof ConflictException) throw dbErr;
        this.logger.warn(`Prisma user registration failed, falling back to memory store: ${(dbErr as Error).message}`);
      }
    }

    // In-memory fallback
    if (this.inMemoryUsers.has(email)) {
      throw new ConflictException('An account with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);
    const id = randomUUID();
    const memoryUser: InMemoryUser = {
      id,
      email,
      passwordHash,
      name: dto.name.trim(),
      role: 'USER',
    };

    this.inMemoryUsers.set(email, memoryUser);
    const token = this.generateToken(id, email, memoryUser.role);
    return {
      user: { id, email, name: memoryUser.name, role: memoryUser.role },
      accessToken: token,
    };
  }

  async login(dto: LoginDto) {
    const email = dto.email.trim().toLowerCase();

    if (this.hasDatabase()) {
      try {
        const user = await this.prisma.user.findUnique({
          where: { email },
        });

        if (user) {
          const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
          if (!isMatch) {
            throw new UnauthorizedException('Invalid email or password');
          }

          const token = this.generateToken(user.id, user.email, user.role);
          return {
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
            accessToken: token,
          };
        }
      } catch (dbErr) {
        if (dbErr instanceof UnauthorizedException) throw dbErr;
        this.logger.warn(`Prisma user lookup failed, falling back to memory store: ${(dbErr as Error).message}`);
      }
    }

    // In-memory fallback
    const memoryUser = this.inMemoryUsers.get(email);
    if (!memoryUser) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(dto.password, memoryUser.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.generateToken(memoryUser.id, memoryUser.email, memoryUser.role);
    return {
      user: { id: memoryUser.id, email: memoryUser.email, name: memoryUser.name, role: memoryUser.role },
      accessToken: token,
    };
  }

  private generateToken(userId: string, email: string, role: string): string {
    return this.jwtService.sign({
      sub: userId,
      email,
      role,
    });
  }
}
