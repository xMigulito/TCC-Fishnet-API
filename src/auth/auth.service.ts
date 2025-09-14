import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.usuarioSIS.findFirst({
      where: { E_mail: email },
    });

    if (user && await bcrypt.compare(password, user.Senha)) {
      const { Senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.E_mail, 
      sub: user.id, 
      usuario: user.Usuario 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.E_mail,
        usuario: user.Usuario,
      },
    };
  }

  async register(email: string, usuario: string, password: string) {
    // Verificar se o usuário já existe
    const existingUser = await this.prisma.usuarioSIS.findFirst({
      where: {
        OR: [
          { E_mail: email },
          { Usuario: usuario },
        ],
      },
    });

    if (existingUser) {
      throw new UnauthorizedException('Email ou usuário já cadastrado');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário
    const user = await this.prisma.usuarioSIS.create({
      data: {
        id: Math.floor(Math.random() * 10000) + 1000, // ID temporário
        E_mail: email,
        Usuario: usuario,
        Senha: hashedPassword,
      },
    });

    const { Senha, ...result } = user;
    return result;
  }

  async getUserById(id: number) {
    return this.prisma.usuarioSIS.findFirst({
      where: { id },
    });
  }

  async getUserTanques(userId: number) {
    return this.prisma.tanqueUser.findMany({
      where: { Usuario_Sis_Id: userId },
    });
  }
}
