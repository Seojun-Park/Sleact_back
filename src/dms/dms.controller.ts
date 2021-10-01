import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('DM')
@Controller('api/workspaces/:url/dms')
export class DmsController {
  @ApiParam({
    name: 'url',
    required: true,
    description: "workspace's url",
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'user id',
  })
  @ApiQuery({
    name: 'perPage',
    required: true,
    description: 'Quantities of data',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    description: 'target page',
  })
  @Get(':id/chats')
  getChat(@Query() query, @Param('id') id, @Param('url') url) {
    console.log(query, url);
  }

  @Post(':id/chats')
  postChat(@Body() data) {}
}
