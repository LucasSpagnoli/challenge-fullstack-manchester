import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import type { RequestWithUser } from 'src/types/request-with-user';

@UseGuards(JwtAuthGuard)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post()
  create(
    @Body() createClientDto: Prisma.ClientsCreateInput,
    @Req() req: RequestWithUser
  ) {
    return this.clientsService.create({
      ...createClientDto,
      user_id: req.user.id
    });
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    return this.clientsService.findAll(req.user.id);
  }

  @Get(':client_id')
  findOne(@Param('id', ParseIntPipe) client_id: number, @Req() req: RequestWithUser) {
    return this.clientsService.findOne(client_id, req.user.id);
  }

  @Patch(':client_id')
  update(
    @Param('client_id', ParseIntPipe) client_id: number,
    @Body() updateClientDto: Prisma.ClientsUpdateInput,
    @Req() req: RequestWithUser
  ) {
    return this.clientsService.update(client_id, req.user.id, updateClientDto);
  }

  @Delete(':client_id')
  remove(@Param('client_id', ParseIntPipe) client_id: number, @Req() req: RequestWithUser) {
    return this.clientsService.delete(client_id, req.user.id);
  }
}