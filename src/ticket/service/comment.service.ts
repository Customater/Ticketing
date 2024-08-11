import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CommentDTO } from '../service/dto/comment.dto';
import { CommentMapper } from '../service/mapper/comment.mapper';
import { CommentRepository } from '../repository/comment.repository';

const relationshipNames = [];
relationshipNames.push('ticket');
relationshipNames.push('author');

@Injectable()
export class CommentService {
  logger = new Logger('CommentService');

  constructor(@InjectRepository(CommentRepository) private commentRepository: CommentRepository) {}

  async findById(id: number): Promise<CommentDTO | undefined> {
    const options = { id: id, relations: relationshipNames };
    const result = await this.commentRepository.findOne(options);
    return CommentMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<CommentDTO>): Promise<CommentDTO | undefined> {
    const result = await this.commentRepository.findOne(options);
    return CommentMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<CommentDTO>): Promise<[CommentDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.commentRepository.findAndCount(options);
    const commentDTO: CommentDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(comment => commentDTO.push(CommentMapper.fromEntityToDTO(comment)));
      resultList[0] = commentDTO;
    }
    return resultList;
  }

  async save(commentDTO: CommentDTO, creator?: string): Promise<CommentDTO | undefined> {
    const entity = CommentMapper.fromDTOtoEntity(commentDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.commentRepository.save(entity);
    return CommentMapper.fromEntityToDTO(result);
  }

  async update(commentDTO: CommentDTO, updater?: string): Promise<CommentDTO | undefined> {
    const entity = CommentMapper.fromDTOtoEntity(commentDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.commentRepository.save(entity);
    return CommentMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.commentRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
