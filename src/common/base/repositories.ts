import { Repository } from 'typeorm';
import { DEFAULT_SKIP, DEFAULT_TAKE, MAX_TAKE } from '../const';
import { EOrderBy } from '../enum';

export class RepositoryBase<Model> extends Repository<Model> {
  async parsePaginate(queryBuilder, { limit, page }): Promise<IPaginate> {
    let take = Number(limit) || DEFAULT_TAKE;
    const skip = (Number(page - 1) || DEFAULT_SKIP) * take;
    if (take > MAX_TAKE) {
      take = MAX_TAKE;
    }
    if (take <= 0 || skip < 0) {
      return createPaginationObject([], 0, Math.floor(skip / take) + 1, take);
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

  _orderBy(key: string, item: string, data: EOrderBy, query: any) {
    if (data.trim().length > 0) {
      query = query.orderBy(`${key}.${item}`, data.toUpperCase());
    } else {
      query = query.orderBy(`${key}.${item}`, 'ASC');
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
