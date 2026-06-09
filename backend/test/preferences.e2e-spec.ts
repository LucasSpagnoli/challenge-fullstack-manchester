import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { PreferencesModule } from 'src/preferences/preferences.module';
import { DatabaseService } from 'src/database/database.service';

describe('PreferencesController (e2e)', () => {
  let app: INestApplication<App>;

  const mockDatabaseService = {
    preferences: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PreferencesModule],
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

  describe('POST /preferences', () => {
    const validBody = { user_id: 1, topic: 'PETR4' };

    it('201 -> cria preferência com sucesso', async () => {
      mockDatabaseService.preferences.create.mockResolvedValue({ id: 1, ...validBody });

      const response = await request(app.getHttpServer())
        .post('/preferences')
        .send(validBody)
        .expect(201);

      expect(response.body).toMatchObject({ user_id: 1, topic: 'PETR4' });
    });

    it('400 -> user_id ausente', async () => {
      await request(app.getHttpServer())
        .post('/preferences')
        .send({ topic: 'PETR4' })
        .expect(400);
    });
  });

  describe('GET /preferences/:id', () => {
    it('200 -> retorna preferências do usuário', async () => {
      const mockPref = { id: 1, user_id: 1, topic: 'PETR4' };
      mockDatabaseService.preferences.findUnique.mockResolvedValue(mockPref);

      const response = await request(app.getHttpServer())
        .get('/preferences/1')
        .expect(200);

      expect(response.body).toMatchObject(mockPref);
    });

    it('400 -> usuário sem preferências cadastradas', async () => {
      mockDatabaseService.preferences.findUnique.mockResolvedValue(null);

      await request(app.getHttpServer())
        .get('/preferences/999')
        .expect(400);
    });

    it('400 -> id não é número', async () => {
      await request(app.getHttpServer())
        .get('/preferences/abc')
        .expect(400);
    });
  });

  describe('PATCH /preferences', () => {
    const validBody = { user_id: 1, topic: 'VALE3' };

    it('200 -> atualiza preferência com sucesso', async () => {
      const updated = { id: 1, user_id: 1, topic: 'VALE3' };
      mockDatabaseService.preferences.update.mockResolvedValue(updated);

      const response = await request(app.getHttpServer())
        .patch('/preferences')
        .send(validBody)
        .expect(200);

      expect(response.body).toMatchObject(updated);
    });

    it('400 -> user_id ausente', async () => {
      await request(app.getHttpServer())
        .patch('/preferences')
        .send({ topic: 'VALE3' })
        .expect(400);
    });
  });
});