import { FindAttributeOptions, FindOptions as SequelizeFindOptions, Includeable, Model, ModelStatic, Order, Transaction, WhereOptions } from 'sequelize';
import { MakeNullishOptional } from 'sequelize/types/utils';

export type IncludeOptions<I extends string | undefined = undefined, R extends RepoOptions<I> = RepoOptions<I>> =
  Omit<R, 'transaction' | 'lock'> & {
    where?: WhereOptions;
    required?: boolean;
  };

export interface RepoOptions<I extends string | undefined = undefined> {
  includes?: I[];
  transaction?: Transaction;
  updateLock?: Transaction;
  shareLock?: Transaction;
}

export type Where<M extends Model> = WhereOptions<M> | (WhereOptions<M> | undefined | null | false)[];

export interface FindOptions<M extends Model, R> {
  where?: Where<M>;
  order?: Order | string[][];
  attributes?: FindAttributeOptions
  options?: Exclude<R, 'where'>;
  subQuery?: boolean;
}

export abstract class BaseRepo<M extends Model, I extends string | undefined = undefined, R extends RepoOptions<I> = RepoOptions<I>> {

  private readonly model: ModelStatic<M>;

  protected constructor(model: ModelStatic<M>) {
    this.model = model;
  }

  async findOne(options?: FindOptions<M, R>) {
    return this.model.findOne(this.constructFindOptions(options));
  }

  async findAll(options?: FindOptions<M, R>) {
    return this.model.findAll(this.constructFindOptions(options));
  }

  async create(entity: Partial<M>, transaction?: Transaction) {
    return this.model.create(entity as MakeNullishOptional<M>, { transaction });
  }

  private constructFindOptions(options?: FindOptions<M, R>): SequelizeFindOptions {
    return {
      where: options?.where as WhereOptions,
      order: options?.order as Order,
      attributes: options?.attributes,
      include: this.constructInclude(options?.options),
      subQuery: options?.subQuery,
      transaction: options?.options?.transaction || options?.options?.updateLock || options?.options?.shareLock,
      lock: options?.options?.updateLock ? Transaction.LOCK.UPDATE : options?.options?.shareLock ? Transaction.LOCK.SHARE : undefined
    };
  }

  constructInclude(_?: R): Includeable[] {
    return [];
  }

}
