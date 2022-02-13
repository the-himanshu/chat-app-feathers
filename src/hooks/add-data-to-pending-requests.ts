// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import app from '../app';
import sequelize from 'sequelize';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    app.services.users.Model.update({
      pendingSentRequests: sequelize.fn(
        'array_append',
        sequelize.col('pendingSentRequests'),
        context.result.target
      ),
    }, {
      where: {
        id: context.result.source
      }
    })
    app.services.users.Model.update({
      pendingReceivedRequests: sequelize.fn(
        'array_append',
        sequelize.col('pendingReceivedRequests'),
        context.result.source
      ),
    }, {
      where: {
        id: context.result.target
      }
    })
    return context;
  };
};
