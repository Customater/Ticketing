import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post as PostMethod,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CommentDTO } from '../../service/dto/comment.dto';
import { CommentService } from '../../service/comment.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/comments')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('comments')
export class CommentController {
  logger = new Logger('CommentController');

  constructor(private readonly commentService: CommentService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: CommentDTO,
  })
  async getAll(@Req() req: Request): Promise<CommentDTO[]> {
    const pageRequest: PageRequest = new PageRequest(
      parseInt(<string>req.query.page, 10),
      parseInt(<string>req.query.size, 10),
      <string>req.query.sort,
    );
    const [results, count] = await this.commentService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(
      req.res,
      new Page(results, count, pageRequest),
    );
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CommentDTO,
  })
  async getOne(@Param('id') id: number): Promise<CommentDTO> {
    return await this.commentService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CommentDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(
    @Req() req: Request,
    @Body() commentDTO: CommentDTO,
  ): Promise<CommentDTO> {
    const created = await this.commentService.save(commentDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Comment', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update comment' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CommentDTO,
  })
  async put(
    @Req() req: Request,
    @Body() commentDTO: CommentDTO,
  ): Promise<CommentDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Comment', commentDTO.id);
    return await this.commentService.update(commentDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update comment with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CommentDTO,
  })
  async putId(
    @Req() req: Request,
    @Body() commentDTO: CommentDTO,
  ): Promise<CommentDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Comment', commentDTO.id);
    return await this.commentService.update(commentDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Comment', id);
    return await this.commentService.deleteById(id);
  }
}
