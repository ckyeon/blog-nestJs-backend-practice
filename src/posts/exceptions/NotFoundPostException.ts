import { NotFoundException } from '@nestjs/common';

export const NotFoundPostException = (id: string) => {
  return new NotFoundException(`Not Found Post ${id}`);
};
