import { EOrderBy } from '../enum';

export interface IQuery {
  page?: number;
  limit?: number;
  sort?: EOrderBy;
  search?: any;
  field?: string;
}
