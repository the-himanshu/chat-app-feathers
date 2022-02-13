// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import app from "../app";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    if (context.data.parentCommentId) {
      app.services.comments.Model.increment(
        {
          replies: 1,
        },
        {
          where: {
            id: context.data.parentCommentId,
          }
        }
      );
    }
    return context;
  };
};
