import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { UsersModule } from 'src/users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm'

describe('UserController (e2e)', () => {
  let app: INestApplication<App>;

  const mockUsers = [{ id: 1, name: 'Lucas' }]

  const mockUserRepository = {
    find: jest.fn().mockResolvedValue(mockUsers), // simular resultado
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(user => Promise.resolve({ id: 1, ...user }))
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(mockUsers)
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Lucas' })
      .expect(201)
      .expect(mockUsers)
      .then(response => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          name: 'Lucas'
        })
      })
  })

  it('/users (POST) -> 400 on validation error', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ name: 123 })
      .expect(400)
  })

  afterEach(async () => {
    await app.close();
  });
});
