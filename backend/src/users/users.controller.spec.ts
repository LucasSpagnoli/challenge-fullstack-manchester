import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

// mock é uma simulação de algo que dá muito trampo consultar. Por exemplo, ao invés de acessar tua api lá nos galpões da Suiça, tu simula ela pro teu código não fazer toda essa viagem. Isso te dá vantagem de tempo e, assim, tu consegue testar só tua parte do programa.

describe('UsersController', () => {
  let controller: UsersController;

  // simula o UsersService
  const mockUsersService = {
    // create: jest.fn(async dto => ({
    //     id: 1,
    //     ...dto
    //   })), dá no mesmo que o abaixo:
    create: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Lucas',
    }), // implementa falsamente o create
    update: jest.fn((id, dto) => ({
      id,
      ...dto
    }))
      .mockImplementation
  }

  beforeEach(() => {
    jest.clearAllMocks();
  }); // limpa os mocks pra não dar erro nos próximos testes

  beforeEach(async () => {
    // simula o módulo do usuário
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    }).overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an user', () => {
    const dto = { name: 'Lucas' }
    await expect(
      controller.create(dto)) // assumindo que essa requisição já existe no controller
      .resolves.toEqual({
        id: expect.any(Number),
        name: dto.name
      })

    // expect(mockUsersService.create).toHaveBeenCalled()
    expect(mockUsersService.create)
      .toHaveBeenCalledWith(dto)
  })

  it('should update an user', () => {
    const dto = { name: 'Murilo' }

    expect(controller.update('1', dto)).toEqual({ // o "1" tá me string pq vem de param da url
      id: 1,
      ...dto
    })
  })
});
