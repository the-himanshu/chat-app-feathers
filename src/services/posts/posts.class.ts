import { Id, Params } from "@feathersjs/feathers";
import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { Application } from "../../declarations";
import { customAlphabet } from "nanoid";
import app from "../../app";

const nanoid = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  16
);

export class Posts extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  async create(data: any, params?: Params): Promise<any> {
    data.id = nanoid();
    data.createdBy = params?.user?.id;
    data.updatedBy = params?.user?.id;
    data.creatorName = params?.user?.username;
    return super.create(data);
  }

  async find(params: Params): Promise<any> {
    if (!params?.query) {
      params.query = {};
    }
    delete params.paginate;
    params.query.$sort = {
      createdAt: -1,
    };
    params.sequelize.raw = false;
    return super.find(params);
  }

  async get(id: Id, params: Params): Promise<any> {
    return super.get(id.toString(), {
      sequelize: {
        include: [
          {
            model: app.services.comments.Model,
          },
          {
            model: app.services.users.Model,
          },
        ],
        raw: false
      },
    })
  }
}
