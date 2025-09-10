import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from './dto/new-users.input';
import { UsersService } from './users.service';
import { Roles } from 'src/decorators/role.decorators';
import { EAppRoles, EOrderBy } from 'src/common/enum';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { IQuery } from 'src/common/interfaces/query.interface';

@Controller('users')
@ApiTags('USERS')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth('auth')
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @Roles(EAppRoles.ADMIN)
  findOneUser(@Req() request) {
    const { user } = request;
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }

  @ApiBearerAuth('auth')
  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(EAppRoles.ADMIN, EAppRoles.BASE)
  @ApiQuery({ type: Number, name: 'limit', required: false })
  @ApiQuery({ type: Number, name: 'page', required: false })
  @ApiQuery({ type: String, name: 'search', required: false })
  @ApiQuery({ type: String, name: 'field', required: false })
  @ApiQuery({ enum: EOrderBy, name: 'sort', required: false })
  findAllUser(@Query() query: IQuery) {
    return this.userService.findAll(query);
  }

  @Post()
  async register(@Body() userRegisterDto: UserRegisterDto) {
    return this.userService.saveUser(userRegisterDto);
  }
}
