import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import { customAlphabet } from 'nanoid';
import { Params } from '@feathersjs/feathers';
import app from '../../app';

const nanoid = customAlphabet(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  16
);

export class Comments extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  async create(data: any, params?: Params): Promise<any> {
    data.id = nanoid();
    data.createdBy = params?.user?.id
    data.updatedBy = params?.user?.id
    data.creatorName = params?.user?.username
    data.creatorAvatar = params?.user?.avatar
    const createdComment = await super.create(data);
    return createdComment
  }

  async find(params: Params): Promise<any> {
    if(!params?.query) {
      params.query = {}
    }
    delete params.paginate;
    params.query.$sort = {
      createdAt: -1
    }
    return super.find(params)
  }
}
