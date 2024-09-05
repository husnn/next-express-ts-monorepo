import { ID } from '@starter/shared';

export interface Repository<T> {
  get(id: ID): Promise<T>;
  getBatch(ids: Array<ID>): Promise<T[]>;
  find(query: Partial<T>): Promise<T[]>;
  findOne(query: Partial<T>): Promise<T>;
  create(item: Partial<T>): Promise<T>;
  update(
    item: (Partial<T> & { id: ID }) | Array<Partial<T> & { id: ID }>
  ): Promise<T>;
  remove(item: T): Promise<T>;
}

export default Repository;
