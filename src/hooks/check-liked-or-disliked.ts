// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    if(context.data?.liked) {
      context.params.liked = context.data.liked;
      delete context.data.liked;
    }
    if(context.data?.disliked) {
      context.params.disliked = context.data.disliked;
      delete context.data.disliked;
    }
    return context;
  };
};
