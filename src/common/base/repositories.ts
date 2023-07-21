import { Repository } from 'typeorm';
import { DEFAULT_SKIP, DEFAULT_TAKE, MAX_TAKE } from '../const';

export class RepositoryBase<Model> extends Repository<Model> {
  async parsePaginate(queryBuilder, { take, skip }): Promise<IPaginate> {
    skip = Number(skip) || DEFAULT_SKIP;
    take = Number(take) || DEFAULT_TAKE;
    if (take > MAX_TAKE) {
      take = MAX_TAKE;
    }
    const [items, total] = await queryBuilder
      .take(take)
      .skip(skip)
      .getManyAndCount();
    return createPaginationObject(
      items,
      total,
      Math.floor(skip / take) + 1,
      take,
    );
  }

  _queryLike(
    key: string,
    item: string,
    data: string,
    query: any,
    insensitive = true,
  ) {
    if (data.trim().length > 0) {
      const condition = {};
      condition[item] = `%${data.trim()}%`;
      if (insensitive) {
        query = query.andWhere(
          `LOWER(${key}.${item}) LIKE LOWER(:${item})`,
          condition,
        );
      } else {
        query = query.andWhere(`${key}.${item} LIKE :${item}`, condition);
      }
    }
    return query;
  }
}

export function createPaginationObject<T>(
  items: T[],
  totalItems: number,
  currentPage?: number,
  limit?: number,
) {
  currentPage = currentPage || 1;
  limit = limit || DEFAULT_TAKE;

  const totalPages = Math.ceil(totalItems / limit);

  return {
    items,
    totalItems,
    itemCount: items.length,
    itemsPerPage: limit,
    totalPages,
    currentPage,
  };
}
