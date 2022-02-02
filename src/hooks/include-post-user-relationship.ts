// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import app from "../app";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    if(!context.params?.sequelize) {
      context.params.sequelize = {}
      context.params.sequelize.include = []
    }
    context.params.sequelize.include.push({
      model: app.services.users.Model,
    });
    return context;
  };
};
