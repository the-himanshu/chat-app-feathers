// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import app from '../app';
import sequelize from 'sequelize';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    if(context.data.status == 'confirmed') {
      app.services.users.Model.update({
        friendsList: sequelize.fn(
          'array_append',
          sequelize.col('friendsList'),
          context.result.target
        ),
      }, {
        where: {
          id: context.result.source
        }
      })

      app.services.users.Model.update({
        friendsList: sequelize.fn(
          'array_append',
          sequelize.col('friendsList'),
          context.result.source
        ),
      }, {
        where: {
          id: context.result.target
        }
      })
    }
    return context;
  };
};
