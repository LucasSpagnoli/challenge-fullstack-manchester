import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { UsersModule } from 'src/users/users.module';
import { DatabaseService } from 'src/database/database.service';

describe('UsersController (e2e)', () => {
  let app: INestApplication<App>;

  const mockDatabaseService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
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

  describe('POST /users', () => {
    const validBody = {
      name: 'Lucas',
      email: 'lucas@email.com',
      password: 'Str0ngP4ssw0rd!123456@@'
    };

    it('201 -> cria usuário com sucesso', async () => {
      mockDatabaseService.user.findUnique.mockResolvedValue(null);
      mockDatabaseService.user.create.mockResolvedValue({ id: 1, ...validBody });

      const response = await request(app.getHttpServer())
        .post('/users')
        .send({ ...validBody })
        .expect(201);

      expect(response.body).toMatchObject({ id: 1, name: 'Lucas', email: 'lucas@email.com' });
    });

    it('409 -> email já cadastrado', async () => {
      mockDatabaseService.user.findUnique.mockResolvedValue({ id: 1, ...validBody });

      await request(app.getHttpServer())
        .post('/users')
        .send(validBody)
        .expect(409);
    });

    it('400 -> body inválido (campos faltando)', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({ name: 'Lucas', email: '', password: '' })
        .expect(400);
    });

    it('400 -> senha fraca', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({ name: 'Lucas', email: 'lucas@email.com', password: '123456' })
        .expect(400);
    });
  });

  describe('GET /users/:id', () => {
    it('200 -> retorna usuário existente', async () => {
      const mockUser = { id: 1, name: 'Lucas', email: 'lucas@email.com' };
      mockDatabaseService.user.findUnique.mockResolvedValue(mockUser);

      const response = await request(app.getHttpServer())
        .get('/users/1')
        .expect(200);

      expect(response.body).toMatchObject(mockUser);
    });

    it('400 -> usuário não encontrado', async () => {
      mockDatabaseService.user.findUnique.mockResolvedValue(null);

      await request(app.getHttpServer())
        .get('/users/999')
        .expect(400);
    });

    it('400 -> id não é número', async () => {
      await request(app.getHttpServer())
        .get('/users/abc')
        .expect(400);
    });
  });

  describe('PATCH /users/:id', () => {
    it('200 -> atualiza usuário com sucesso', async () => {
      const updated = { id: 1, name: 'Lucas Atualizado', email: 'lucas@email.com' };
      mockDatabaseService.user.update.mockResolvedValue(updated);

      const response = await request(app.getHttpServer())
        .patch('/users/1')
        .send({ name: 'Lucas Atualizado' })
        .expect(200);

      expect(response.body.name).toBe('Lucas Atualizado');
    });
  });

  describe('DELETE /users/:id', () => {
    it('200 -> deleta usuário com sucesso', async () => {
      mockDatabaseService.user.delete.mockResolvedValue({ id: 1 });

      await request(app.getHttpServer())
        .delete('/users/1')
        .expect(200);
    });
  });
});