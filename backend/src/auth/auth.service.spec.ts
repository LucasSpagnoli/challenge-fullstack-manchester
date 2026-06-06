import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user and return that', async () => {
    const dto = { name: 'Lucas', email: "spanholi@gmail.com", password: "password2410" }
    expect(await service.create(dto)).toEqual({
      id: expect.any(Number),
      name: dto.name
    })
  })

  describe('AuthService erros', () => {
    let service: AuthService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [AuthService],
      }).compile();
      service = module.get<AuthService>(AuthService);
    });

    it('should get an error on input name (3 letters)', () => {
      const dto = { name: 'abc', email: "spanholi@gmail.com", password: "password2410" }
      expect(await service.create(dto)).toEqual({
        id: expect.any(Number),
        name: dto.name
      })

    })
    it('should get an error on input name (not string)', () => {
      const dto = { name: 123, email: "spanholi@gmail.com", password: "password2410" }
      expect(await service.create(dto)).toEqual({
        id: expect.any(Number),
        name: dto.name
      })
    })

    it('should get an error on input password', () => {
      // password must have numbers and special characters
    })
  })
})