// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import app from "../app";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const likedPosts: any = await app.services["user-likes-mapping"].find({
      where: {
        userId: context.params.user?.id,
      }
    });

    const likedPostsId = [];
    for(let element of likedPosts) {
      likedPostsId.push(element.postId)
    }

    for (let i = 0; i < context.result.length; i++) {
      if(context.result[i]?.dataValues) {
        context.result[i] = context.result[i].toJSON()
      }
      
      if (likedPostsId.includes(context.result[i].id)) {
        context.result[i].isLiked = true;
      }
      else {
        context.result[i].isLiked = false;
      }
    }
    return context;
  };
};
