import { Comment } from '../../domain/comment.entity';
import { CommentDTO } from '../dto/comment.dto';

/**
 * A Comment mapper object.
 */
export class CommentMapper {
  static fromDTOtoEntity(entityDTO: CommentDTO): Comment {
    if (!entityDTO) {
      return;
    }
    let entity = new Comment();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Comment): CommentDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new CommentDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
