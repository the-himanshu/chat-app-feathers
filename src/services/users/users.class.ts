import { MethodNotAllowed } from '@feathersjs/errors';
import { Id, Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import { customAlphabet } from 'nanoid';
import crypto from 'crypto';

const nanoid = customAlphabet(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  16
);

const gravatarUrl = 'https://s.gravatar.com/avatar';
const avatarArray = ['retro', 'robohash', 'monsterid', 'mp', 'identicon', 'wavatar'];
const randomIndex = Math.floor(Math.random() * (avatarArray.length));

const query = `s=60&d=${avatarArray[randomIndex]}`;
const getGravatar = (email: string) => {
  const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  return `${gravatarUrl}/${hash}?${query}`;
}

export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  async create(data: any, params?: Params): Promise<any> {
    data.id = nanoid();
    data.avatar = data.avatar || getGravatar(data.email);
    return super.create(data)
  }
  
  async remove(id:Id): Promise<any> {
    throw new MethodNotAllowed("Method Not Allowed")
  }
}
