import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    return user;
  }

  @ApiOperation({ summary: 'Sign up' })
  @Post()
  postUsers(@Body() data: JoinRequestDto) {
    this.userService.postUsers(data.email, data.nickname, data.password);
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
  @Post('login')
  login(@User() user) {
    return user;
  }

  @ApiOperation({ summary: 'Log out' })
  @Post('logout')
  logout(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
