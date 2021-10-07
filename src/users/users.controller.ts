import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in.guard';
import { User } from '../common/decorators/user.decorator';
import { UserDto } from '../common/dto/user.dto';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiResponse({
    type: UserDto,
  })
  @ApiOperation({ summary: "Get User's information" })
  @Get()
  getUsers(@User() user) {
    return user || false;
  }

  @UseGuards(new NotLoggedInGuard())
  @ApiOperation({ summary: 'Sign up' })
  @Post()
  async join(@Body() data: JoinRequestDto) {
    await this.userService.join(data.email, data.nickname, data.password);
  }

  @ApiResponse({
    status: 200,
    description: 'success',
    type: UserDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error',
  })
  @ApiOperation({ summary: 'Login' })
  @UseGuards(new LocalAuthGuard())
  @Post('login')
  login(@User() user) {
    return user;
  }

  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: 'Log out' })
  @Post('logout')
  logout(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
