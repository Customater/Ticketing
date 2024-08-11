import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { TicketDTO } from '../service/dto/ticket.dto';
import { TicketMapper } from '../service/mapper/ticket.mapper';
import { TicketRepository } from '../repository/ticket.repository';

const relationshipNames = [];
relationshipNames.push('customer');
relationshipNames.push('assignedAgent');

@Injectable()
export class TicketService {
  logger = new Logger('TicketService');

  constructor(
    @InjectRepository(TicketRepository)
    private ticketRepository: TicketRepository,
  ) {}

  async findById(id: number): Promise<TicketDTO | undefined> {
    const options = { id: id, relations: relationshipNames };
    const result = await this.ticketRepository.findOne(options);
    return TicketMapper.fromEntityToDTO(result);
  }

  async findByFields(
    options: FindOneOptions<TicketDTO>,
  ): Promise<TicketDTO | undefined> {
    const result = await this.ticketRepository.findOne(options);
    return TicketMapper.fromEntityToDTO(result);
  }

  async findAndCount(
    options: FindManyOptions<TicketDTO>,
  ): Promise<[TicketDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.ticketRepository.findAndCount(options);
    const ticketDTO: TicketDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach((ticket) =>
        ticketDTO.push(TicketMapper.fromEntityToDTO(ticket)),
      );
      resultList[0] = ticketDTO;
    }
    return resultList;
  }

  async save(
    ticketDTO: TicketDTO,
    creator?: string,
  ): Promise<TicketDTO | undefined> {
    const entity = TicketMapper.fromDTOtoEntity(ticketDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.ticketRepository.save(entity);
    return TicketMapper.fromEntityToDTO(result);
  }

  async update(
    ticketDTO: TicketDTO,
    updater?: string,
  ): Promise<TicketDTO | undefined> {
    const entity = TicketMapper.fromDTOtoEntity(ticketDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.ticketRepository.save(entity);
    return TicketMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.ticketRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException(
        'Error, entity not deleted!',
        HttpStatus.NOT_FOUND,
      );
    }
    return;
  }
}
