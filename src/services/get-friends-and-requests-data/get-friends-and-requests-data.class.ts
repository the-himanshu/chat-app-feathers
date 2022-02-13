import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods,
} from "@feathersjs/feathers";
import { Op } from "sequelize";
import app from "../../app";
import { Application } from "../../declarations";

interface Data {}

interface ServiceOptions {}

export class GetFriendsAndRequestsData implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params: Params): Promise<Data[] | Paginated<Data>> {
    const userFriendsAndRequests = await app.services["friends"].Model.findAll({
      where: {
        [Op.or]: [
          {
            source: params.query?.userId,
          },
          {
            target: params.query?.userId,
          },
        ],
      },
      include: [
        {
          model: app.services.users.Model,
          attributes: ['id', 'username', 'avatar'],
          as: 'sourceUser'
        },
        {
          model: app.services.users.Model,
          attributes: ['id', 'username', 'avatar'],
          as: 'targetUser'
        }
      ]
    });
    return userFriendsAndRequests;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(id: Id, params?: Params): Promise<Data> {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: Data, params?: Params): Promise<Data> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)));
    }

    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: NullableId, params?: Params): Promise<Data> {
    return { id };
  }
}
