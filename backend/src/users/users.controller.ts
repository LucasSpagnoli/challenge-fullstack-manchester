import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { Prisma } from "@prisma/client";
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
    }

    @Post()
    create(@Body(ValidationPipe) createUserDTO: Prisma.UserCreateInput) {
        return this.usersService.create(createUserDTO)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updatedUserDTO: Prisma.UserUpdateInput) {
        return this.usersService.update(updatedUserDTO, id)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id)
    }
}
