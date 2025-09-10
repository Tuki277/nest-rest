import { Model, Schema } from 'mongoose';
import { DEFAULT_SKIP, DEFAULT_TAKE, MAX_TAKE } from '../const';

export class MongoRepositoryBase {
  schema: Model<Schema>;
  constructor(schema) {
    this.schema = schema;
  }

  findOne(condition) {
    return this.schema.findOne(condition);
  }

  find(conditions) {
    return this.schema.find(conditions);
  }

  getRecordById(id) {
    return this.schema.findById(id);
  }

  updateRecordById(_id, data) {
    return this.schema.updateOne({ _id }, data);
  }

  deleteRecordById(id) {
    return this.schema.findByIdAndDelete(id);
  }

  deleteManyRecord(data) {
    return this.schema.deleteMany(data);
  }

  insertRecord(recordData) {
    const record = new this.schema(recordData);
    return record.save();
  }

  updateRecord(record) {
    return record.save();
  }

  getRawRecordById(id) {
    return this.schema.findById(id);
  }

  async getRawRecordsByIds(ids) {
    const conditions = {
      _id: {
        $in: ids,
      },
    };

    return this.schema.find(conditions);
  }

  countRecords(conditions) {
    return this.schema.countDocuments(conditions);
  }

  _handleSort(sortRules) {
    return Object.keys(sortRules).some(
      (ele) => ele === '_id' || ele === 'createdAt',
    );
  }

  getPage({ skip, take }) {
    skip = Number(skip) || DEFAULT_SKIP;
    take = Number(take) || DEFAULT_TAKE;
    if (take > MAX_TAKE) {
      take = MAX_TAKE;
    }
    return { skip, take };
  }

  pagedData(items: any[], totalCount: number, { skip, take }) {
    return createPaginationObject(
      items,
      totalCount,
      Math.floor(skip / take) + 1,
      take,
    );
  }
}

export function createPaginationObject<T>(
  items: T[],
  totalItems: number,
  currentPage?: number,
  limit?: number,
) {
  currentPage = currentPage || 1;

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
