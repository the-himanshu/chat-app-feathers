import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import { customAlphabet } from 'nanoid';
import { Params } from '@feathersjs/feathers';

const nanoid = customAlphabet(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  16
);

export class UserLikesMapping extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  async create(data: any, params?: Params): Promise<any> {
    data.id = nanoid();
    return super.create(data)
  }
}
