import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;

  const mockDatabaseService = {
    user: {
      findUnique: jest.fn(),
    },
  };

  const mockUser = {
    id: 1,
    name: 'Lucas',
    email: 'lucas@email.com',
    password: bcrypt.hashSync('Str0ngP4ssw0rd!', 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  describe('POST /auth/login', () => {
    it('200 -> login com sucesso, retorna accessToken', async () => {
      mockDatabaseService.user.findUnique.mockResolvedValue(mockUser);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'lucas@email.com', password: 'Str0ngP4ssw0rd!' })
        .expect(200);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toMatchObject({ name: 'Lucas', userId: 1 });
    });

    it('401 -> usuário não encontrado', async () => {
      mockDatabaseService.user.findUnique.mockResolvedValue(null);

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'naoexiste@email.com', password: 'Str0ngP4ssw0rd!' })
        .expect(401);
    });

    it('401 -> senha incorreta', async () => {
      mockDatabaseService.user.findUnique.mockResolvedValue(mockUser);

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'lucas@email.com', password: 'SenhaErrada!123' })
        .expect(401);
    });
  });

  describe('GET /auth/status', () => {
    it('200 -> retorna usuário autenticado', async () => {
      mockDatabaseService.user.findUnique.mockResolvedValue(mockUser);

      // primeiro faz login para pegar o token
      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'lucas@email.com', password: 'Str0ngP4ssw0rd!' });

      const token = loginResponse.body.accessToken;

      const response = await request(app.getHttpServer())
        .get('/auth/status')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toMatchObject({ name: 'Lucas' });
    });

    it('401 -> sem token', async () => {
      await request(app.getHttpServer())
        .get('/auth/status')
        .expect(401);
    });

    it('401 -> token inválido', async () => {
      await request(app.getHttpServer())
        .get('/auth/status')
        .set('Authorization', 'Bearer token.invalido.aqui')
        .expect(401);
    });
  });
});