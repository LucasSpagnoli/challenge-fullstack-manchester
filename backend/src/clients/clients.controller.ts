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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    return this.clientsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: Prisma.ClientsUpdateInput,
    @Req() req: RequestWithUser
  ) {
    return this.clientsService.update(id, req.user.id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    return this.clientsService.delete(id, req.user.id);
  }
}