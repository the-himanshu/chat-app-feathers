// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    if(context.params.query?.confirmRequest) {
      context.params.confirmRequest = context.params.query.confirmRequest
      delete context.params.query.confirmRequest
    }
    return context;
  };
};
