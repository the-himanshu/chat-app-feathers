// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import app from "../app";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    if (context.params?.liked) {
      await app.services["user-likes-mapping"].create({
        postId: context.id,
        userId: context.params.user?.id,
      });
    }
    if (context.params?.disliked) {
      await app.services["user-likes-mapping"].Model.destroy({
        where: {
          postId: context.id,
          userId: context.params.user?.id,
        },
      });
    }
    return context;
  };
};
