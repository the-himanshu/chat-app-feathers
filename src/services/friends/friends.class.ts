import { Id, Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { customAlphabet } from 'nanoid';
import { Application } from '../../declarations';

const nanoid = customAlphabet(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  16
);


export class Friends extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  async create(data: any, params?: Params): Promise<any> {
    data.id = nanoid();
    return super.create(data)
  }
}
